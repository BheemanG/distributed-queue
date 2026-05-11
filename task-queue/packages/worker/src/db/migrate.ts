import { Client } from 'pg'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'

dotenv.config({ path: path.join(__dirname, '../../../.env') })

const db = new Client({
    connectionString: process.env.DATABASE_URL
})

async function main() {
    await db.connect()

    //create migration table if doesn't exist
    await db.query(`
        CREATE TABLE IF NOT EXISTS migrations(
            filename text PRIMARY KEY,
            executed_at timestamptz DEFAULT CURRENT_TIMESTAMP
        )
    `)

    const migrationFiles = await fs.promises.readdir(
        path.join(__dirname, 'migrations')
    )

    //runs through migrations directory, checking if it's in migrations table
    for (const filename of migrationFiles) {
        const result = await db.query(
            'SELECT filename FROM migrations WHERE filename = $1',
            [filename]
        )
        if (result.rows.length === 0) {
            const sql = await fs.promises.readFile(path.join(__dirname, 'migrations', filename), 'utf8')
            await db.query(sql)
            await db.query(`
                INSERT INTO migrations (filename)
                VALUES ($1)
                `, [filename]
            )
        }
    }
    await db.end()
}

main().catch(console.error)