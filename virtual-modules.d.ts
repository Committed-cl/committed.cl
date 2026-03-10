declare module 'virtual:blog-articles' {
  interface BlogArticle {
    slug: string;
    title: string;
    date: string;
    description: string;
    author: string;
    image: string;
    tags: string[];
    html: string;
  }
  export const articles: BlogArticle[];
}
