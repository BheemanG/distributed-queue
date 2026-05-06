export enum JobStatus {
    Pending = "pending",
    Running = "running",
    Completed = "completed",
    Failed = "failed",
    Dead = "dead"
}

export interface Job {
    id: string
    taskName: string
    payload: Record<string, unknown>
    status: JobStatus
    attempts: number
    maxAttempts: number
    createdAt: Date
    runningAt?: Date
    completedAt?: Date
    errorMessage?: string
}