import type { Blog } from "@types";
import { Client } from "@notionhq/client";
import { getSecret } from "astro:env/server";
import { NotionToMarkdown } from "notion-to-md";

export default class NotionService {
  client: Client;

  n2m: NotionToMarkdown;

  databaseId: string;

  constructor() {
    this.databaseId = getSecret("NOTION_BLOG_DATABASE_ID")!;
    this.client = new Client({ auth: getSecret("NOTION_TOKEN") });
    this.n2m = new NotionToMarkdown({ notionClient: this.client });
  }

  async getBlogs(): Promise<Blog[]> {
    // list blog posts
    const response = await this.client.dataSources.query({
      data_source_id: this.databaseId,
      filter_properties: ["Name", "Created", "words", "Slug", "Description"],
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      result_type: "page",
      sorts: [
        {
          property: "Updated",
          direction: "descending",
        },
      ],
    });

    return response.results.map(res => NotionService.pageToBlogTransformer(res));
  }

  async getBlogBySlug(slug: string) {
    // get single blog
    const response = await this.client.dataSources.query({
      data_source_id: this.databaseId,
      filter_properties: ["Name", "Created", "words", "Slug", "Description"],
      filter: {
        property: "Slug",
        formula: {
          string: {
            equals: slug,
          },
        },
      },
    });

    const page = response.results[0];

    const mdBlocks = await this.n2m.pageToMarkdown(page.id);
    const markdown = (this.n2m.toMarkdownString(mdBlocks)).parent;
    const data = NotionService.pageToBlogTransformer(page);

    return { data, markdown };
  }

  private static pageToBlogTransformer(page: any): Blog {
    return {
      id: page.id,
      cover: page.cover.external?.url ?? null,
      title: page.properties.Name.title[0].plain_text,
      description: page.properties.Description.rich_text[0].plain_text,
      createdAt: page.created_time,
      lastUpdateAt: page.last_edited_time,
      slug: page.properties.Slug.formula.string,
      readTime: `${Math.ceil((page.properties.words.number / 200) + 1)} mins read`,
    };
  }
}

export const notion = new NotionService();
