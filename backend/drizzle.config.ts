import 'dotenv/config'
import { defineConfig } from 'drizzle-kit'
import { ENV } from './src/config/env'
export default defineConfig({
	out: './drizzle',
	dialect: 'postgresql',
	schema: './src/db/schema.ts',

	dbCredentials: {
		url: ENV.DATABASE_URL,
	},
})
