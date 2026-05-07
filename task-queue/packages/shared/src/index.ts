export type JobStatus =
  | "pending"
  | "running"
  | "completed"
  | "failed"
  | "dead";

export interface Job {
  id: string;
  type: string;
  payload: Record<string, unknown>;
  status: JobStatus;
  priority: number;
  attempts: number;
  maxAttempts: number;
  runAt: Date;
  startedAt: Date | null;
  completedAt: Date | null;
  failedAt: Date | null;
  lastError: string | null;
  workerId: string | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface EnqueueOptions {
  type: string;
  payload: Record<string, unknown>;
  priority?: number;
  maxAttempts?: number;
  runAt?: Date;
}

export type JobResult =
  | { success: true }
  | { success: false; error: string };