-- White-label: campos da agência no perfil
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agency_name TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agency_logo_url TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agency_color TEXT DEFAULT '#22c55e';
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agency_whatsapp TEXT;
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS agency_website TEXT;

-- Histórico de scores (antes/depois)
CREATE TABLE IF NOT EXISTS score_history (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  company_name TEXT NOT NULL,
  city TEXT,
  category TEXT,
  score INTEGER NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE score_history ENABLE ROW LEVEL SECURITY;

CREATE POLICY "score_history_select_own" ON score_history
  FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "score_history_insert_own" ON score_history
  FOR INSERT WITH CHECK (auth.uid() = user_id);
