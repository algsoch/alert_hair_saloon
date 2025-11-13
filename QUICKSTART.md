# 🚀 QUICK START GUIDE

## ⚡ Get Running in 5 Minutes

### Step 1: Start Backend (Terminal 1)
```bash
cd backend
mvn spring-boot:run
```
✅ Backend running at: http://localhost:8080

### Step 2: Start Frontend (Terminal 2)
```bash
cd frontend
npm install
npm start
```
✅ Frontend running at: http://localhost:3000

### Step 3: Test It!
1. Open http://localhost:3000 in your browser
2. Click "Notify Barber" button
3. Check backend terminal for alert logs

---

## 📱 Deploy to Production (30 Minutes)

### Backend → Render
1. Sign up at [render.com](https://render.com)
2. New Web Service → Connect GitHub
3. Add environment variable: `PHONE_TRIGGER_URL`
4. Deploy → Get URL: `https://your-app.onrender.com`

### Frontend → Vercel  
1. Sign up at [vercel.com](https://vercel.com)
2. Import Project → Select `frontend` folder
3. Add environment variable: `REACT_APP_API_URL=https://your-app.onrender.com/api`
4. Deploy → Get URL: `https://your-site.vercel.app`

### QR Code
1. Open your deployed frontend URL
2. Click "Show QR Code"
3. Download QR code image
4. Print and place in shop

---

## 🔑 Important URLs to Replace

### In Backend (.env):
```bash
PHONE_TRIGGER_URL=YOUR_PHONE_TRIGGER_URL_HERE
```

### In Frontend (.env.local):
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

---

## 📞 Setting Up Phone Trigger

### Option 1: IFTTT (Easiest - 5 minutes)
1. Create account at [ifttt.com](https://ifttt.com)
2. Create New Applet:
   - **If**: Webhooks → Receive a web request → Event: `notify_barber`
   - **Then**: Phone Call or Notification
3. Copy webhook URL
4. Set as `PHONE_TRIGGER_URL`

### Option 2: Twilio (Professional)
1. Sign up at [twilio.com](https://twilio.com)
2. Get phone number and credentials
3. Use Twilio API endpoint
4. Set as `PHONE_TRIGGER_URL`

---

## ✅ Testing Checklist

- [ ] Backend health check: `curl http://localhost:8080/api/health`
- [ ] Frontend opens in browser
- [ ] Click "Notify Barber" shows success message
- [ ] Backend logs show alert triggered
- [ ] QR code generates and downloads
- [ ] Deploy backend and frontend
- [ ] Test deployed URLs
- [ ] Print QR code
- [ ] Test scan with phone

---

## 🆘 Quick Troubleshooting

**Backend won't start?**
```bash
# Check Java version
java -version  # Need 17+

# Clean and rebuild
mvn clean install
```

**Frontend errors?**
```bash
# Clean install
rm -rf node_modules
npm install
npm start
```

**Can't connect frontend to backend?**
- Check `REACT_APP_API_URL` in `.env.local`
- Verify backend is running
- Check browser console for errors

**Phone not ringing?**
- Verify `PHONE_TRIGGER_URL` is set
- Test trigger URL with curl:
  ```bash
  curl https://your-trigger-url.com
  ```

---

## 📚 Full Documentation

See [README.md](README.md) for complete documentation.

---

**Ready to go! 🎉**
