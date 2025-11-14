# Render Deployment Guide - Complete Setup

## Problem: Disconnection Issue
The "डिस्कनेक्टेड ✗" issue happens because:
1. Render free tier spins down after 15 minutes of inactivity (cold start)
2. SSE connection drops when backend sleeps
3. Frontend on Vercel, Backend on Render = cross-origin delays

## Solution: Deploy BOTH on Render

### Step 1: Deploy Using Render Blueprint

1. **Go to Render Dashboard**: https://dashboard.render.com/blueprints

2. **Create New Blueprint**:
   - Click "New Blueprint Instance"
   - Connect GitHub: `algsoch/alert_hair_saloon`
   - Render will auto-detect `render.yaml`
   - Click "Apply"

3. **Render will create TWO services**:
   - ✅ `vicky-salon-backend` (Docker) - Java Spring Boot API
   - ✅ `vicky-salon-frontend` (Static) - React app

4. **Wait for deployment** (5-10 minutes for backend, 2-3 minutes for frontend)

5. **Get URLs**:
   - Backend: `https://vicky-salon-backend.onrender.com`
   - Frontend: `https://vicky-salon-frontend.onrender.com`

### Step 2: Update Backend URL (if needed)

If the backend URL is different from `https://vicky-salon-backend.onrender.com`:

1. Go to Render Dashboard → `vicky-salon-frontend` service
2. Environment → Edit
3. Update `REACT_APP_API_URL` to your actual backend URL
4. Save and redeploy

### Step 3: Fix Disconnection Issue

The backend still sleeps after 15 minutes. Here are solutions:

#### Option A: Keep Backend Alive (Free)
GitHub Actions already set up! They ping every 10 minutes:
- `.github/workflows/keep-alive.yml` ✅ Already in repo
- `.github/workflows/backend-health.yml` ✅ Already in repo

Enable in GitHub:
1. Go to: https://github.com/algsoch/alert_hair_saloon/actions
2. Click "I understand my workflows, go ahead and enable them"
3. Done! Backend will stay awake

#### Option B: Manual Wake-Up
If you see "डिस्कनेक्टेड", just refresh the owner page:
1. It will wake up backend (takes 30-60 seconds first time)
2. Connection will restore automatically

#### Option C: Upgrade to Paid ($7/month)
- No cold starts
- Always connected
- Faster response

### Step 4: Testing

1. **Backend**: https://vicky-salon-backend.onrender.com/
   - Should show: `{"status":"Backend is running successfully! ✅"}`

2. **Frontend**: https://vicky-salon-frontend.onrender.com/
   - Customer page should load with shop info
   - Camera should work

3. **Owner Page**: https://vicky-salon-frontend.onrender.com/owner
   - Enter password: `Iit7065@`
   - Should show: "कनेक्टेड ✓" (connected)
   - If shows "डिस्कनेक्टेड ✗", wait 30 seconds for backend to wake up

### Step 5: Auto-Reconnection

The frontend already has auto-reconnection logic:
- If connection drops, it tries to reconnect
- SSE automatically retries on error
- Page refresh also reconnects

## URLs Summary

After deployment, you'll have:

- **Customer Page**: https://vicky-salon-frontend.onrender.com/
- **Owner Panel**: https://vicky-salon-frontend.onrender.com/owner
- **Backend API**: https://vicky-salon-backend.onrender.com/
- **GitHub Actions**: Keeping backend alive (enable them!)

## Troubleshooting

### If "डिस्कनेक्टेड" persists:

1. **Check backend is running**:
   ```bash
   curl https://vicky-salon-backend.onrender.com/health
   ```
   Should return: `Backend is running!`

2. **Check GitHub Actions enabled**:
   - Go to https://github.com/algsoch/alert_hair_saloon/actions
   - Should see "Keep Backend Alive" running every 10 minutes

3. **Check browser console** (F12):
   - Look for SSE connection errors
   - Should see: "Connected to notification stream"

4. **Try refreshing owner page**:
   - Wait 30-60 seconds after refresh
   - Backend wakes up, then connects

### If build fails:

1. Check Render logs in dashboard
2. Make sure `render.yaml` is in root directory
3. Make sure `Dockerfile` is in root directory

## Cost Comparison

| Option | Cost | Pros | Cons |
|--------|------|------|------|
| **Free** | $0 | Works well, GitHub Actions keep alive | 30s cold start occasionally |
| **Paid** | $7/mo backend + $7/mo frontend = $14/mo | Always on, instant | Monthly cost |
| **Hybrid** | $7/mo backend only = $7/mo | Backend always on, frontend free | Frontend has cold starts |

## Recommendation

1. **Start with FREE** - Use GitHub Actions (already set up!)
2. **If you get many customers daily** - Upgrade backend to $7/mo
3. **Keep frontend free** - It's static, cold starts don't matter

Your GitHub Actions will keep the backend alive during business hours automatically! 🚀
