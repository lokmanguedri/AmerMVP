# Final Fix Guide: Node.js & Deployment

## 1. Fix Node.js on Windows (The "npm not recognized" error)
If you installed Node.js but `npm` commands fail, your system "Path" is missing the entry.

1.  **Search & Open:** Press `Win` key, type **"Environment Variables"**, and select *"Edit the system environment variables"*.
2.  **Edit Path:**
    *   Click **"Environment Variables"** button.
    *   Under **"System variables"** (bottom box), find and select **"Path"**, then click **"Edit"**.
    *   Click **"New"** and add this path (standard install location):
        `C:\Program Files\nodejs\`
    *   Click **OK** on all windows.
3.  **Restart Terminal:** Close VS Code completely and reopen it. Type `npm -v` to verify.

## 2. Vercel Deployment Settings (Bypass Dependency Errors)
Since we are downgrading strict dependencies to ensure stability, Vercel might complain about legacy trees.

1.  Go to your **Vercel Project Settings**.
2.  Navigate to **General** > **Build & Development Settings**.
3.  Flip the switch for **"Install Command"** to `Override`.
4.  Paste this command:
    ```bash
    npm install --legacy-peer-deps
    ```
5.  **Save** and Redeploy.

## 3. Why this `package.json` works
I have updated your `package.json` to use:
*   **Next.js 14 + React 18**: The gold standard for stability right now. 
*   **Three.js Compatibility**: React 19 is too new for many 3D libraries; React 18 fixes the conflicts.
*   **Postinstall Hook**: `"prisma generate"` runs automatically on Vercel, so you don't need to run it locally if you can't.

**Action:** Upload the updated `package.json` to GitHub and hit Redeploy on Vercel!
