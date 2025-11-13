# 🚀 Deployment Guide - Make It Work Anywhere

## 🎯 Your Goal

**Current Situation**: 
- Both you and customer need to be on **same WiFi**
- Only works at home/shop network
- Can't receive notifications when you're away

**After Deployment**:
- ✅ Works from **anywhere** (customer at shop, you at home)
- ✅ No WiFi dependency
- ✅ Access via internet (4G/5G/any WiFi)
- ✅ Professional URL (like `vicky-salon.com`)

---

## 📋 Deployment Options

### Option 1: Free Deployment (Recommended for Testing) 🆓

#### Backend → Railway (Free Tier)
- **Cost**: Free (500 hours/month)
- **URL**: `https://vicky-salon-backend.up.railway.app`
- **Good for**: Small shops, testing

#### Frontend → Vercel (Free)
- **Cost**: Free forever
- **URL**: `https://vicky-salon.vercel.app`
- **Good for**: Any size business

**Total Cost**: ₹0/month 💰

---

### Option 2: Paid Deployment (Better Performance) 💎

#### Backend → Railway/Render
- **Cost**: $5-10/month (~₹400-800)
- **Benefits**: Always on, faster, more reliable

#### Frontend → Vercel (Free)
- **Cost**: Still free!

**Total Cost**: ~₹500/month

---

## 🔧 Step-by-Step Deployment

### Phase 1: Deploy Backend (Railway - FREE)

#### Step 1: Create Railway Account
1. Go to: https://railway.app
2. Click "Login" → Use GitHub (or create account)
3. Verify email

#### Step 2: Prepare Backend for Deployment
Run these commands:

```bash
cd backend

# Create Dockerfile
cat > Dockerfile << 'EOF'
FROM maven:3.9-eclipse-temurin-17 AS build
WORKDIR /app
COPY pom.xml .
COPY src ./src
RUN mvn clean package -DskipTests

FROM eclipse-temurin:17-jre
WORKDIR /app
COPY --from=build /app/target/*.jar app.jar
EXPOSE 8080
ENTRYPOINT ["java", "-jar", "app.jar"]
EOF

# Create .dockerignore
cat > .dockerignore << 'EOF'
target/
.mvn/
mvnw
mvnw.cmd
.git/
.gitignore
EOF
```

#### Step 3: Deploy to Railway

**Option A: Using Railway CLI** (Easiest)
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize project
railway init

# Deploy
railway up

# Get URL
railway domain
```

**Option B: Using GitHub**
1. Create GitHub repository
2. Push your code:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/vicky-salon-backend.git
git push -u origin main
```
3. In Railway dashboard:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository
   - Railway will auto-detect and deploy

#### Step 4: Note Backend URL
After deployment, Railway gives you URL like:
```
https://vicky-salon-backend-production.up.railway.app
```
**Save this URL!** You'll need it for frontend.

---

### Phase 2: Deploy Frontend (Vercel - FREE)

#### Step 1: Create Vercel Account
1. Go to: https://vercel.com
2. Click "Sign Up" → Use GitHub
3. Verify email

#### Step 2: Update Frontend Configuration

```bash
cd frontend

# Create .env.production file
cat > .env.production << 'EOF'
REACT_APP_API_URL=https://YOUR-BACKEND-URL.up.railway.app/api
EOF
```

**Replace `YOUR-BACKEND-URL` with actual Railway URL from Phase 1!**

#### Step 3: Deploy to Vercel

**Option A: Using Vercel CLI** (Easiest)
```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy to production
vercel --prod
```

**Option B: Using GitHub**
1. Push frontend to GitHub:
```bash
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/YOUR_USERNAME/vicky-salon-frontend.git
git push -u origin main
```
2. In Vercel dashboard:
   - Click "Add New Project"
   - Import your GitHub repository
   - Vercel will auto-detect React
   - Add Environment Variable:
     - Key: `REACT_APP_API_URL`
     - Value: `https://YOUR-BACKEND-URL.up.railway.app/api`
   - Click "Deploy"

