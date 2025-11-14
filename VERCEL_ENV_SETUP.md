# Vercel Environment Variables Setup

## Problem:
Frontend deployed on Vercel but not connecting to backend because environment variables are missing.

## Solution:

### Step 1: Go to Vercel Dashboard
1. Open: https://vercel.com/dashboard
2. Find your project: `alert-vicky-hair-saloon`
3. Click on the project name

### Step 2: Add Environment Variables
1. Click on **Settings** tab (top navigation)
2. Click on **Environment Variables** (left sidebar)
3. Add these variables:

#### Variable 1: Backend API URL
```
Name: REACT_APP_API_URL
Value: https://vicky-salon-backend.onrender.com/api
Environment: Production, Preview, Development (select all)
```

#### Variable 2: Owner Password
```
Name: REACT_APP_OWNER_PASSWORD
Value: Iit7065@
Environment: Production, Preview, Development (select all)
```

### Step 3: Redeploy
After adding variables:
1. Go to **Deployments** tab
2. Click on the latest deployment (top one)
3. Click the **⋯** (three dots) menu
4. Click **Redeploy**
5. Check "Use existing Build Cache" ✅
6. Click **Redeploy** button

### Step 4: Verify
Wait 2-3 minutes for redeployment, then test:

1. **Customer Page**: https://alert-vicky-hair-saloon.vercel.app/
   - Should load shop info from backend
   - Camera should work
   - "Notify Barber" button should work

2. **Owner Page**: https://alert-vicky-hair-saloon.vercel.app/owner
   - Should ask for password
   - Enter: `Iit7065@`
   - Should show notification panel

## Alternative: Update via Vercel CLI

If you have Vercel CLI installed:

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login
vercel login

# Set environment variables
vercel env add REACT_APP_API_URL production
# Enter: https://vicky-salon-backend.onrender.com/api

vercel env add REACT_APP_OWNER_PASSWORD production
# Enter: Iit7065@

# Redeploy
vercel --prod
```

## Troubleshooting

### If frontend still doesn't connect:
1. Open browser console (F12)
2. Check for errors
3. Look for API calls to localhost (should be to render.com)
4. Make sure you redeployed AFTER adding env vars

### Check if env vars are set:
1. In Vercel dashboard → Settings → Environment Variables
2. You should see both `REACT_APP_API_URL` and `REACT_APP_OWNER_PASSWORD`
3. Each should be enabled for Production

## Current Status:
- ✅ Backend: https://vicky-salon-backend.onrender.com/ (WORKING)
- ✅ Frontend: https://alert-vicky-hair-saloon.vercel.app/ (DEPLOYED)
- ❌ Connection: Not configured (need to add env vars)
- ✅ GitHub Actions: Added to keep backend alive
