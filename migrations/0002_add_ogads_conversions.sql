ALTER TABLE enrollments ADD COLUMN buyer_name TEXT;
ALTER TABLE enrollments ADD COLUMN offer_id TEXT;
ALTER TABLE enrollments ADD COLUMN transaction_id TEXT;
ALTER TABLE enrollments ADD COLUMN completed_at TEXT;

CREATE UNIQUE INDEX IF NOT EXISTS idx_enrollments_transaction_id
  ON enrollments (transaction_id)
  WHERE transaction_id IS NOT NULL;
