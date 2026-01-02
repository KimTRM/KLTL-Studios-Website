# ✅ Pre-Deployment Checklist

Use this checklist before pushing to GitHub and deploying to Vercel.

## Local Setup

-   [ ] Created `.env.local` with Supabase credentials
-   [ ] Tested `npm run dev` - site loads locally
-   [ ] Tested `npm run build` - build succeeds
-   [ ] `.gitignore` includes `.env*` (prevents committing secrets)

## Supabase Setup

-   [ ] Created Supabase project
-   [ ] Copied Project URL and API keys
-   [ ] Ran `schema.sql` in SQL Editor
-   [ ] Verified 8 projects inserted (check Table Editor)
-   [ ] Created `project-images` storage bucket (public)
-   [ ] Created admin user in Authentication

## GitHub

-   [ ] Committed all changes
-   [ ] Pushed to GitHub
-   [ ] Verified `next.config.ts` has NO `output: 'export'`
-   [ ] Verified `.env.local` is NOT in repository (check GitHub)

## Vercel Deployment

-   [ ] Signed up/logged into Vercel
-   [ ] Imported GitHub repository
-   [ ] Added 3 environment variables:
    -   `NEXT_PUBLIC_SUPABASE_URL`
    -   `NEXT_PUBLIC_SUPABASE_ANON_KEY`
    -   `SUPABASE_SERVICE_ROLE_KEY`
-   [ ] Clicked Deploy
-   [ ] Deployment succeeded (check for green checkmark)

## Testing

-   [ ] Public site loads: `your-site.vercel.app`
-   [ ] Projects page shows all 8 projects
-   [ ] Admin login works: `your-site.vercel.app/admin/login`
-   [ ] Can log in with Supabase user credentials
-   [ ] Dashboard shows stats and projects
-   [ ] Can add a new test project
-   [ ] Can upload an image
-   [ ] Can edit an existing project
-   [ ] Can toggle featured status
-   [ ] New project appears on public site immediately

## Optional Enhancements

-   [ ] Set up custom domain in Vercel
-   [ ] Update DNS records for custom domain
-   [ ] Test custom domain works
-   [ ] Update social media links with new URL
-   [ ] Share new portfolio!

## Troubleshooting Commands

If something goes wrong, use these:

```bash
# Clear Next.js cache and rebuild
Remove-Item -Recurse -Force .next
npm run build

# Check for TypeScript errors
npx tsc --noEmit

# Check environment variables locally
Get-Content .env.local

# Test Supabase connection (in browser console)
fetch(process.env.NEXT_PUBLIC_SUPABASE_URL)
```

## Quick Reference

**Vercel Dashboard:**

-   Deployments: See build logs and errors
-   Settings > Environment Variables: Update secrets
-   Settings > Domains: Add custom domain

**Supabase Dashboard:**

-   Table Editor: View/edit projects directly
-   Authentication: Manage admin users
-   Storage: View uploaded images
-   SQL Editor: Run database queries

**Admin Panel URLs:**

-   Login: `/admin/login`
-   Dashboard: `/admin/dashboard`
-   Projects: `/admin/projects`
-   Add Project: `/admin/projects/new`

## Current Configuration

✅ **next.config.ts**: Configured for Vercel (no static export)
✅ **schema.sql**: Complete with all 8 projects
✅ **Admin Panel**: Fully built and ready
✅ **Build**: Passing (11 pages generated)

---

**Ready to deploy!** Follow the steps in `VERCEL_DEPLOYMENT.md`
