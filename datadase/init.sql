CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    status TEXT NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'done')),
    created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
