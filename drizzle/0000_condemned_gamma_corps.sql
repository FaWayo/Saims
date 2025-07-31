CREATE TABLE "business_types" (
	"business_type_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "business_types_business_type_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"description" text
);
--> statement-breakpoint
CREATE TABLE "companies" (
	"company_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "companies_company_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"business_type_id" integer,
	"registration_number" varchar(100),
	"tin_number" varchar(100),
	"email" varchar(100),
	"phone" varchar(100),
	"website" varchar(100),
	"address" varchar(100),
	"region_id" integer,
	"digital_address" varchar(100),
	"currency" varchar DEFAULT 'GHS',
	"timezone" varchar(100) DEFAULT 'GMT',
	"logo" text,
	"primary_color" varchar(50),
	"is_active" boolean DEFAULT false,
	"subscription_tier_id" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "regions" (
	"region_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "regions_region_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "roles" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "roles_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100) NOT NULL,
	"description" text,
	"permissions" text,
	"is_active" boolean DEFAULT true,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "subscription_tiers" (
	"subscription_tier_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "subscription_tiers_subscription_tier_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"name" varchar(100)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"user_id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "users_user_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"email" varchar(100),
	"password" text,
	"first_name" varchar(100),
	"last_name" varchar(100),
	"avatar" text,
	"is_active" boolean DEFAULT false,
	"last_login" timestamp,
	"roleId" integer,
	"companyId" integer,
	"updated_at" timestamp,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_business_type_id_business_types_business_type_id_fk" FOREIGN KEY ("business_type_id") REFERENCES "public"."business_types"("business_type_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_region_id_regions_region_id_fk" FOREIGN KEY ("region_id") REFERENCES "public"."regions"("region_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "companies" ADD CONSTRAINT "companies_subscription_tier_id_subscription_tiers_subscription_tier_id_fk" FOREIGN KEY ("subscription_tier_id") REFERENCES "public"."subscription_tiers"("subscription_tier_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_roleId_roles_user_id_fk" FOREIGN KEY ("roleId") REFERENCES "public"."roles"("user_id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_companyId_companies_company_id_fk" FOREIGN KEY ("companyId") REFERENCES "public"."companies"("company_id") ON DELETE no action ON UPDATE no action;