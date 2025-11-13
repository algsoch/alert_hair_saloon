# 🔍 How to Check If Frontend and Backend Are Running

## Quick Status Check Commands

### Backend Status Check

**Option 1: Check Health Endpoint**
```bash
curl http://localhost:8080/api/health
```
✅ Expected Response: `"Backend is running!"`

**Option 2: Check Shop Info Endpoint**
```bash
curl http://localhost:8080/api/shop-info
```
✅ Expected Response: JSON with shop information

**Option 3: Check if Process is Running**
```bash
# Check if Java process is running on port 8080
lsof -i :8080
```
✅ Should show Java process

**Option 4: Check with Browser**
- Open: http://localhost:8080/api/health
- Should see: "Backend is running!"

---

### Frontend Status Check

**Option 1: Check in Browser**
- Open: http://localhost:3000
- Should see: Vicky Hair Salon page

**Option 2: Check if Process is Running**
```bash
# Check if Node process is running on port 3000
lsof -i :3000
```
✅ Should show node process

**Option 3: Check Network Connection**
```bash
curl http://localhost:3000
```
✅ Should return HTML content

---

## Step-by-Step Testing Guide

### 1. Start Backend (Terminal 1)

```bash
cd backend
mvn spring-boot:run
```

**What to Look For:**
```
Started BarberAlertApplication in X seconds
Tomcat started on port(s): 8080
```

**Test It:**
```bash
# In a new terminal
curl http://localhost:8080/api/health
```

---

### 2. Start Frontend (Terminal 2)

```bash
cd frontend
npm start
```

**What to Look For:**
```
Compiled successfully!
Local:            http://localhost:3000
On Your Network:  http://192.168.x.x:3000
```

**Test It:**
- Browser automatically opens to http://localhost:3000
- Should see Vicky Hair Salon page

---

## Complete Testing Commands

### Run All Checks at Once

```bash
# Save this as check-services.sh
#!/bin/bash

echo "🔍 Checking Backend..."
if curl -s http://localhost:8080/api/health > /dev/null 2>&1; then
    echo "✅ Backend is RUNNING on port 8080"
    curl http://localhost:8080/api/health
else
    echo "❌ Backend is NOT running"
    echo "   Start with: cd backend && mvn spring-boot:run"
fi

echo ""
echo "🔍 Checking Frontend..."
if curl -s http://localhost:3000 > /dev/null 2>&1; then
    echo "✅ Frontend is RUNNING on port 3000"
else
    echo "❌ Frontend is NOT running"
    echo "   Start with: cd frontend && npm start"
fi

echo ""
echo "🔍 Checking Ports..."
echo "Backend (8080):"
lsof -i :8080 2>/dev/null || echo "   No process on port 8080"
echo ""
echo "Frontend (3000):"
lsof -i :3000 2>/dev/null || echo "   No process on port 3000"
```

**Usage:**
```bash
chmod +x check-services.sh
./check-services.sh
```

---

## Manual Checks

### Backend Manual Test

1. **Check if Maven is running:**
   ```bash
   ps aux | grep "spring-boot:run"
   ```

2. **Check logs:**
   - Look at Terminal 1 where you ran `mvn spring-boot:run`
   - Should see: "Started BarberAlertApplication"

3. **Test API endpoint:**
   ```bash
   curl -X POST http://localhost:8080/api/alert
   ```
   Should return JSON with status

### Frontend Manual Test

1. **Check if npm is running:**
   ```bash
   ps aux | grep "react-scripts"
   ```

2. **Check logs:**
   - Look at Terminal 2 where you ran `npm start`
   - Should see: "webpack compiled successfully"

3. **Open in browser:**
   - Go to http://localhost:3000
   - Click "Notify Barber" button
   - Should see success message

---

## Common Issues & Solutions

### Backend Not Running

**Check 1: Port Already in Use**
```bash
lsof -i :8080
# If something is using port 8080, kill it:
kill -9 <PID>
```

**Check 2: Java Not Installed**
```bash
java -version
# Should be Java 17+
```

**Check 3: Maven Build Failed**
```bash
cd backend
mvn clean install
# Look for errors
```

### Frontend Not Running

**Check 1: Port Already in Use**
```bash
lsof -i :3000
# If something is using port 3000, kill it:
kill -9 <PID>
```

