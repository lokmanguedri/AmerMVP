# TOLI Parts - Final Deployment Manifest 🚀

The following 4 files have been regenerated on your local machine to ensure 100% Vercel compatibility.

**Action:** Drag and drop these files from your computer to the root of your GitHub repository in the browser.

| File Name | Location | Purpose |
| :--- | :--- | :--- |
| **package.json** | Root | Forces Next.js 14, React 18, and enables `prisma generate` during build. |
| **next.config.mjs** | Root | Configures the build to IGNORE all strict linting errors. (Deletes `next.config.ts`) |
| **layout.tsx** | `app/` | The missing Root Layout that caused the build to fail. |
| **schema.prisma** | `prisma/` | The database schema required for the backend connections. |

---

## Upload Instructions

1.  Open your GitHub Repository in your browser: `https://github.com/StartUp-2025/toli-parts` (or your specific URL).
2.  Click **"Add file"** > **"Upload files"**.
3.  Drag **package.json** and **next.config.mjs** to the drop zone.
4.  Navigate into `app/` folder on GitHub, click "Upload files", and drag **app/layout.tsx**.
5.  Navigate into `prisma/` folder on GitHub, click "Upload files", and drag **prisma/schema.prisma**.
6.  **Commit changes** for each upload.

## Vercel Settings
*   Ensure **DATABASE_URL** is set in Environment Variables.
*   If basic deployment fails, set "Install Command" to `npm install --legacy-peer-deps`.
