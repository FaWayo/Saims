
import { Pool } from 'pg'
import { drizzle } from 'drizzle-orm/node-postgres'

const pool = new Pool({
    connectionString: process.env.DATABASE_URL
})

export const db = drizzle({ client: pool })

const result = await db.execute('select 1');

console.log(result, 'result from connection')
