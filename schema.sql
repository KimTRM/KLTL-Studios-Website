-- KLTL Studios Portfolio Database Schema
-- Supabase PostgreSQL Setup Script
-- Run this in your Supabase SQL Editor

-- =============================================
-- 1. CREATE PROJECTS TABLE
-- =============================================

CREATE TABLE IF NOT EXISTS projects (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  title TEXT NOT NULL,
  subtitle TEXT,
  description TEXT NOT NULL,
  image TEXT NOT NULL,
  featured BOOLEAN DEFAULT false,
  category TEXT,
  tags TEXT[],
  gallery TEXT[],
  live_url TEXT,
  github_url TEXT,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- =============================================
-- 2. CREATE INDEXES
-- =============================================

CREATE INDEX IF NOT EXISTS idx_projects_slug ON projects(slug);
CREATE INDEX IF NOT EXISTS idx_projects_featured ON projects(featured);
CREATE INDEX IF NOT EXISTS idx_projects_order ON projects(order_index);
CREATE INDEX IF NOT EXISTS idx_projects_created_at ON projects(created_at DESC);

-- =============================================
-- 3. ENABLE ROW LEVEL SECURITY
-- =============================================

ALTER TABLE projects ENABLE ROW LEVEL SECURITY;

-- =============================================
-- 4. CREATE RLS POLICIES
-- =============================================

-- Policy: Anyone can read projects (public access)
DROP POLICY IF EXISTS "Public projects are viewable by everyone" ON projects;
CREATE POLICY "Public projects are viewable by everyone"
ON projects FOR SELECT
USING (true);

-- Policy: Authenticated users can insert projects
DROP POLICY IF EXISTS "Authenticated users can insert projects" ON projects;
CREATE POLICY "Authenticated users can insert projects"
ON projects FOR INSERT
TO authenticated
WITH CHECK (true);

-- Policy: Authenticated users can update projects
DROP POLICY IF EXISTS "Authenticated users can update projects" ON projects;
CREATE POLICY "Authenticated users can update projects"
ON projects FOR UPDATE
TO authenticated
USING (true)
WITH CHECK (true);

-- Policy: Authenticated users can delete projects
DROP POLICY IF EXISTS "Authenticated users can delete projects" ON projects;
CREATE POLICY "Authenticated users can delete projects"
ON projects FOR DELETE
TO authenticated
USING (true);

-- =============================================
-- 5. CREATE UPDATED_AT TRIGGER
-- =============================================

CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

DROP TRIGGER IF EXISTS update_projects_updated_at ON projects;
CREATE TRIGGER update_projects_updated_at
  BEFORE UPDATE ON projects
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- =============================================
-- 6. INSERT EXISTING PROJECTS DATA
-- =============================================

-- Clear existing data (optional - comment out if you want to keep existing data)
-- TRUNCATE projects;

-- Insert KnowledgeSweeper
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  featured, 
  category, 
  tags, 
  gallery, 
  order_index
) VALUES (
  'KnowledgeSweeper',
  'KnowledgeSweeper',
  'An Educational Minesweeper Game',
  'KnowledgeSweeper is an innovative twist on the classic Minesweeper game. Instead of simply flagging mines, players must answer quiz questions correctly to stay alive. This unique combination of puzzle-solving and knowledge testing creates an engaging educational experience that challenges both logic and learning.',
  '/res/KnowledgeSweeper_Icon.svg',
  true,
  'Game Development',
  ARRAY['Game Development', 'Education', 'Puzzle', 'Quiz'],
  ARRAY[
    '/res/ScreenShots/KnowledgeSweeper/KnowledgeSweeper 1.png',
    '/res/ScreenShots/KnowledgeSweeper/KnowledgeSweeper 2.png',
    '/res/ScreenShots/KnowledgeSweeper/KnowledgeSweeper 3.png',
    '/res/ScreenShots/KnowledgeSweeper/KnowledgeSweeper 4.png'
  ],
  1
) ON CONFLICT (slug) DO NOTHING;

-- Insert Project 100
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  featured, 
  category, 
  tags, 
  gallery, 
  order_index
) VALUES (
  'Project100',
  'Project 100',
  'Learn Programming Through Play',
  'Project 100 is an educational RPG that makes learning programming fun and accessible. Through engaging block-based puzzles and interactive challenges, players learn fundamental programming concepts while embarking on an epic adventure. The game combines storytelling with practical coding exercises to create a comprehensive learning experience.',
  '/res/Project100_Icon.svg',
  true,
  'Game Development',
  ARRAY['Game Development', 'Education', 'RPG', 'Programming'],
  ARRAY[
    '/res/ScreenShots/Project100/Project100 1.png',
    '/res/ScreenShots/Project100/Project100 2.png',
    '/res/ScreenShots/Project100/Project100 3.png',
    '/res/ScreenShots/Project100/Project100 4.png',
    '/res/ScreenShots/Project100/Project100 5.png'
  ],
  2
) ON CONFLICT (slug) DO NOTHING;

