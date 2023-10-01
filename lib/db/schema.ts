import { pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const $notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
  imageUrl: text("image_url"),
  content: text("content"),
  userId: text("user_id").notNull(),
});
export type NoteType = typeof $notes.$inferInsert;
