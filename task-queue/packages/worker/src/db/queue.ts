import { Job, EnqueueOptions } from '@task-queue/shared'
import dotenv from 'dotenv'
import { Client } from 'pg'
import { pool } from './client'


dotenv.config( { path: '../../../.env' })

async function enqueue(options: EnqueueOptions): Promise<Job> {

}


async function dequeue(workerId: string): Promise<Job | null> {
    
}