import { Plugin } from 'vite';
import fs from 'fs';
import path from 'path';
import { marked } from 'marked';

interface ArticleFrontmatter {
  title: string;
  date: string;
  description: string;
  author: string;
  image: string;
  tags: string[];
}

interface Article {
  slug: string;
  frontmatter: ArticleFrontmatter;
  html: string;
}

function parseFrontmatter(content: string): { frontmatter: Record<string, any>; body: string } {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return { frontmatter: {}, body: content };

  const frontmatterStr = match[1];
  const body = match[2];
  const frontmatter: Record<string, any> = {};

  for (const line of frontmatterStr.split('\n')) {
    const colonIndex = line.indexOf(':');
    if (colonIndex === -1) continue;
    const key = line.slice(0, colonIndex).trim();
    let value = line.slice(colonIndex + 1).trim();

    if (value.startsWith('"') && value.endsWith('"')) {
      value = value.slice(1, -1);
    }

    if (value.startsWith('[') && value.endsWith(']')) {
      frontmatter[key] = value.slice(1, -1).split(',').map(v => v.trim().replace(/^"|"$/g, ''));
    } else {
      frontmatter[key] = value;
    }
  }

  return { frontmatter, body };
}

function loadArticles(articlesDir: string): Article[] {
  if (!fs.existsSync(articlesDir)) return [];

  const files = fs.readdirSync(articlesDir).filter(f => f.endsWith('.md'));
  const articles: Article[] = [];

  for (const file of files) {
    const content = fs.readFileSync(path.join(articlesDir, file), 'utf-8');
    const { frontmatter, body } = parseFrontmatter(content);
    const html = marked.parse(body, { async: false }) as string;
    const slug = file.replace(/\.md$/, '');

    articles.push({
      slug,
      frontmatter: frontmatter as ArticleFrontmatter,
      html,
    });
  }

  articles.sort((a, b) => new Date(b.frontmatter.date).getTime() - new Date(a.frontmatter.date).getTime());
  return articles;
}

export default function markdownPlugin(): Plugin {
  const virtualModuleId = 'virtual:blog-articles';
  const resolvedVirtualModuleId = '\0' + virtualModuleId;
  const articlesDir = path.resolve(process.cwd(), 'content/articles');

  return {
    name: 'vite-plugin-markdown-articles',

    resolveId(id) {
      if (id === virtualModuleId) return resolvedVirtualModuleId;
    },

    load(id) {
      if (id === resolvedVirtualModuleId) {
        const articles = loadArticles(articlesDir);
        const articlesData = articles.map(a => ({
          slug: a.slug,
          title: a.frontmatter.title,
          date: a.frontmatter.date,
          description: a.frontmatter.description,
          author: a.frontmatter.author,
          image: a.frontmatter.image,
          tags: a.frontmatter.tags || [],
          html: a.html,
        }));
        return `export const articles = ${JSON.stringify(articlesData)};`;
      }
    },

    configureServer(server) {
      server.watcher.add(articlesDir);
      server.watcher.on('change', (filePath) => {
        if (filePath.startsWith(articlesDir)) {
          const mod = server.moduleGraph.getModuleById(resolvedVirtualModuleId);
          if (mod) {
            server.moduleGraph.invalidateModule(mod);
            server.ws.send({ type: 'full-reload' });
          }
        }
      });
    },

    closeBundle() {
      const articles = loadArticles(articlesDir);
      const distDir = path.resolve(process.cwd(), 'dist');
      const blogDir = path.join(distDir, 'blog');

      if (!fs.existsSync(blogDir)) fs.mkdirSync(blogDir, { recursive: true });

      const indexHtml = fs.readFileSync(path.join(distDir, 'index.html'), 'utf-8');

      for (const article of articles) {
        const articleDir = path.join(blogDir, article.slug);
        if (!fs.existsSync(articleDir)) fs.mkdirSync(articleDir, { recursive: true });

        const seoHtml = indexHtml
          .replace(/<title>.*?<\/title>/, `<title>${article.frontmatter.title} | Committed</title>`)
          .replace('</head>', `
    <meta name="description" content="${article.frontmatter.description}">
    <meta name="author" content="${article.frontmatter.author}">
    <meta property="og:title" content="${article.frontmatter.title}">
    <meta property="og:description" content="${article.frontmatter.description}">
    <meta property="og:image" content="${article.frontmatter.image}">
    <meta property="og:type" content="article">
    <meta property="article:published_time" content="${article.frontmatter.date}">
    <meta property="article:author" content="${article.frontmatter.author}">
    ${(article.frontmatter.tags || []).map((t: string) => `<meta property="article:tag" content="${t}">`).join('\n    ')}
    <link rel="canonical" href="https://committed.cl/blog/${article.slug}">
</head>`);

        fs.writeFileSync(path.join(articleDir, 'index.html'), seoHtml);
      }

      // Generate blog listing page
      const blogListHtml = indexHtml
        .replace(/<title>.*?<\/title>/, '<title>Blog | Committed - Coordinación de Equipos y Liderazgo</title>')
        .replace('</head>', `
    <meta name="description" content="Artículos sobre gestión por compromisos, liderazgo y productividad organizacional.">
    <meta property="og:title" content="Blog | Committed">
    <meta property="og:description" content="Artículos sobre gestión por compromisos, liderazgo y productividad organizacional.">
    <meta property="og:type" content="website">
    <link rel="canonical" href="https://committed.cl/blog">
</head>`);

      fs.writeFileSync(path.join(blogDir, 'index.html'), blogListHtml);
    }
  };
}
