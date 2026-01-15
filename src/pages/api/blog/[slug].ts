import type { APIRoute } from "astro";

import { notion } from "@lib/notion";
import { json } from "@utils/json";

export const prerender = false;

export const GET: APIRoute = async ({ params }) => {
  try {
    const slug = params.slug;

    if (!slug || typeof slug !== "string") {
      return json({ error: "Invalid slug" }, 400);
    }

    const blog = await notion.getBlogBySlug(slug);

    if (!blog) {
      json({ error: "Blog not Found" }, 404);
    }

    return json(blog);
  }
  catch {
    return json({ error: "Failed to fetch data" }, 500);
  }
};
