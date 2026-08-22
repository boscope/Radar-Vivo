CREATE TABLE IF NOT EXISTS short_links (
  id TEXT PRIMARY KEY,
  target_url TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE short_links ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public read short_links" ON short_links
  FOR SELECT USING (true);

CREATE POLICY "Service role insert short_links" ON short_links
  FOR INSERT WITH CHECK (true);
