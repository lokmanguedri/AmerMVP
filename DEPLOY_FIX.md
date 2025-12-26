# Deployment Recovery & Fix Guide

## 1. Fix Prisma Client (Module Not Found)
The error `Can't resolve '@prisma/client'` occurs because the client hasn't been generated in the build environment or isn't listed in `dependencies`.

**Run these commands locally immediately:**

```bash
# Install the client package
npm install @prisma/client

# Install Prisma CLI as dev dependency (if missing)
npm install -D prisma

# Generate the client (Creates the actual files in node_modules)
npx prisma generate
```

## 2. Sync Missing Files to GitHub
Your `app`, `lib`, and `components` folders are missing from GitHub. This is likely because they haven't been staged.

**Run this Git Sync Script:**

```bash
# 1. Stage ALL files (even untracked ones)
git add .

# 2. Commit with a clear message
git commit -m "Fix: Add missing core directories (app, lib, components) and Prisma Client"

# 3. Push to your main branch
git push origin main
```

> **Note:** If `git status` shows "nothing to commit, working tree clean" but files are still missing on GitHub, check if your `.gitignore` is too aggressive. (I have verified it looks correct, but double check).

## 3. Vercel Configuration (Critical)
For the build to succeed on Vercel, you **MUST** add the following Environment Variable in your Vercel Project Settings:

*   **Key:** `DATABASE_URL`
*   **Value:** `mongodb+srv://<username>:<password>@cluster.mongodb.net/toli-parts` (Your actual connection string)

**Why?** `prisma generate` runs during the build. If it interacts with the DB (or if using MongoDB introspection), it needs this URL. Even for generation, it validates the schema.

## 4. Final Verification
After pushing and setting the Env Var:
1.  Go to Vercel Dashboard.
2.  Redeploy the latest commit.
3.  The build should now pass, and `lib/prisma.ts` will successfully import `@prisma/client`.
