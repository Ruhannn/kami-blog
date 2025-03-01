export type Tag = {
  color: string;
  id: string;
  name: string;
};

export type BlogPost = {
  id: string;
  slug: string;
  cover: {
    url: string;
  } | null;
  title: string
  tags: Tag[];
  description: string;
  date: string;
  readTime: string
};

export type PostPage = {
  post: BlogPost;
  markdown: string;
};
