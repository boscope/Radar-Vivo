-- Adicionar campo role na tabela profiles
ALTER TABLE profiles ADD COLUMN IF NOT EXISTS role TEXT DEFAULT 'user' CHECK (role IN ('admin', 'user'));

-- Atualizar o dono do Radar Vivo para admin
UPDATE profiles SET role = 'admin' WHERE email = 'radarvivocontato@gmail.com';

-- Atualizar o trigger para sempre criar com role 'user'
CREATE OR REPLACE FUNCTION handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO profiles (id, email, full_name, role)
  VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name', 'user');
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;
