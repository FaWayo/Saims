import { generateSku } from "@/lib/utils"
import { pgTable as table, pgEnum } from "drizzle-orm/pg-core"
import * as t from "drizzle-orm/pg-core"
import { companies, timestamps } from "./auth"

export const categories = table("categories", {
  id: t.integer("category_id").primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 100 }),
})

export const units = table("units", {
  id: t.integer("unit_id").primaryKey().generatedAlwaysAsIdentity(),
  name: t.varchar({ length: 100 }),
})

export const products = table("products", {
  id: t.integer("product_id").primaryKey().generatedAlwaysAsIdentity(),
  name: t.text().notNull(),
  description: t.text(),
  sku: t.text().unique(),
  barCode: t.text("bar_code"),
  categoryId: t.integer("category_id").references(() => categories.id),
  costPrice: t.decimal("cost_price", { precision: 20, scale: 2 }).notNull(),
  sellingPrice: t.decimal("selling_price", { precision: 20, scale: 2 }),
  trackInventory: t.boolean("track_inventory").default(false),
  currentStock: t.integer("current_stock").default(0),
  minStockLevel: t.integer("min_stock_level").default(0),
  maxStockLevel: t.integer("max_stock_level").default(0),
  reorderPoint: t.integer("reorder_point").default(0),
  baseUnit: t.integer("base_unit").references(() => units.id),
  purchaseUnit: t.integer("purchase_unit").references(() => units.id),
  salesUnit: t.integer("sales_unit").references(() => units.id),
  itemsPerPurchaseUnit: t.integer("items_per_purchase_unit").notNull(),
  itemsPerSaleUnit: t.integer("items_per_sale_unit").notNull(),

  brand: t.varchar({ length: 100 }),
  model: t.varchar({ length: 100 }),
  color: t.varchar({ length: 50 }),
  size: t.varchar({ length: 50 }),
  weight: t.decimal({ precision: 8, scale: 3 }),

  image: t.text(),
  thumbnail: t.text(),

  isActive: t.boolean("is_active").default(true),
  isService: t.boolean("is_service").default(false),
  isTaxable: t.boolean("is_taxable").default(true),
  taxRate: t.decimal("tax_rate", { precision: 5, scale: 4 }).default("0.0000"),

  companyId: t.integer("company_id").references(() => companies.id),
  ...timestamps,
})
