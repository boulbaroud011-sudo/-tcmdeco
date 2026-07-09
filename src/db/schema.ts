import { boolean, integer, pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const products = pgTable("tcm_products", {
  id: serial("id").primaryKey(),
  slug: varchar("slug", { length: 120 }).notNull().unique(),
  name: varchar("name", { length: 180 }).notNull(),
  category: varchar("category", { length: 120 }).notNull(),
  badge: varchar("badge", { length: 80 }).notNull().default("جديد"),
  shortDescription: text("short_description").notNull(),
  description: text("description").notNull(),
  price: integer("price").notNull(),
  oldPrice: integer("old_price"),
  dimensions: varchar("dimensions", { length: 160 }).notNull(),
  material: varchar("material", { length: 180 }).notNull(),
  featured: boolean("featured").notNull().default(false),
  sortOrder: integer("sort_order").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const productImages = pgTable("tcm_product_images", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  url: text("url").notNull(),
  alt: varchar("alt", { length: 220 }).notNull(),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const productReviews = pgTable("tcm_product_reviews", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "cascade" }),
  customerName: varchar("customer_name", { length: 120 }).notNull(),
  city: varchar("city", { length: 120 }).notNull(),
  rating: integer("rating").notNull().default(5),
  comment: text("comment").notNull(),
  imageUrl: text("image_url").notNull(),
  position: integer("position").notNull().default(0),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export const orders = pgTable("tcm_orders", {
  id: serial("id").primaryKey(),
  productId: integer("product_id")
    .notNull()
    .references(() => products.id, { onDelete: "restrict" }),
  customerName: varchar("customer_name", { length: 140 }).notNull(),
  phone: varchar("phone", { length: 40 }).notNull(),
  address: text("address").notNull(),
  notes: text("notes"),
  status: varchar("status", { length: 40 }).notNull().default("new"),
  createdAt: timestamp("created_at", { withTimezone: true }).notNull().defaultNow(),
});

export type Product = typeof products.$inferSelect;
export type ProductImage = typeof productImages.$inferSelect;
export type ProductReview = typeof productReviews.$inferSelect;
export type Order = typeof orders.$inferSelect;
