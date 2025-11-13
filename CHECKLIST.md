# Project Checklist

## Initial Setup
- [ ] Java 17+ installed
- [ ] Maven installed
- [ ] Node.js 16+ installed
- [ ] Git initialized

## Backend Setup
- [ ] Navigate to `backend/` directory
- [ ] Copy `.env.example` to `.env`
- [ ] Update `PHONE_TRIGGER_URL` in `.env`
- [ ] Run `mvn clean install`
- [ ] Run `mvn spring-boot:run`
- [ ] Test: `curl http://localhost:8080/api/health`

## Frontend Setup
- [ ] Navigate to `frontend/` directory
- [ ] Copy `.env.example` to `.env.local`
- [ ] Update `REACT_APP_API_URL` in `.env.local`
- [ ] Run `npm install`
- [ ] Run `npm start`
- [ ] Open http://localhost:3000

## Local Testing
- [ ] Frontend loads correctly
- [ ] Shop information displays
- [ ] Click "Notify Barber" button works
- [ ] Success message appears
- [ ] Backend logs show alert triggered
- [ ] QR code generates
- [ ] QR code downloads

## Phone Trigger Setup
- [ ] Choose trigger service (IFTTT/Twilio/Custom)
- [ ] Create account on chosen service
- [ ] Set up webhook/trigger
- [ ] Get trigger URL
- [ ] Update `PHONE_TRIGGER_URL` in backend
- [ ] Test trigger manually with curl

## Backend Deployment (Render)
- [ ] Create Render account
- [ ] Connect GitHub repository
- [ ] Create new Web Service
- [ ] Select backend directory
- [ ] Configure environment variables
- [ ] Deploy and get URL
- [ ] Test health endpoint

## Backend Deployment (Railway - Alternative)
- [ ] Create Railway account
- [ ] Import GitHub repository
- [ ] Configure environment variables
- [ ] Deploy and get URL
- [ ] Test health endpoint

## Frontend Deployment (Vercel)
- [ ] Create Vercel account
- [ ] Import GitHub repository
- [ ] Set root directory to `frontend`
- [ ] Add `REACT_APP_API_URL` environment variable
- [ ] Deploy and get URL
- [ ] Test deployed site

## Frontend Deployment (Netlify - Alternative)
- [ ] Create Netlify account
- [ ] Connect GitHub repository
- [ ] Set base directory to `frontend`
- [ ] Add `REACT_APP_API_URL` environment variable
- [ ] Deploy and get URL
- [ ] Test deployed site

## Production Testing
- [ ] Test deployed backend health endpoint
- [ ] Test deployed frontend loads
- [ ] Test "Notify Barber" on deployed site
- [ ] Verify phone trigger works
- [ ] Test on mobile device
- [ ] Test QR code scanning

## QR Code Setup
- [ ] Open deployed frontend URL
- [ ] Click "Show QR Code"
- [ ] Download QR code image
- [ ] Print QR code (recommended size: 3x3 inches)
- [ ] Laminate for durability (optional)
- [ ] Place in visible shop location
- [ ] Test scan with multiple phones

## Optional Customization
- [ ] Replace owner photo placeholder
- [ ] Customize colors/branding
- [ ] Update shop description
- [ ] Add custom domain (Vercel/Netlify)
- [ ] Set up monitoring (UptimeRobot)
- [ ] Configure analytics

## Documentation Review
- [ ] Read README.md
- [ ] Review QUICKSTART.md
- [ ] Check ARCHITECTURE.md
- [ ] Understand deployment configs

## Final Verification
- [ ] End-to-end flow works
- [ ] All environment variables set
- [ ] Backend and frontend deployed
- [ ] Phone trigger working
- [ ] QR code printed and placed
- [ ] Tested with real customer flow
- [ ] Backup QR codes printed

## Maintenance
- [ ] Monitor backend logs regularly
- [ ] Check frontend analytics
- [ ] Verify phone trigger still works
- [ ] Keep dependencies updated
- [ ] Backup configuration files

---

## Quick Commands Reference

### Backend
```bash
# Start
cd backend && mvn spring-boot:run

# Build
mvn clean install

# Test
curl http://localhost:8080/api/health
```

### Frontend
```bash
# Install & Start
cd frontend && npm install && npm start

# Build
npm run build

# Test
open http://localhost:3000
```

### Deployment
```bash
# Backend build command
mvn clean install -DskipTests

# Frontend build command
npm run build
```

---

**Date Completed:** _______________

**Deployed URLs:**
- Backend: _______________________________________________
- Frontend: ______________________________________________
- Phone Trigger: _________________________________________
