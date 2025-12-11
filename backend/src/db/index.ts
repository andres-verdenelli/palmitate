import { drizzle } from 'drizzle-orm/node-postgres'
import { Pool } from 'pg'
import 'dotenv/config'
import { ENV } from '../config/env.js'

export const pool = new Pool({
	connectionString: ENV.DATABASE_URL,
})

export const db = drizzle(pool)
