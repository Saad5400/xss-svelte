import { db } from "$lib/server/db";
import { comments } from "$lib/server/db/schema";
import { desc, eq } from "drizzle-orm";
import type { Actions, PageServerLoad } from "./$types";

export const load: PageServerLoad = async () => {
  return {
    comments: await db.query.comments.findMany({
      limit: 20,
      orderBy: desc(comments.created_at),
    }),
  };
};

export const actions = {
  create: async ({ request }) => {
    const data = await request.formData();
    const content = data.get("content");

    if (!content) return { success: false };

    await db.insert(comments).values({
      content: content.toString(),
      created_at: new Date(),
    });

    return { success: true };
  },
  delete: async ({ request }) => {
    const data = await request.formData();
    const id = data.get("id");

    if (!id) return { success: false };

    await db.delete(comments).where(eq(comments.id, id));

    return { success: true };
  },
} satisfies Actions;
