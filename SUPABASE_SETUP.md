# Supabase Setup & Migration Guide

## Quick Setup Instructions

### 1. Create Supabase Account & Project

1. Go to [https://supabase.com](https://supabase.com)
2. Sign up or log in
3. Click "New Project"
4. Fill in project details:
    - Name: KLTL Portfolio
    - Database Password: (choose a strong password)
    - Region: (choose closest to your users)
5. Wait for project to be created (~2 minutes)

### 2. Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values:
    - **Project URL** (looks like: `https://xxxxx.supabase.co`)
    - **anon/public key** (starts with `eyJ...`)
    - **service_role key** (starts with `eyJ...`)

### 3. Configure Environment Variables

Create a `.env.local` file in your project root:

```env
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

**⚠️ Important:** Add `.env.local` to your `.gitignore` to keep keys secret!

### 4. Set Up Database Schema

1. In Supabase dashboard, go to **SQL Editor**
2. Copy the entire SQL script from `DATABASE_SCHEMA.md`
3. Paste it in the SQL Editor
4. Click **Run** to execute
5. Verify tables were created in **Table Editor**

### 5. Create Storage Bucket for Images

1. Go to **Storage** in Supabase dashboard
2. Click **New bucket**
3. Bucket name: `project-images`
4. Set as **Public bucket** (check the box)
5. Click **Create bucket**
6. Click on the bucket name
7. Go to **Policies** tab
8. Click **New Policy** → Use the SQL from `DATABASE_SCHEMA.md` storage section

### 6. Create Your Admin Account

1. Go to **Authentication** → **Providers**
2. Make sure **Email** is enabled
3. Go to **Authentication** → **Users**
4. Click **Add user** → **Create new user**
5. Enter your email and password
6. Click **Create user**
7. Confirm your email if required

### 7. Migrate Existing Projects

Run the SQL commands in `DATABASE_SCHEMA.md` under "Initial Data Migration" section, or:

1. Go to [http://localhost:3001/admin/login](http://localhost:3001/admin/login)
2. Log in with your admin credentials
3. Go to **Projects** → **Add Project**
4. Manually add each project from `app/data/projects.ts`

**Or use the migration script:**

```sql
-- In Supabase SQL Editor, insert all projects at once:
INSERT INTO projects (slug, title, subtitle, description, image, featured, category, tags, gallery, order_index)
VALUES
  -- Project 100
  (
    'Project100',
    'Project 100',
    'Learn Programming Through Play',
    'Project 100 is an educational RPG that makes learning programming fun and accessible. Through engaging block-based puzzles and interactive challenges, players learn fundamental programming concepts while embarking on an epic adventure.',
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
    1
  ),
  -- KnowledgeSweeper
  (
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
    2
  ),
  -- Design Showcase
  (
    'design',
    'Design Showcase',
    'Visual Design Portfolio',
    'From UI/UX to visual branding, see how I bring ideas to life through design. This showcase features a collection of design work including user interfaces, brand identities, and visual concepts.',
    '/res/icon/KLTL_Studios.svg',
    true,
    'Design',
    ARRAY['UI/UX', 'Design', 'Branding', 'Visual Design'],
    ARRAY[],
    3
  );
```

### 8. Test Everything

1. Start your dev server: `npm run dev`
2. Visit [http://localhost:3001/admin/login](http://localhost:3001/admin/login)
3. Log in with your admin account
4. Try creating a new project
5. Try uploading an image
6. Visit the public site and verify projects show up

### 9. Update Frontend to Use Supabase (Optional)

Currently, your frontend still uses `app/data/projects.ts`. To make it dynamic:

1. Update [app/page.tsx](app/page.tsx) to fetch from Supabase
2. Update [app/projects/page.tsx](app/projects/page.tsx) to fetch from Supabase
3. Update [app/projects/[slug]/page.tsx](app/projects/[slug]/page.tsx) to fetch from Supabase

Example:

```typescript
// app/page.tsx
async function getProjects() {
    const { data } = await supabase
        .from("projects")
        .select("*")
        .eq("featured", true)
        .order("order_index");

    return data || [];
}
```

### 10. Deploy to GitHub Pages

Since Supabase is a cloud service, your static GitHub Pages site can still fetch data from it!

1. Make sure `.env.local` is in `.gitignore`
2. In GitHub repository settings → **Secrets and variables** → **Actions**
3. Add your Supabase environment variables as secrets
4. Update your build workflow to use these secrets
5. Deploy as usual with `npm run build`

## Troubleshooting

### "Missing Supabase environment variables"

-   Check `.env.local` exists and has correct values
-   Restart dev server after adding env vars

### "Failed to upload image"

-   Check storage bucket is public
-   Check storage policies are set correctly
-   Check file size (max 5MB by default)

### "Failed to authenticate"

-   Check user exists in Authentication → Users
-   Confirm email if required
-   Check password is correct

### Projects not showing up

-   Check data was inserted in Table Editor
-   Check RLS policies allow public read access
-   Check browser console for errors

## Next Steps

-   ✅ Customize the admin UI colors/branding
-   ✅ Add more project fields (technologies, client name, etc.)
-   ✅ Add rich text editor for descriptions
-   ✅ Add image optimization/resizing
-   ✅ Add project categories management
-   ✅ Add analytics tracking
-   ✅ Set up email notifications for new projects

## Support

-   Supabase Docs: [https://supabase.com/docs](https://supabase.com/docs)
-   Supabase Discord: [https://discord.supabase.com](https://discord.supabase.com)
-   Next.js Docs: [https://nextjs.org/docs](https://nextjs.org/docs)
