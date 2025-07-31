import { defineConfig } from "drizzle-kit";

export default defineConfig({
    dialect: 'postgresql',
    schema: './db/schema',
    dbCredentials: {
        url: "postgresql://SaimsRaffby_owner:w1ycRt5TrICW@ep-falling-waterfall-a5qn6id0-pooler.us-east-2.aws.neon.tech/SaimsRaffby?sslmode=require&channel_binding=require"
    }
})



