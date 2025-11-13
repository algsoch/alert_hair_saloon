# 📸 Customer Photo & Voice Alert - How to Use

## ✨ New Features Added

### 1. **Customer Photo Capture** 📸
- Webcam captures customer's face when they click notify
- Photo sent to owner in real-time
- Displayed on owner notification page

### 2. **Hindi Voice Alert** 🔊
- System speaks in Hindi: **"ग्राहक आ गया है, जल्दी आओ"**
- Uses Web Speech API (text-to-speech)
- Automatic Hindi voice if available on device

---

## 🎯 How to Test NOW

### Step 1: Owner Opens Notification Page

**On your phone** (must be same WiFi as computer):
```
http://192.168.1.4:3000/owner
```

You should see:
- ✅ "कनेक्टेड ✓" (green status)
- Backend logs show: "📱 New owner device connected. Total connected: 1"

---

### Step 2: Customer Uses New Photo Feature

**On computer** open customer page:
```
http://localhost:3000/
```

You'll now see **TWO buttons**:

#### Option A: **📸 फोटो के साथ नोटिफाई करें** (With Photo)
1. Click this button
2. Browser asks for camera permission → **Click Allow**
3. Camera preview appears showing your face
4. Click **"✓ फोटो लें और भेजें"** (Take photo and send)
5. Done! Photo sent to owner

#### Option B: **🔔 बिना फोटो के नोटिफाई करें** (Without Photo)
1. Click this to send notification without photo
2. Useful if camera not available or customer prefers not to share photo

---

### Step 3: Owner Receives Notification

**On owner's phone**, you'll instantly get:

1. **📸 Customer Photo** - Large photo at top of notification
2. **📱 Sound Alert** - Ding sound plays
3. **🔊 Voice Alert** - System speaks: "ग्राहक आ गया है, जल्दी आओ"
4. **📳 Vibration** - Phone vibrates
5. **📍 Customer IP** - Shows IP address (e.g., `192.168.1.100`)
6. **⏰ Time** - Shows exact time (e.g., `08:45:23 pm`)

Example notification card:
```
[CUSTOMER PHOTO DISPLAYED HERE - 300px wide]

🔔 ग्राहक आया है!
समय: 08:45:23 pm
IP: 192.168.1.4
जल्दी आइये! ग्राहक इंतज़ार कर रहा है।
```

---

## 🎤 Voice Settings

### For Best Voice Quality:

**On iPhone/iPad:**
- Settings → Accessibility → Spoken Content → Voices
- Download "Hindi (India)" voice for better quality
- System will automatically use it

**On Android:**
- Settings → System → Languages & input → Text-to-speech
- Download Hindi voice pack
- Select as preferred voice

**On Computer:**
- macOS: System Settings → Accessibility → Spoken Content → System Voice
- Windows: Settings → Time & Language → Speech → Add Hindi voice

---

## 🔍 Troubleshooting

### Camera Not Working?
**Problem**: Browser says "Camera access denied"
**Fix**: 
1. Click lock icon in address bar
2. Change camera permission to "Allow"
3. Refresh page and try again

**Or**: Just use "बिना फोटो के नोटिफाई करें" button

---

### Voice Not Speaking?
**Problem**: No voice heard on owner phone
**Fix**:
1. Check phone volume is up
2. Open owner page and tap screen once (browsers need user interaction first)
3. Check if Hindi voice installed (see Voice Settings above)
4. Try refreshing owner page

---

### Photo Not Showing?
**Problem**: Notification received but no photo displayed
**Fix**:
- Customer clicked "बिना फोटो के नोटिफाई करें" button (without photo)
- This is normal - not all customers need to share photo
- Backend logs will show: "Customer photo included" if photo was sent

---

## 📊 What Backend Shows

When customer sends photo, you'll see in backend terminal:
```
📢 Sending notification to 1 devices
🔔 ग्राहक आया है!
समय: 08:45:23 pm
IP: 192.168.1.4
जल्दी आइये! ग्राहक इंतज़ार कर रहा है।
📸 Customer photo included (size: 45678 chars)
```

---

## 🎨 UI Changes

### Customer Page Now Has:
- **Camera preview** when photo option selected
- **Two clear buttons** for with/without photo
- **Hindi text** on buttons for local customers
- **Smooth animations** during photo capture

### Owner Page Now Shows:
- **Large customer photo** at top of each notification
- **Better layout** with photo + message + details
- **Red border** around customer photos for visibility
- **Auto-scroll** to latest notification

---

## 🚀 Advanced Usage

### Multiple Customers Waiting:
- Each notification keeps its own photo
- Scroll up/down to see all waiting customers
- Photos stored until page refresh

### Privacy Note:
- Photos only sent to connected owner devices
- Not stored on server
- Disappear when owner refreshes page
- Customer can choose to not send photo

---

## 💡 Pro Tips

1. **Owner should tap screen once** when opening notification page - this enables audio/speech
2. **Customer can test camera** before alerting - preview shows their face
3. **Photo quality** - Good lighting helps, front camera works best
4. **Voice volume** - Keep phone volume at 50% or higher
5. **Battery saving** - Voice + vibration uses more battery, keep charger handy

---

## ✅ Full Feature List

| Feature | Status | Description |
|---------|--------|-------------|
| Customer Photo | ✅ | Webcam capture with preview |
| Hindi Voice | ✅ | "ग्राहक आ गया है, जल्दी आओ" |
| Sound Alert | ✅ | Ding notification sound |
| Vibration | ✅ | 5-pulse vibration pattern |
| IP Address | ✅ | Shows customer device IP |
| Timestamp | ✅ | Exact time in 12-hour format |
| Photo Display | ✅ | Large clear photo on owner page |
| Without Photo | ✅ | Option to notify without camera |
| Multi-device | ✅ | Multiple owners can connect |
| Real-time | ✅ | < 1 second notification delay |

---

## 🎊 Success Checklist

Test these to confirm everything works:

- [ ] Owner page shows "कनेक्टेड ✓"
- [ ] Customer page shows camera buttons
- [ ] Click "📸 फोटो के साथ..." → camera opens
- [ ] Camera preview shows face
- [ ] Click "✓ फोटो लें..." → photo sent
- [ ] Owner page shows customer photo
- [ ] Voice speaks in Hindi
- [ ] Sound plays
- [ ] Phone vibrates
- [ ] IP address shown
- [ ] Timestamp shown

If all ✓ — **Perfect! System fully working!** 🎉

---

**Made with ❤️ for Vicky Hair Salon**  
**Owner**: Karpuri Thakur | **Phone**: 7835805279
