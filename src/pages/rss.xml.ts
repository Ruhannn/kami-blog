import rss from "@astrojs/rss";
import { HOME } from "@consts";
import { notion } from "@lib/notion";

interface Context {
  site: string;
}

export async function GET(context: Context) {
  const blogs = await notion.getBlogs();

  const items = blogs.sort((a, b) => new Date(b.createdAt).valueOf() - new Date(a.createdAt).valueOf());

  return rss({
    title: HOME.TITLE,
    description: HOME.DESCRIPTION,
    site: context.site,
    items: items.map(item => ({
      title: item.title,
      description: item.description,
      pubDate: new Date(item.createdAt),
      link: `/blog/${item.slug}/`,
    })),
  });
}
