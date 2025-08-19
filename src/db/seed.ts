
import { Pool } from "pg"
import { roles, businessTypes, subscriptionTiers, regions } from "./schema/auth"
import { drizzle } from "drizzle-orm/node-postgres"

const main = async () => {

    const pool = new Pool({
        connectionString: process.env.DATABASE_URL
    })

    const db = drizzle({ client: pool })

    await db.insert(roles).values([
        { name: "Administrator", description: "Administrator", isActive: true },
        { name: "Salesperson", description: "Salesperson", isActive: true },
        { name: "Accountant", description: "Accountant", isActive: true },
        { name: "Manager", description: "Manager", isActive: true }
    ])

    await db.insert(businessTypes).values([
        { name: "Sole Proprietorship", description: "Sole Proprietorship" },
        { name: "Partnership", description: "Partnership" },
        { name: "Limited Liability Company (LLC)", description: "Limited Liability Company (LLC)" },
        { name: "Corporation", description: "Corporation" },
        { name: "Non-Profit Organization", description: "Non-Profit Organization" },
        { name: "Other", description: "Other" }
    ])

    await db.insert(subscriptionTiers).values([
        { name: "Basic" }
    ])

    await db.insert(regions).values([
        { name: "Greater Accra" },
        { name: "Ashanti" },
        { name: "Western" },
        { name: "Central" },
        { name: "Eastern" },
        { name: "Volta" },
        { name: "Northern" },
        { name: "Upper East" },
        { name: "Upper West" },
        { name: "Brong Ahafo" }
    ])
}

main()
    .catch((e) => {
        console.error(e)
        process.exit(1)
    })
    .finally(async () => {
        // console.log("Seeding done!")
        process.exit(0)
    })