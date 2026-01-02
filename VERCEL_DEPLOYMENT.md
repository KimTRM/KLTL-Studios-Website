# 🚀 Vercel Deployment Guide

## Step-by-Step Setup (15 minutes total)

### 1. Prepare Environment Variables (1 minute)

Create a `.env.local` file for testing locally:

```env
NEXT_PUBLIC_SUPABASE_URL=your-url-here
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-key-here
```

### 2. Set Up Supabase (5 minutes)

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click **"New Project"**
3. Fill in:
    - Name: `KLTL Portfolio`
    - Database Password: (create a strong password)
    - Region: (choose closest to you)
4. Wait ~2 minutes for project creation
5. Go to **Settings > API** and copy:
    - Project URL
    - `anon` public key
    - `service_role` key (keep this secret!)

### 3. Run Database Schema (3 minutes)

1. In Supabase dashboard, go to **SQL Editor**
2. Click **"New Query"**
3. Copy the entire contents of `schema.sql`
4. Paste and click **"Run"**
5. You should see: `8 rows` inserted message
6. Verify in **Table Editor** - you should see all 8 projects

### 4. Create Storage Bucket (2 minutes)

1. Go to **Storage** section
2. Click **"Create a new bucket"**
3. Name: `project-images`
4. Make it **Public** (check the box)
5. Click **"Create bucket"**

### 5. Create Admin User (1 minute)

1. Go to **Authentication > Users**
2. Click **"Add user"** > **"Create new user"**
3. Enter your email and password
4. Click **"Create user"**
5. (Optional) Verify email if required

### 6. Deploy to Vercel (3 minutes)

1. Go to [vercel.com](https://vercel.com)
2. Sign up/login with GitHub
3. Click **"Add New Project"**
4. Import `KLTL-Studios.github.io` repository
5. **Add Environment Variables**:
    ```
    NEXT_PUBLIC_SUPABASE_URL = (your Supabase project URL)
    NEXT_PUBLIC_SUPABASE_ANON_KEY = (your anon key)
    SUPABASE_SERVICE_ROLE_KEY = (your service role key)
    ```
6. Click **"Deploy"**
7. Wait 2-3 minutes for deployment

### 7. Test Your Site! 🎉

Once deployed, you'll get a URL like: `your-project.vercel.app`

**Test these URLs:**

-   `your-project.vercel.app` - Public homepage ✅
-   `your-project.vercel.app/projects` - Projects list ✅
-   `your-project.vercel.app/admin/login` - Admin login ✅

**Login credentials:**

-   Email: (the email you created in Supabase)
-   Password: (the password you set)

## What You Can Do Now

### Admin Panel Features:

-   ✅ Add new projects through web form
-   ✅ Edit existing projects
-   ✅ Upload images directly
-   ✅ Toggle featured status
-   ✅ Reorder projects
-   ✅ Delete projects

### For Future Updates:

**To add a new project:**

1. Go to `yoursite.vercel.app/admin/login`
2. Log in
3. Click **"Add Project"**
4. Fill in the form
5. Upload images
6. Click **"Create Project"**
7. Project is live immediately!

**No Git, no rebuild, no deployment needed!**

## Custom Domain (Optional)

Want to use a custom domain like `kltlstudios.com`?

1. In Vercel dashboard, go to **Settings > Domains**
2. Add your domain
3. Update DNS records (Vercel will guide you)
4. Done! Your site will work on your custom domain

## Troubleshooting

### "Missing environment variables" error

-   Check all 3 env vars are set in Vercel dashboard
-   Make sure there are no extra spaces
-   Redeploy after adding env vars

### "Failed to authenticate" in admin

-   Check user exists in Supabase Authentication
-   Confirm password is correct
-   Check Supabase project URL is correct

### Projects not showing

-   Check data was inserted (go to Supabase Table Editor)
-   Check RLS policies are enabled
-   Check browser console for errors

### Images not loading

-   Check storage bucket is public
-   Check image paths are correct (should start with `/`)
-   Check images exist in `public` folder

## GitHub Pages Alternative

If you still want to use GitHub Pages for the public site:

1. Create a separate branch for the static build
2. Keep `output: 'export'` in that branch
3. Deploy that branch to GitHub Pages
4. Use Vercel only for the admin panel

## Cost Estimate

**Vercel Free Tier:**

-   100GB bandwidth/month
-   Unlimited deployments
-   Custom domains
-   **Cost: $0/month** ✅

**Supabase Free Tier:**

-   500MB database
-   1GB file storage
-   50,000 monthly active users
-   **Cost: $0/month** ✅

**Total monthly cost: $0** 🎉

Your portfolio gets thousands of visitors before hitting limits!

## Next Steps After Deployment

1. ✅ Test admin login
2. ✅ Add a new test project
3. ✅ Upload an image
4. ✅ Verify it appears on public site
5. ✅ Share your new portfolio URL!
6. 🎨 Customize admin panel styling (optional)
7. 📧 Set up custom domain (optional)

---

**Need help?** Check the error logs in Vercel dashboard under **Deployments > (your deployment) > View Function Logs**