**Check 2: Dependencies Not Installed**
```bash
cd frontend
rm -rf node_modules
npm install
```

**Check 3: Wrong Directory**
```bash
pwd
# Should end with /frontend
```

---

## End-to-End Test

### Complete Flow Test

1. **Start both services**
2. **Open browser to http://localhost:3000**
3. **Verify you see:**
   - Shop name: Vicky Hair Salon
   - Owner name: Karpuri Thakur
   - Phone: 7835805279
   - "Notify Barber" button

4. **Click "Notify Barber"**
5. **Check backend terminal:**
   - Should see: "Triggering phone alert to URL..."

6. **Check frontend:**
   - Should see success message

---

## Quick Reference

| Service | Port | URL | Check Command |
|---------|------|-----|---------------|
| Backend | 8080 | http://localhost:8080/api/health | `curl http://localhost:8080/api/health` |
| Frontend | 3000 | http://localhost:3000 | `curl http://localhost:3000` |

---

## Automated Testing Script

Create `test-system.sh`:

```bash
#!/bin/bash

echo "═══════════════════════════════════════"
echo "  Vicky Salon System Status Check"
echo "═══════════════════════════════════════"
echo ""

# Colors
GREEN='\033[0;32m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Test Backend
echo "1️⃣  Testing Backend (Port 8080)..."
if curl -s -f http://localhost:8080/api/health > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Backend is running${NC}"
    echo "   Response: $(curl -s http://localhost:8080/api/health)"
else
    echo -e "${RED}❌ Backend is NOT running${NC}"
    BACKEND_FAIL=1
fi
echo ""

# Test Frontend
echo "2️⃣  Testing Frontend (Port 3000)..."
if curl -s -f http://localhost:3000 > /dev/null 2>&1; then
    echo -e "${GREEN}✅ Frontend is running${NC}"
else
    echo -e "${RED}❌ Frontend is NOT running${NC}"
    FRONTEND_FAIL=1
fi
echo ""

# Test API Connection
echo "3️⃣  Testing API Connection..."
if curl -s -f http://localhost:8080/api/shop-info > /dev/null 2>&1; then
    echo -e "${GREEN}✅ API endpoints accessible${NC}"
else
    echo -e "${RED}❌ API endpoints not accessible${NC}"
fi
echo ""

# Summary
echo "═══════════════════════════════════════"
echo "  Summary"
echo "═══════════════════════════════════════"
if [ -z "$BACKEND_FAIL" ] && [ -z "$FRONTEND_FAIL" ]; then
    echo -e "${GREEN}🎉 All systems running!${NC}"
    echo ""
    echo "Access your app at:"
    echo "   Frontend: http://localhost:3000"
    echo "   Backend:  http://localhost:8080/api/health"
else
    echo -e "${RED}⚠️  Some services are not running${NC}"
    echo ""
    [ ! -z "$BACKEND_FAIL" ] && echo "Start backend:  cd backend && mvn spring-boot:run"
    [ ! -z "$FRONTEND_FAIL" ] && echo "Start frontend: cd frontend && npm start"
fi
echo ""
```

**Make executable and run:**
```bash
chmod +x test-system.sh
./test-system.sh
```

---

## Visual Indicator

When everything is running, you should see:

```
Terminal 1 (Backend):
  INFO ... Started BarberAlertApplication in 3.5 seconds
  
Terminal 2 (Frontend):
  Compiled successfully!
  webpack compiled with 0 warnings
  
Browser (http://localhost:3000):
  [Beautiful purple gradient page with shop info]
```

---

## Pro Tips

1. **Keep both terminals visible** - Use split screen
2. **Watch for errors** - Check terminal output
3. **Test after changes** - Restart services if you modify code
4. **Use the test script** - Run `test-system.sh` regularly
5. **Check browser console** - Press F12 to see any frontend errors

---

## Troubleshooting Checklist

- [ ] Backend terminal shows "Started BarberAlertApplication"
- [ ] Frontend terminal shows "Compiled successfully"
- [ ] `curl http://localhost:8080/api/health` returns "Backend is running!"
- [ ] `curl http://localhost:3000` returns HTML
- [ ] Browser shows Vicky Hair Salon page
- [ ] Click "Notify Barber" shows success message
- [ ] Backend logs show "Triggering phone alert"

---

**All checks passing? 🎉 Your system is running perfectly!**
