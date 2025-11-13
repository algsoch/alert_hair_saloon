# Real-Time Notification System - How It Works

## Overview
The notification system now works **WITHOUT** any external services like Twilio or IFTTT. Everything happens directly between the customer and owner using Server-Sent Events (SSE).

## System Architecture

### Backend (Java Spring Boot)
- **NotificationService.java**: Manages SSE connections and sends real-time notifications
- **AlertController.java**: 
  - Captures customer IP address
  - Sends notifications with Hindi messages
  - Provides `/api/notifications/stream` endpoint for owner to connect

### Frontend (React)
- **Customer Page**: `http://localhost:3000/` - Customer clicks "Notify Barber"
- **Owner Page**: `http://localhost:3000/owner` - Owner keeps this open to receive notifications

## How to Use

### For Owner (Karpuri Thakur)
1. Open your phone browser and go to: `http://localhost:3000/owner`
2. You'll see: "कनेक्ट हो गया! नोटिफिकेशन के लिए तैयार।"
3. Keep this page open (don't close it)
4. When a customer clicks "Notify Barber", you'll get:
   - **Real-time notification** with sound and vibration
   - **Customer's IP address**
   - **Time** of the notification
   - **Hindi message**: "🔔 ग्राहक आया है! जल्दी आइये! ग्राहक इंतज़ार कर रहा है।"

### For Customer
1. Scan QR code or visit: `http://localhost:3000/`
2. Click the big purple button: **"Notify Barber"**
3. Wait for the barber to arrive

## Features

### Owner Notification Page
✅ **Real-time notifications** - Instant push notifications via SSE  
✅ **Sound alerts** - Plays notification sound  
✅ **Vibration** - Vibrates your phone (if supported)  
✅ **Browser notifications** - Shows notification even if page is in background  
✅ **Customer IP tracking** - See which device/location the customer is at  
✅ **Hindi messages** - All messages in Hindi  
✅ **Auto-scroll** - Latest notifications appear at top  
✅ **Connection status** - Shows if connected or disconnected  

### Technical Details
- **No external dependencies** - Everything runs on your local server
- **No phone bills** - No SMS/call charges (unlike Twilio)
- **No API limits** - Unlimited notifications
- **Real-time** - Instant notification (< 1 second)

## Testing Steps

1. **Start Backend** (if not running):
   ```bash
   cd backend
   mvn spring-boot:run
   ```

2. **Start Frontend** (if not running):
   ```bash
   cd frontend
   npm start
   ```

3. **Open Owner Page**:
   - Go to: `http://localhost:3000/owner`
   - Keep it open

4. **Open Customer Page** (in different tab/window):
   - Go to: `http://localhost:3000/`
   - Click "Notify Barber"

5. **Check Owner Page**:
   - You should see notification immediately
   - With customer IP address
   - In Hindi

## Messages You'll See

### On Owner Page (Hindi)
- **Connection**: "कनेक्ट हो गया! नोटिफिकेशन के लिए तैयार।"
- **Customer Alert**: "🔔 ग्राहक आया है! समय: 08:45:23 PM, IP: 192.168.1.100, जल्दी आइये! ग्राहक इंतज़ार कर रहा है।"

### On Customer Page
- **Success**: "बार्बर को नोटिफिकेशन भेज दिया गया है!"

## Deployment Notes

For production deployment:
1. Replace `localhost` with your actual domain
2. Owner should bookmark the `/owner` page
3. Consider adding authentication for owner page
4. Can run on free tier: Render (backend) + Vercel (frontend)

## Troubleshooting

**Owner not getting notifications?**
- Make sure owner page (`/owner`) is open and shows "कनेक्टेड ✓"
- Check browser console for errors
- Try refreshing the owner page

**"डिस्कनेक्टेड ✗" showing?**
- Backend might be down
- Check if backend is running on port 8080
- Network connection issue

**No sound/vibration?**
- Grant notification permissions in browser
- Check phone is not on silent mode
- Some browsers block auto-play audio

## Advantages Over Twilio/IFTTT

| Feature | This System | Twilio/IFTTT |
|---------|-------------|--------------|
| Cost | FREE | Paid (per SMS/call) |
| Setup | Already done | Need account + API keys |
| Speed | Instant (< 1s) | 2-5 seconds delay |
| IP Tracking | YES | NO |
| Custom Messages | Unlimited | Limited |
| Works Offline | Local network YES | NO |

## File Changes Made

**Backend:**
- `NotificationService.java` - NEW file for SSE
- `AlertController.java` - Updated to capture IP and send notifications

**Frontend:**
- `OwnerNotifications.js` - NEW owner notification page
- `OwnerNotifications.css` - NEW styling for owner page
- `App.js` - Added routing for `/owner` page
- `App.css` - Added link to owner page

## URLs Summary

- Customer Page: `http://localhost:3000/`
- Owner Page: `http://localhost:3000/owner`
- Backend API: `http://localhost:8080/api/`
- Notification Stream: `http://localhost:8080/api/notifications/stream`
