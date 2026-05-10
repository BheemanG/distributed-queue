import { Client } from 'pg'
import fs from 'fs'
import path from 'path'
import dotenv from 'dotenv'
dotenv.config()

const client = new Client({
  connectionString: process.env.DATABASE_URL
})