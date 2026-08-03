CREATE TABLE IF NOT EXISTS enrollments (
  id TEXT PRIMARY KEY,
  buyer_email TEXT NOT NULL,
  status TEXT NOT NULL DEFAULT 'pending' CHECK (status IN ('pending', 'success', 'failed')),
  created_at TEXT NOT NULL,
  updated_at TEXT,
  error_message TEXT
);

CREATE INDEX IF NOT EXISTS idx_enrollments_email_created
  ON enrollments (buyer_email, created_at DESC);
