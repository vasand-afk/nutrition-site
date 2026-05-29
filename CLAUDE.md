# Nutrition Information Site — Project Guide

## Owner Context
- User has **no coding experience** — explain everything from first principles
- Take **full technical agency**: make decisions without asking unless there are real trade-offs that affect the business
- Prefer clarity over cleverness in all code and architecture choices

## What We're Building
A professional nutrition information site that sells and distributes:
- **Books** (digital downloads / links to Amazon etc.)
- **Blog** (SEO-optimized articles about nutrition)
- **Newsletter** (email list growth and delivery)
- **Interactive apps** (e.g. calorie calculators, meal planners, quizzes)

## Technical Decisions (Already Made)

### Stack: Next.js + Tailwind CSS + Vercel
- **Next.js**: React-based web framework. Works like a smart template engine — you write content, it produces fast, SEO-friendly web pages.
- **Tailwind CSS**: Styling system. Instead of writing custom CSS, you apply short class names like `text-green-600` or `font-bold`.
- **Vercel**: Free hosting platform made by the same team as Next.js. Deploys your site in ~1 minute from GitHub.

### Content: MDX (Markdown + React)
- Blog posts written in plain English (Markdown), with the option to embed interactive elements
- No CMS needed to start — files live alongside the code

### Payments: Stripe
- Industry standard, handles books/subscriptions
- Works well with Next.js

### Email/Newsletter: Resend + React Email
- Modern, developer-friendly email sending
- Newsletter sign-up stored in a database

### Database: Supabase (Postgres)
- Free tier, hosted, no server to manage
- Stores subscribers, purchases, user accounts

### Auth: NextAuth.js (for gated content / member areas)

## Project Structure
```
nutrition-site/
├── app/              # Pages (home, blog, shop, newsletter)
├── components/       # Reusable UI pieces (header, footer, cards)
├── content/          # Blog posts as .mdx files
├── lib/              # Shared utilities (db, email, stripe)
├── public/           # Images, fonts
└── CLAUDE.md         # This file
```

## Brand & Niche
- **Domain**: FNSMresearch.org
- **Focus**: Nutrition for microbiome optimization in GI diseases + longevity
- **Tone**: Clinical authority + accessible to patients — sits between academic journal and wellness blog
- **Audience**: People with GI conditions (IBS, IBD, SIBO, Crohn's, etc.) + longevity-focused readers + clinicians

## Design Direction
- **Aesthetic**: Scientific credibility — not a wellness influencer site
- **Color palette**: Deep navy (#1B2A4A) + forest green (#2D6A4F) + warm white (#FAFAF7) + gold accent (#C9A84C)
- **Typography**: Playfair Display (serif) for headings (authoritative) + Inter (sans-serif) for body text
- **Mobile-first** — patients research conditions on phones
- **Trust signals**: Research citations, author credentials, peer review badges

## Blockers / Open Questions
1. **Stripe account** — owner needs to create at stripe.com (free, ~5 min setup)
2. **Supabase account** — owner needs to create at supabase.com (free tier)
3. **Book content** — need files to load into the site (PDF, Word, Google Doc all fine)
4. **What does FNSM stand for?** — needed for About page and branding

## Commands
```bash
npm run dev      # Start local development server (http://localhost:3000)
npm run build    # Build for production
npm run lint     # Check code quality
```

## Conventions
- All pages in `app/` directory using Next.js App Router
- Components use TypeScript (catches mistakes before they become bugs)
- Tailwind for all styling — no separate CSS files
- Images go in `public/images/`
- Never commit .env files (secrets stay local)
