BEGIN;

CREATE TYPE job_status AS ENUM ('pending', 'running', 'completed', 'failed', 'dead')

CREATE TABLE jobs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    type text NOT NULL,
    payload jsonb,
    status job_status NOT NULL DEFAULT 'pending',
    priority integer,
    attempts integer DEFAULT 0,
    max_attempts integer DEFAULT 3,
    run_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    started_at timestamptz,
    completed_at timestamptz,
    failed_at timestamptz,
    last_error text,
    worker_id text,
    created_at timestamptz DEFAULT CURRENT_TIMESTAMP,
    updated_at timestamptz DEFAULT CURRENT_TIMESTAMP
)

COMMIT;