-- Insert Website Clone Redesign
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  category, 
  tags, 
  live_url,
  order_index
) VALUES (
  'clone-redesign',
  'Website Clone Redesign',
  'Philippine Senate Website Modernization',
  'A website clone redesign for Senate of the Philippines - 19th Congress. This project demonstrates modern web design principles applied to government website interfaces, improving usability and accessibility.',
  '/res/icon/KLTL_Studios.svg',
  'Web Development',
  ARRAY['Web Design', 'Government', 'Redesign', 'UI/UX'],
  '/Clone-Redesign/index.html',
  3
) ON CONFLICT (slug) DO NOTHING;

-- Insert Game Publishing Form
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  category, 
  tags, 
  live_url,
  order_index
) VALUES (
  'game-publishing-form',
  'Game Publishing Form',
  'Streamlined Game Submission Portal',
  'A game publishing form for game developers. This tool provides a clean, intuitive interface for developers to submit their games for publishing, including metadata, screenshots, and build files.',
  '/Game Publishing/res/images/KLTL Logo.png',
  'Web Development',
  ARRAY['Forms', 'Game Development', 'Bootstrap', 'JavaScript'],
  '/Game Publishing/form.html',
  4
) ON CONFLICT (slug) DO NOTHING;

-- Insert Simple 2D Game
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  category, 
  tags, 
  live_url,
  order_index
) VALUES (
  'simple-2d-game',
  'Simple 2D Game',
  'Godot Engine Platformer Demo',
  'A simple 2D game made with Godot Engine, where you can make the character move and collide with the environment. This project showcases basic game mechanics including player movement, collision detection, and physics.',
  '/Web/2D.icon 1.svg',
  'Game Development',
  ARRAY['Godot', '2D', 'Platformer', 'Web Export'],
  '/Web/2D.html',
  5
) ON CONFLICT (slug) DO NOTHING;

-- Insert Teacher's Day Gift
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  category, 
  tags, 
  live_url,
  order_index
) VALUES (
  'teachers-day-gift',
  'Teacher''s Day Gift',
  'Interactive Appreciation Website',
  'A website for the Teacher''s Day Gift to Sir Marvin. This interactive web experience combines animations, personal messages, and multimedia elements to create a memorable digital appreciation card.',
  '/Happy Teachers Day/res/Sir_Marvin.png',
  'Web Development',
  ARRAY['Interactive', 'Animation', 'Personal Project', 'JavaScript'],
  '/Happy Teachers Day/index.html',
  6
) ON CONFLICT (slug) DO NOTHING;

-- Insert Birthday Game Gift
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  category, 
  tags, 
  live_url,
  order_index
) VALUES (
  'birthday-game-gift',
  'Birthday Game Gift',
  'Personalized Interactive Birthday Experience',
  'A website I made for a birthday game gift to my friend. This personalized game includes custom graphics, interactive elements, and special surprises designed specifically for the birthday celebration.',
  '/HappyBirthday/Icon.svg',
  'Game Development',
  ARRAY['Interactive', 'Personal Project', 'Godot', 'Web Game'],
  '/HappyBirthday/index.html',
  7
) ON CONFLICT (slug) DO NOTHING;

-- Insert Design Showcase
INSERT INTO projects (
  slug, 
  title, 
  subtitle, 
  description, 
  image, 
  featured, 
  category, 
  tags, 
  order_index
) VALUES (
  'design',
  'Design Showcase',
  'Visual Design Portfolio',
  'From UI/UX to visual branding, see how I bring ideas to life through design. This showcase features a collection of design work including user interfaces, brand identities, logo designs, and visual concepts that demonstrate a range of creative capabilities.',
  '/res/icon/KLTL_Studios.svg',
  true,
  'Design',
  ARRAY['UI/UX', 'Design', 'Branding', 'Visual Design', 'Portfolio'],
  8
) ON CONFLICT (slug) DO NOTHING;

-- =============================================
-- 7. STORAGE BUCKET SETUP (Run separately in Storage section)
-- =============================================

-- NOTE: Storage buckets must be created via Supabase Dashboard UI
-- After creating the 'project-images' bucket, run these policies:

/*
-- In Supabase Dashboard: Storage > Create bucket 'project-images' (Public)
-- Then run these policies in SQL Editor:

-- Allow public read access
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Public Access',
  'project-images',
  'bucket_id = ''project-images'''::text
);

-- Allow authenticated users to upload
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Authenticated Upload',
  'project-images',
  'bucket_id = ''project-images'' AND auth.role() = ''authenticated'''::text
);

-- Allow authenticated users to update
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Authenticated Update',
  'project-images',
  'bucket_id = ''project-images'' AND auth.role() = ''authenticated'''::text
);

-- Allow authenticated users to delete
INSERT INTO storage.policies (name, bucket_id, definition)
VALUES (
  'Authenticated Delete',
  'project-images',
  'bucket_id = ''project-images'' AND auth.role() = ''authenticated'''::text
);
*/

-- =============================================
-- 8. VERIFY DATA
-- =============================================

-- Check inserted projects
SELECT 
  slug, 
  title, 
  category, 
  featured, 
  order_index,
  created_at
FROM projects
ORDER BY order_index;

-- =============================================
-- SETUP COMPLETE!
-- =============================================

-- Next steps:
-- 1. Create your admin user in Authentication > Users
-- 2. Create storage bucket 'project-images' in Storage section
-- 3. Configure environment variables in your Vercel project
-- 4. Deploy and test!
