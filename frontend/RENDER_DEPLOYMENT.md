# Render Static Site Configuration for Frontend

This directory contains the React frontend that will be deployed as a static site on Render.

## Manual Deployment Steps:

### 1. Deploy Backend (Already Done)
The backend is deployed using the root `render.yaml` file.

### 2. Deploy Frontend on Render

1. **Go to Render Dashboard**: https://dashboard.render.com/

2. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect GitHub: `algsoch/alert_hair_saloon`
   
3. **Configure Build Settings**:
   - **Name**: `vicky-salon-frontend`
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `build`
   - **Branch**: `main`

4. **Environment Variables** (Important!):
   Click "Advanced" → "Add Environment Variable":
   
   - **Variable 1**:
     - Key: `REACT_APP_API_URL`
     - Value: `https://vicky-salon-backend.onrender.com/api`
   
   - **Variable 2**:
     - Key: `REACT_APP_OWNER_PASSWORD`
     - Value: `Iit7065@`

5. **Create Static Site** - Click the button to deploy

6. **Wait for Build** (2-3 minutes)

7. **Get Your URL**: `https://vicky-salon-frontend.onrender.com`

## Enable GitHub Actions (Keep Backend Alive)

1. Go to: https://github.com/algsoch/alert_hair_saloon/actions
2. Click "I understand my workflows, go ahead and enable them"
3. The workflows will ping backend every 10 minutes to prevent sleep

## Final URLs

After both are deployed:

- **Customer Page**: https://vicky-salon-frontend.onrender.com/
- **Owner Panel**: https://vicky-salon-frontend.onrender.com/owner
- **Backend API**: https://vicky-salon-backend.onrender.com/

## Why This Approach?

Render doesn't support multiple services in a single `render.yaml` for static sites properly. So we:
1. Deploy backend via `render.yaml` (done)
2. Deploy frontend manually as static site (easy, one-time setup)
3. Use GitHub Actions to keep backend alive (automatic)

This ensures:
- ✅ Java backend with SSE support
- ✅ React frontend with proper routing
- ✅ Backend stays awake with GitHub Actions
- ✅ No "डिस्कनेक्टेड" issues during business hours
