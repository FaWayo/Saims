import { pgTable as table, pgEnum } from "drizzle-orm/pg-core"
import * as t from 'drizzle-orm/pg-core'


export const rolesEnum = pgEnum("roles", ["Administrator", "Salesperson", "Accountant", "Manager"])
export const businessTypesEnum = pgEnum("businessTypes", [
    "Sole Proprietorship",
    "Partnership",
    "Limited Liability Company (LLC)",
    "Corporation",
    "Non-Profit Organization",
    "Other",
])
export const subscriptionTiersEnum = pgEnum("subscriptionTiers", ["Basic"])
export const regionsEnum = pgEnum("regions", [
    "Greater Accra",
    "Ashanti",
    "Western",
    "Central",
    "Eastern",
    "Volta",
    "Northern",
    "Upper East",
    "Upper West",
    "Brong Ahafo",
])
export const currenciesEnum = pgEnum("currencies", [
    "Ghanaian Cedi",
    "US Dollar",
    "Euro",
    "British Pound",
])

const timestamps = {
    updated_at: t.timestamp(),
    created_at: t.timestamp().defaultNow().notNull()
}

export const roles = table("roles", {
    id: t.integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.text(),
    permissions: t.text(),
    isActive: t.boolean("is_active").default(true),
    ...timestamps
})

export const businessTypes = table("business_types", {
    id: t.integer("business_type_id").primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 100 }).notNull(),
    description: t.text()
})


export const subscriptionTiers = table("subscription_tiers", {
    id: t.integer("subscription_tier_id").primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 100 })
})

export const regions = table("regions", {
    id: t.integer("region_id").primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 100 }).notNull()
})

export const companies = table("companies", {
    id: t.integer("company_id").primaryKey().generatedAlwaysAsIdentity(),
    name: t.varchar({ length: 100 }).notNull(),
    business_type_id: t.integer().references(() => businessTypes.id),
    registrationNumber: t.varchar("registration_number", { length: 100 }),
    tinNumber: t.varchar("tin_number", { length: 100 }),
    email: t.varchar({ length: 100 }),
    phone: t.varchar({ length: 100 }),
    website: t.varchar({ length: 100 }),
    address: t.varchar({ length: 100 }),
    regionId: t.integer("region_id").references(() => regions.id),
    digitalAddress: t.varchar("digital_address", { length: 100 }),
    currency: t.varchar().default("GHS"),
    timezone: t.varchar({ length: 100 }).default("GMT"),
    logo: t.text(),
    primaryColor: t.varchar("primary_color", { length: 50 }),
    isActive: t.boolean("is_active").default(false),
    subscriptionTierId: t.integer("subscription_tier_id").references(() => subscriptionTiers.id),
    ...timestamps
})

export const users = table("users", {
    id: t.integer("user_id").primaryKey().generatedAlwaysAsIdentity(),
    email: t.varchar({ length: 100 }),
    password: t.text(),
    firstName: t.varchar("first_name", { length: 100 }),
    lastName: t.varchar("last_name", { length: 100 }),
    avatar: t.text(),
    isActive: t.boolean("is_active").default(false),
    lastLogin: t.timestamp("last_login"),
    roleId: t.integer().references(() => roles.id),
    companyId: t.integer().references(() => companies.id),
    ...timestamps
})

export type NewUser = typeof users.$inferInsert;
export type NewCompany = typeof companies.$inferInsert;