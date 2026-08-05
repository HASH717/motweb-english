ALTER TABLE enrollments ADD COLUMN item_type TEXT;
ALTER TABLE enrollments ADD COLUMN item_slug TEXT;

UPDATE enrollments
SET item_type = 'canva', item_slug = 'canva-pro'
WHERE item_type IS NULL;

CREATE INDEX IF NOT EXISTS idx_enrollments_item
  ON enrollments (item_type, item_slug, created_at DESC);
