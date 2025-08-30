ALTER TYPE "public"."roles" ADD VALUE 'Manager';--> statement-breakpoint
CREATE TABLE "categories" (
	"category_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "categories_category_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "products" (
	"product_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "products_product_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" text NOT NULL,
	"description" text,
	"sku" text,
	"bar_code" text,
	"category_id" integer,
	"cost_price" numeric(20, 2) NOT NULL,
	"selling_price" numeric(20, 2),
	"track_inventory" boolean DEFAULT false,
	"current_stock" integer DEFAULT 0,
	"min_stock_level" integer DEFAULT 0,
	"max_stock_level" integer DEFAULT 0,
	"reorder_point" integer DEFAULT 0,
	"base_unit" integer,
	"purchase_unit" integer,
	"sales_unit" integer,
	"items_per_purchase_unit" integer NOT NULL,
	"items_per_sale_unit" integer NOT NULL,
	"brand" varchar(100),
	"model" varchar(100),
	"color" varchar(50),
	"size" varchar(50),
	"weight" numeric(8, 3),
	"image" text,
	"thumbnail" text,
	"is_active" boolean DEFAULT true,
	"is_service" boolean DEFAULT false,
	"is_taxable" boolean DEFAULT true,
	"tax_rate" numeric(5, 4) DEFAULT '0.0000',
	"company_id" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "products_sku_unique" UNIQUE("sku")
);
--> statement-breakpoint
CREATE TABLE "units" (
	"unit_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "units_unit_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100)
);
--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "business_type_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "region_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "subscription_tier_id" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roleId" SET DATA TYPE integer;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_category_id_categories_category_id_fk" FOREIGN KEY ("category_id") REFERENCES "public"."categories"("category_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_base_unit_units_unit_id_fk" FOREIGN KEY ("base_unit") REFERENCES "public"."units"("unit_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_purchase_unit_units_unit_id_fk" FOREIGN KEY ("purchase_unit") REFERENCES "public"."units"("unit_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_sales_unit_units_unit_id_fk" FOREIGN KEY ("sales_unit") REFERENCES "public"."units"("unit_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "products" ADD CONSTRAINT "products_company_id_companies_company_id_fk" FOREIGN KEY ("company_id") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;