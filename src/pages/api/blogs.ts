import type { APIRoute } from "astro";

import { notion } from "@lib/notion";
import { json } from "@utils/json";

export const GET: APIRoute = async () => {
  try {
    const blogs = await notion.getBlogs();

    if (!blogs) {
      return json({ error: "No blogs found" }, 404);
    }

    return json(blogs);
  }
  catch {
    return json({ error: "Failed to fetch blogs" }, 500);
  }
};