#### Step 4: Note Frontend URL
Vercel gives you URL like:
```
https://vicky-salon.vercel.app
```

---

## 🎯 After Deployment

### Your New URLs:

**Customer Access** (QR Code URL):
```
https://vicky-salon.vercel.app
```

**Owner Notifications** (Your Phone):
```
https://vicky-salon.vercel.app/owner
```

**Backend API**:
```
https://vicky-salon-backend.up.railway.app/api
```

---

## 📱 How It Works After Deployment

### Before (Local WiFi):
```
Customer Phone (WiFi) → 192.168.1.4:3000 → Your Computer
                                          ↓
Owner Phone (Same WiFi) ← Notification ← Your Computer
```

### After (Internet - Anywhere):
```
Customer Phone (Any Network) → vercel.app → Railway Server
                                                   ↓
Owner Phone (Any Network) ← SSE Notification ← Railway Server
```

**Key Benefits**:
- ✅ Customer can scan QR at shop (any network)
- ✅ You receive notification at home (4G/5G)
- ✅ No WiFi dependency
- ✅ Works 24/7

---

## 🔐 Important Updates After Deployment

### 1. Update QR Code
Generate new QR code with deployed URL:

1. Open: `https://vicky-salon.vercel.app/qr-generator`
2. Download QR code
3. Print and place in shop
4. QR now points to: `https://vicky-salon.vercel.app`

### 2. Update Backend CORS
The backend needs to allow requests from Vercel URL.

File: `backend/src/main/java/com/vickysalon/config/CorsConfig.java`

Change:
```java
@Override
public void addCorsMappings(CorsRegistry registry) {
    registry.addMapping("/**")
            .allowedOrigins(
                "http://localhost:3000",
                "https://vicky-salon.vercel.app",  // Add your Vercel URL
                "https://*.vercel.app"              // Allow all Vercel preview URLs
            )
            .allowedMethods("GET", "POST", "PUT", "DELETE", "OPTIONS")
            .allowedHeaders("*")
            .allowCredentials(true);
}
```

**After changing, redeploy backend**:
```bash
railway up
# or push to GitHub if using GitHub deployment
```

---

## 💰 Cost Breakdown

### Free Option (Railway Free Tier + Vercel):

| Service | Cost | Limits |
|---------|------|--------|
| Backend (Railway) | Free | 500 hours/month (≈20 days if always on) |
| Frontend (Vercel) | Free | Unlimited |
| **Total** | **₹0** | Good for testing, small usage |

**When Railway free tier runs out**: App stops until next month OR upgrade to paid plan

### Paid Option (Railway Hobby + Vercel):

| Service | Cost/Month | Benefits |
|---------|------------|----------|
| Backend (Railway Hobby) | $5 (~₹400) | Always on, no limits |
| Frontend (Vercel) | Free | Unlimited |
| **Total** | **~₹400/month** | Professional, reliable |

---

## 🧪 Testing After Deployment

### Test 1: Backend Health
```bash
curl https://YOUR-BACKEND-URL.up.railway.app/api/health
```
Should return: `"Backend is running!"`

### Test 2: Frontend Access
Open in browser: `https://vicky-salon.vercel.app`
Should show: Vicky Hair Salon page with owner photo

### Test 3: Owner Notifications
1. Open on phone: `https://vicky-salon.vercel.app/owner`
2. Enter password: `Iit7065@`
3. Should connect and show: "कनेक्टेड ✓"

### Test 4: Customer Notification
1. Open different phone: `https://vicky-salon.vercel.app`
2. Click "बिना फोटो के नोटिफाई करें"
3. Owner phone should receive notification immediately!

### Test 5: Different Networks
**The Real Test!**
- Owner on home WiFi / 4G
- Customer on shop WiFi / different 4G
- Both should work perfectly! ✨

---

## 🎯 Quick Deployment Commands

### Deploy Backend (Railway):
```bash
cd backend
npm install -g @railway/cli
railway login
railway init
railway up
railway domain  # Get URL
```

