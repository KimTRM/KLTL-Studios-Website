# KLTL Studios Portfolio

[![Next.js](https://img.shields.io/badge/Next.js-15.2.4-black)](https://nextjs.org/)
[![React](https://img.shields.io/badge/React-19.0.0-blue)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![Supabase](https://img.shields.io/badge/Supabase-CMS-green)](https://supabase.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

Portfolio website showcasing my work as a **Developer, Designer, and Musician**. Built with Next.js 15, React 19, TypeScript, and Supabase CMS.

🌐 **Live Site**: [https://your-site.vercel.app](https://your-site.vercel.app)  
🔐 **Admin Panel**: [https://your-site.vercel.app/admin](https://your-site.vercel.app/admin)

## ✨ Features

### 🎯 Core Features

-   **Responsive Design** - Mobile-first approach with hamburger menu
-   **Project Showcase** - Filterable and searchable project gallery
-   **Interactive Contact Form** - Working contact form with email integration
-   **Resume/CV Section** - Downloadable PDF and online resume view
-   **Project Detail Pages** - Individual pages for featured projects with image galleries
-   **404 Page** - Custom styled error page
-   **🆕 Admin CMS** - Full-featured content management system

### 🗄️ CMS Features (NEW!)

-   **Admin Dashboard** - Stats, recent projects, quick actions
-   **Project Management** - Add, edit, delete projects through web UI
-   **Image Uploads** - Direct image upload to Supabase Storage
-   **Featured Toggle** - Mark projects as featured from admin panel
-   **Authentication** - Secure login with Supabase Auth
-   **Real-time Updates** - Changes appear immediately on live site
-   **No Code Needed** - Manage content without touching code

### 🚀 Performance & SEO

-   **SEO Optimized** - Comprehensive meta tags, Open Graph, and Twitter Cards
-   **Sitemap & Robots.txt** - Automatic sitemap generation for search engines
-   **Image Optimization** - Next.js Image component with lazy loading
-   **Server-Side Rendering** - Dynamic routes with SSR on Vercel
-   **Loading States** - Smooth loading indicators for better UX

### ♿ Accessibility

-   **ARIA Labels** - Proper accessibility labels throughout
-   **Keyboard Navigation** - Full keyboard navigation support with focus indicators
-   **Skip to Main Content** - Skip navigation link for screen readers
-   **Semantic HTML** - Proper HTML5 semantic structure

### 🎨 Design Features

-   **Smooth Scrolling** - Smooth scroll behavior for anchor links
-   **Interactive Gallery** - Click-to-expand image gallery with modal preview
-   **Dark Theme** - Beautiful dark theme with star background
-   **Hover Effects** - Smooth transitions and hover states
-   **Custom Styling** - Unique design with red accent color (#dc143c)

## 🚀 Quick Start

### Prerequisites

-   Node.js 18+ installed
-   Supabase account (free tier works great!)
-   Vercel account (for deployment)

## 📂 Project Structure

```
KLTL-Studios.github.io/
├── app/
│   ├── about/              # About page
│   ├── admin/             # 🆕 Admin CMS Panel
│   │   ├── components/    # Admin-specific components
│   │   │   └── ImageUpload.tsx  # Image upload to Supabase Storage
│   │   ├── dashboard/     # Admin dashboard with stats
│   │   ├── login/         # Admin authentication page
│   │   ├── projects/      # Project CRUD pages
│   │   │   ├── new/       # Add new project
│   │   │   ├── [id]/      # Edit existing project
│   │   │   └── page.tsx   # Projects list
│   │   └── layout.tsx     # Admin layout with auth protection
│   ├── components/         # Shared components
│   │   └── ProjectsWithFilter.tsx  # Project filtering component
│   ├── data/              # 🔄 Legacy data (migrated to database)
│   │   └── projects.ts    # Fallback project data
│   ├── home/
│   │   ├── components/    # Home page components
│   │   │   ├── ContactForm.tsx
│   │   │   └── ProjectCardComponent.tsx
│   │   ├── css/          # Component styles
│   │   └── sections/     # Home page sections
│   ├── lib/              # Utility functions
│   │   ├── analytics.ts  # Google Analytics helper
│   │   ├── supabase.ts   # 🆕 Supabase client (public)
│   │   └── supabase-admin.ts  # 🆕 Supabase admin client
│   ├── projects/         # Project pages
│   │   ├── design/       # Design showcase
│   │   ├── KnowledgeSweeper/
│   │   ├── Project100/
│   │   └── css/          # Project page styles
│   ├── resume/           # Online resume page
│   ├── types/            # TypeScript types
│   │   └── project.ts
│   ├── globals.css       # Global styles
│   ├── layout.tsx        # Root layout with metadata
│   ├── loading.tsx       # Loading component
│   ├── not-found.tsx     # 404 page
│   ├── page.tsx          # Home page
│   └── sitemap.ts        # Dynamic sitemap
├── public/               # Static assets
│   ├── res/             # Images and resources
│   └── robots.txt       # Search engine directives
├── schema.sql           # 🆕 Database schema with seed data
├── .env.example         # Environment variables template
├── VERCEL_DEPLOYMENT.md # 🆕 Step-by-step deployment guide
├── DEPLOYMENT_CHECKLIST.md  # 🆕 Pre/post deployment checklist
├── next.config.ts       # Next.js configuration (Vercel-ready)
├── package.json
├── tsconfig.json
└── README.md
```

## 🛠️ Technologies Used

-   **Framework**: Next.js 15.2.4 (with App Router)
-   **UI Library**: React 19.0.0
-   **Language**: TypeScript 5
-   **Styling**: Custom CSS + Tailwind CSS 4
-   **Database**: Supabase (PostgreSQL)
-   **Storage**: Supabase Storage (Images)
-   **Auth**: Supabase Auth
-   **Deployment**: Vercel (Free Tier)

## 🚀 Getting Started

### Local Development

1. **Clone the repository**

    ```bash
    git clone https://github.com/KLTL-Studios/KLTL-Studios.github.io.git
    cd KLTL-Studios.github.io
    ```

2. **Install dependencies**

    ```bash
    npm install
    ```

3. **Set up environment variables**

    ```bash
    cp .env.example .env.local
    ```

    Add your Supabase credentials to `.env.local`:

    ```env
    NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
    NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
    SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
    ```

4. **Set up Supabase database**

    - Create a free Supabase project at [supabase.com](https://supabase.com)
    - Go to SQL Editor
    - Copy and paste the contents of `schema.sql`
    - Click "Run" to create tables and insert seed data

5. **Run development server**

    ```bash
    npm run dev
    ```

    Open [http://localhost:3000](http://localhost:3000) in your browser.

6. **Access admin panel**
    - Visit [http://localhost:3000/admin](http://localhost:3000/admin)
    - Log in with your Supabase admin credentials

### Production Deployment

**📘 See [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) for complete deployment guide (15 minutes)**

Quick steps:

1. Create Supabase project and run `schema.sql`
2. Create storage bucket named `project-images` (public)
3. Push code to GitHub
4. Deploy to Vercel and add environment variables
5. Test admin panel

## 🔐 Admin CMS Usage

### Accessing the Admin Panel

1. Navigate to `/admin` on your deployed site
2. Log in with your Supabase credentials
3. Access the dashboard to manage projects

### Managing Projects

**Dashboard**: View stats, recent projects, and quick actions

**Add Project**:

1. Click "Add New Project" from dashboard or projects page
2. Fill in all required fields:
    - Title, subtitle, description
    - Upload featured image
    - Set category and featured status
    - Add tags (comma-separated)
    - Add gallery images (comma-separated URLs)
    - Add live URL and GitHub URL
3. Click "Create Project"

**Edit Project**:

1. Go to Projects list
2. Click "Edit" on any project
3. Update fields as needed
4. Click "Update Project"

**Delete Project**:

1. Go to Projects list
2. Click "Delete" on any project
3. Confirm deletion

**Toggle Featured**:

-   Click the star icon (★/☆) next to any project to mark as featured
-   Featured projects appear on the home page

### Image Management

**Upload Images**:

-   Use the image upload component in project forms
-   Images are automatically uploaded to Supabase Storage
-   Uploaded images are optimized and served via CDN

**Image URLs**:

-   Use absolute URLs for external images
-   Use Supabase Storage URLs for uploaded images
-   Gallery images: comma-separated URLs (e.g., `url1, url2, url3`)

## 🎨 Customization

### Adding Projects (via Code)

If you prefer to add projects programmatically, edit `app/data/projects.ts`:

```typescript
export const allProjects: Project[] = [
    {
        title: "Your Project",
        description: "Project description",
        image: "/path/to/image.svg",
        link: "projects/your-project",
    },
    // ... more projects
];
```

**Note**: Projects in the database take priority over projects in `projects.ts`

### Updating Personal Information

-   **Contact Email**: Update in `app/home/components/ContactForm.tsx`
-   **Social Links**: Update in `app/layout.tsx` (footer)
-   **Resume Content**: Update in `app/resume/page.tsx`
-   **Meta Tags**: Update in `app/layout.tsx`

### Styling

-   Global styles: `app/globals.css`
-   Component-specific: `app/home/css/`
-   Colors: Main accent color is `#dc143c` (crimson red)

## 📊 Analytics Setup

To enable Google Analytics:

1. Add your GA tracking ID to `.env.local`:
    ```env
    NEXT_PUBLIC_GA_ID=G-XXXXXXXXXX
    ```
2. The analytics helper is ready in `app/lib/analytics.ts`

## 🔧 Configuration Files

-   **next.config.ts** - Next.js configuration for Vercel deployment
-   **schema.sql** - Database schema with seed data (8 projects)
-   **tsconfig.json** - TypeScript configuration
-   **eslint.config.mjs** - ESLint rules
-   **postcss.config.mjs** - PostCSS for Tailwind

## 🗄️ Database Schema

The `projects` table includes:

-   `id` - UUID primary key
-   `slug` - Unique URL-friendly identifier
-   `title` - Project title
-   `subtitle` - Short tagline
-   `description` - Full project description
-   `image` - Featured image URL
-   `featured` - Boolean flag for featured projects
-   `category` - Project category
-   `tags` - Array of tags
-   `gallery` - Array of gallery image URLs
-   `live_url` - Live project URL
-   `github_url` - GitHub repository URL
-   `order_index` - Display order (1-based)
-   `created_at`, `updated_at` - Timestamps

**Row Level Security (RLS)**:

-   Public: Read access to all projects
-   Authenticated: Full CRUD access for admin users

## 📝 Key Features

✅ **CMS & Database** - Full-featured admin panel with Supabase
✅ **Image Uploads** - Direct upload to Supabase Storage with CDN
✅ **Authentication** - Secure admin access with Supabase Auth
✅ **SEO & Metadata** - Comprehensive meta tags, Open Graph, Twitter Cards
✅ **Sitemap & Robots.txt** - Automatic search engine optimization
✅ **Centralized Data** - Database-driven content with fallback data
✅ **TypeScript Types** - Proper type definitions for all data
✅ **Contact Form** - Working contact form component
✅ **Project Filtering** - Search and category filtering
✅ **Resume Section** - Online resume with PDF download
✅ **Loading States** - Better UX with loading indicators
✅ **Accessibility** - ARIA labels, keyboard navigation, skip links
✅ **404 Page** - Custom styled error page
✅ **Analytics Ready** - Google Analytics integration setup
✅ **Security** - All external links have proper rel attributes

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear Next.js cache
rm -rf .next

# Reinstall dependencies
rm -rf node_modules package-lock.json
npm install

# Try build again
npm run build
```

### Admin Panel Issues

**Cannot access admin panel**:

-   Verify environment variables in `.env.local` (local) or Vercel (production)
-   Check Supabase project status
-   Verify admin user exists in Supabase Authentication

**Images not uploading**:

-   Verify storage bucket named `project-images` exists
-   Check bucket is set to public
-   Verify service role key has storage permissions

**Database connection failed**:

-   Verify Supabase project URL and keys
-   Check if database is paused (free tier auto-pauses after 7 days inactivity)
-   Run `schema.sql` if tables are missing

### Supabase Issues

```bash
# Test connection
node -e "const { createClient } = require('@supabase/supabase-js'); const client = createClient(process.env.NEXT_PUBLIC_SUPABASE_URL, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY); console.log('Connected');"

# Check if tables exist (from Supabase dashboard)
SELECT * FROM projects LIMIT 1;
```

## 📚 Additional Resources

-   [VERCEL_DEPLOYMENT.md](VERCEL_DEPLOYMENT.md) - Complete deployment guide
-   [DEPLOYMENT_CHECKLIST.md](DEPLOYMENT_CHECKLIST.md) - Pre/post deployment checklist
-   [schema.sql](schema.sql) - Database schema with seed data
-   [Next.js Documentation](https://nextjs.org/docs)
-   [Supabase Documentation](https://supabase.com/docs)
-   [Vercel Documentation](https://vercel.com/docs)

## 📧 Contact

**Kim Louise Labrador**

-   Email: kimlabrador71@gmail.com
-   GitHub: [@kimtrm](https://github.com/kimtrm)
-   LinkedIn: [kim-louise-labrador](https://www.linkedin.com/in/kim-louise-labrador/)
-   YouTube: [@kltlstudios](https://youtube.com/@kltlstudios)

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🙏 Acknowledgments

-   Built with [Next.js](https://nextjs.org/)
-   Icons and images are custom created
-   Deployed on [GitHub Pages](https://pages.github.com/)

---

**Ad Astra Per Aspera** ✨
