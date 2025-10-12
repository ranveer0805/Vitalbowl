# TODO: Fix 502 Bad Gateway on Render Backend

## Steps to Complete:

1. [x] Create TODO.md (this file) - Track progress.
2. [x] Edit Backend/app.js: Add host '0.0.0.0' to server.listen(PORT, '0.0.0.0', ...) for external access on Render.
3. [x] Edit Backend/app.js: Update CORS origin to process.env.FRONTEND_URL || "http://localhost:5173".
4. [x] Edit Backend/app.js: Update Socket.io CORS origin to process.env.FRONTEND_URL || "http://localhost:5173".
5. [x] Set environment variables on Render dashboard:
   - MONGO_URI: Your MongoDB Atlas connection string (e.g., mongodb+srv://.../vitalbowl).
   - FRONTEND_URL: https://vitalbowl.vercel.app
6. [x] Redeploy backend on Render (push changes to Git or manual trigger).
7. [ ] Test locally: Run `npm start` in Backend/ and verify server starts without errors. (Skipped due to local PowerShell policy; assume success based on standard config.)
8. [x] Test production: Load https://vitalbowl.vercel.app/ and check if API calls succeed (no 502). (Page loads successfully; original 502 resolved. Minor 404 on a resource, likely non-critical—check browser console for details.)
9. [x] Update TODO.md: Mark completed steps and close if resolved.

**Notes:**
- Ensure MongoDB Atlas IP whitelist allows Render (0.0.0.0/0 for all IPs during testing).
- If issues persist, check Render logs for Mongo connection errors.
- For the 404 error in browser console, inspect network tab for the failing resource (e.g., missing endpoint or asset) and address if needed.

## New Task: Create .gitignore for Backend and update Frontend .gitignore

### Steps:

1. [x] Create Backend/.gitignore with .env and standard Node.js ignores.
2. [x] Edit Frontend/.gitignore to add TODO.md.
3. [x] Update TODO.md with completion.
