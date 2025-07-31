CREATE TYPE "public"."businessTypes" AS ENUM('Sole Proprietorship', 'Partnership', 'Limited Liability Company (LLC)', 'Corporation', 'Non-Profit Organization', 'Other');--> statement-breakpoint
CREATE TYPE "public"."currencies" AS ENUM('Ghanaian Cedi', 'US Dollar', 'Euro', 'British Pound');--> statement-breakpoint
CREATE TYPE "public"."regions" AS ENUM('Greater Accra', 'Ashanti', 'Western', 'Central', 'Eastern', 'Volta', 'Northern', 'Upper East', 'Upper West', 'Brong Ahafo');--> statement-breakpoint
CREATE TYPE "public"."roles" AS ENUM('Administrator', 'Salesperson', 'Accountant');--> statement-breakpoint
CREATE TYPE "public"."subscriptionTiers" AS ENUM('Basic');--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "business_type_id" SET DATA TYPE "public"."businessTypes" USING "business_type_id"::"public"."businessTypes";--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "region_id" SET DATA TYPE "public"."roles" USING "region_id"::"public"."roles";--> statement-breakpoint
ALTER TABLE "companies" ALTER COLUMN "subscription_tier_id" SET DATA TYPE "public"."subscriptionTiers" USING "subscription_tier_id"::"public"."subscriptionTiers";--> statement-breakpoint
ALTER TABLE "users" ALTER COLUMN "roleId" SET DATA TYPE "public"."roles" USING "roleId"::"public"."roles";