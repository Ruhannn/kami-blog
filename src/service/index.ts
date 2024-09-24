import { api } from './Api';

export const getBlogPosts = async () => {
    const response = await api.get("api/posts");
    return response.data;
};

export const getSingleBlogPost = async (slug: string) => {
    const response = await api.get(`api/posts/${slug}`);
    return response.data;
};