### Deploy Frontend (Vercel):
```bash
cd frontend

# Create .env.production
echo "REACT_APP_API_URL=https://YOUR-RAILWAY-URL/api" > .env.production

# Deploy
npm install -g vercel
vercel login
vercel --prod
```

**Done! Your app is live! 🚀**

---

## 🔍 Troubleshooting After Deployment

### Issue 1: Owner Not Receiving Notifications

**Check 1**: SSE Connection
- Open browser console (F12)
- Look for: "EventSource connected"
- If error: Check CORS settings in backend

**Check 2**: Backend Running
```bash
curl https://YOUR-BACKEND-URL/api/health
```
If no response: Backend is down, redeploy

**Fix**: Railway free tier might have stopped
- Go to Railway dashboard
- Click "Deploy" again
- Or upgrade to Hobby plan ($5/month)

### Issue 2: "Failed to Notify" Error

**Check**: Frontend API URL
- File: `frontend/.env.production`
- Should be: `REACT_APP_API_URL=https://YOUR-BACKEND-URL/api`
- Notice `/api` at end!

**Fix**: 
```bash
cd frontend
# Update .env.production with correct URL
vercel --prod  # Redeploy
```

### Issue 3: CORS Error in Browser Console

**Error**: `Access to fetch at 'https://...' has been blocked by CORS`

**Fix**: Update backend CORS to include Vercel URL
```java
// In CorsConfig.java
.allowedOrigins(
    "https://vicky-salon.vercel.app",
    "https://*.vercel.app"
)
```
Then redeploy backend: `railway up`

---

## 📊 Monitoring Your Deployed App

### Railway Dashboard:
- View logs: See all requests, errors
- Monitor usage: Check free tier hours
- View metrics: Response times, errors

### Vercel Dashboard:
- View deployments: All versions
- Analytics: Page views, visitors
- Logs: Frontend errors

**Access Dashboards**:
- Railway: https://railway.app/dashboard
- Vercel: https://vercel.com/dashboard

---

## 🎊 Final Checklist

After deployment, verify:

- [ ] Backend deployed to Railway
- [ ] Backend URL saved: `https://______.up.railway.app`
- [ ] Frontend deployed to Vercel
- [ ] Frontend URL saved: `https://______.vercel.app`
- [ ] `.env.production` has correct backend URL
- [ ] CORS updated in backend with Vercel URL
- [ ] Backend health check works
- [ ] Frontend loads in browser
- [ ] Owner can login with password
- [ ] Owner receives notifications from anywhere
- [ ] Customer can send notifications from anywhere
- [ ] QR code updated with new URL
- [ ] QR code printed and placed in shop

**All ✓? Your app is production-ready!** 🚀

---

## 💡 Pro Tips

1. **Custom Domain** (Optional):
   - Buy domain: vickysalon.com (~₹500-1000/year)
   - Connect to Vercel (free, automatic HTTPS)
   - Professional look!

2. **Monitoring**:
   - Set up Vercel/Railway email alerts
   - Get notified if app goes down

3. **Backup**:
   - Keep code on GitHub
   - Can redeploy anytime if issues

4. **Updates**:
   - Make changes locally
   - Test locally
   - Deploy with `railway up` / `vercel --prod`

---

## 🆘 Need Help?

**Railway Support**: https://railway.app/help
**Vercel Support**: https://vercel.com/support

**Common Issues & Fixes**: See Troubleshooting section above

---

## 📝 Summary

**What You'll Do**:
1. Deploy backend to Railway (10 minutes)
2. Deploy frontend to Vercel (10 minutes)
3. Update QR code (5 minutes)
4. Test from different locations (5 minutes)

**Total Time**: ~30 minutes

**Result**: 
- ✅ App accessible from anywhere
- ✅ Owner gets notifications from home
- ✅ Customer uses it from shop
- ✅ No WiFi dependency
- ✅ Professional and reliable

**Ready to deploy?** Follow Phase 1 & 2 above! 🚀
