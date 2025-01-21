import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const comments = pgTable('comments', {
	id: serial('id').primaryKey(),
	content: text('content').notNull(),
	created_at: timestamp('created_at').notNull(),
});
