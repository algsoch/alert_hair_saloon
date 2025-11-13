# 🪒 Vicky Hair Salon - QR-Based Alert System

A complete end-to-end barber shop alert system that allows customers to notify the barber by scanning a QR code.

## 📋 Table of Contents
- [System Overview](#system-overview)
- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Local Development Setup](#local-development-setup)
- [Deployment Guide](#deployment-guide)
- [Testing the System](#testing-the-system)
- [Configuration](#configuration)
- [Troubleshooting](#troubleshooting)

---

## 🎯 System Overview

**Shop Information:**
- **Shop Name:** Vicky Hair Salon
- **Owner:** Karpuri Thakur
- **Phone:** 7835805279
- **Experience:** Working since before 2003

**How it Works:**
1. Customer scans QR code displayed in the shop
2. A professional web page opens with shop information
3. Customer clicks "Notify Barber" button
4. Backend triggers an HTTP GET request to a programmable phone URL
5. Owner's phone rings/receives notification

---

## ✨ Features

### Frontend (React)
- ✅ Clean, modern, responsive UI
- ✅ Professional salon card with owner details
- ✅ Photo placeholder (replaceable)
- ✅ Large "Notify Barber" button
- ✅ Success/error message display
- ✅ QR code generator with download feature
- ✅ Fully responsive for all screen sizes
- ✅ Beautiful gradient design

### Backend (Java Spring Boot)
- ✅ RESTful API endpoints
- ✅ `/api/alert` - Trigger phone notification
- ✅ `/api/shop-info` - Get salon details
- ✅ `/api/health` - Health check endpoint
- ✅ CORS configuration for frontend access
- ✅ HTTP client to trigger external phone URL
- ✅ Environment-based configuration

---

## 🛠️ Tech Stack

### Backend
- Java 17
- Spring Boot 3.2.0
- Maven
- Spring Web
- Spring Actuator

### Frontend
- React 18.2.0
- Axios (HTTP client)
- QRCode.react (QR code generation)
- CSS3 (Responsive design)

### Deployment
- **Backend:** Render / Railway (free tier)
- **Frontend:** Vercel / Netlify (free tier)

---

## 📁 Project Structure

```
saloon/
├── backend/                          # Spring Boot Backend
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/vickysalon/
│   │   │   │   ├── BarberAlertApplication.java
│   │   │   │   ├── config/
│   │   │   │   │   └── CorsConfig.java
│   │   │   │   ├── controller/
│   │   │   │   │   └── AlertController.java
│   │   │   │   ├── service/
│   │   │   │   │   └── AlertService.java
│   │   │   │   └── dto/
│   │   │   │       └── AlertResponse.java
│   │   │   └── resources/
│   │   │       └── application.properties
│   ├── pom.xml
│   ├── Dockerfile
│   ├── Procfile
│   ├── .env.example
│   ├── .gitignore
│   └── deployment/
│       ├── render.yaml
│       └── README.md
│
├── frontend/                         # React Frontend
│   ├── public/
│   │   ├── index.html
│   │   └── manifest.json
│   ├── src/
│   │   ├── components/
│   │   │   ├── SalonCard.js
│   │   │   ├── SalonCard.css
│   │   │   ├── QRCodeGenerator.js
│   │   │   └── QRCodeGenerator.css
│   │   ├── services/
│   │   │   └── api.js
│   │   ├── App.js
│   │   ├── App.css
│   │   ├── index.js
│   │   └── index.css
│   ├── package.json
│   ├── vercel.json
│   ├── netlify.toml
│   ├── .env.example
│   ├── .gitignore
│   └── deployment/
│       └── README.md
│
└── README.md                         # This file
```

---

## 🚀 Local Development Setup

### Prerequisites
- Java 17 or higher
- Maven 3.6+
- Node.js 16+ and npm
- Git

### Backend Setup

1. **Navigate to backend directory:**
   ```bash
   cd backend
   ```

2. **Install dependencies and build:**
   ```bash
   mvn clean install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env
   ```
   Edit `.env` and add your phone trigger URL:
   ```
   PHONE_TRIGGER_URL=https://your-trigger-url.com/ring
   ```

4. **Run the application:**
   ```bash
   mvn spring-boot:run
   ```
   Backend will start at: `http://localhost:8080`

5. **Test the health endpoint:**
   ```bash
   curl http://localhost:8080/api/health
   ```

### Frontend Setup

1. **Navigate to frontend directory:**
   ```bash
   cd frontend
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure environment variables:**
   ```bash
   cp .env.example .env.local
   ```
   Edit `.env.local`:
   ```
   REACT_APP_API_URL=http://localhost:8080/api
   ```

4. **Start the development server:**
   ```bash
   npm start
   ```
   Frontend will open at: `http://localhost:3000`

---

## 🌐 Deployment Guide

### Option 1: Deploy Backend to Render

1. **Create a Render account** at [render.com](https://render.com)

2. **Create a new Web Service:**
   - Connect your GitHub repository
   - Select the backend directory
   - Choose "Docker" as environment
   - Or use "Java" and set build command: `mvn clean install -DskipTests`

3. **Configure environment variables:**
   - Go to Environment tab
   - Add: `PHONE_TRIGGER_URL` = `your-trigger-url`
   - `PORT` is auto-set to 10000 by Render

4. **Deploy:**
   - Click "Create Web Service"
   - Wait for build to complete
   - Note your backend URL: `https://your-app-name.onrender.com`

5. **Test deployment:**
   ```bash
   curl https://your-app-name.onrender.com/api/health
   ```

### Option 2: Deploy Backend to Railway

1. **Create a Railway account** at [railway.app](https://railway.app)

2. **Create a new project:**
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your repository

3. **Configure the service:**
   - Railway auto-detects Java/Maven
   - Add environment variable: `PHONE_TRIGGER_URL`

4. **Get your deployment URL:**
   - Go to Settings → Domains
   - Generate domain: `your-app-name.up.railway.app`

5. **Test deployment:**
   ```bash
   curl https://your-app-name.up.railway.app/api/health
   ```

### Deploy Frontend to Vercel

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Import your project:**
   - Click "New Project"
   - Import your GitHub repository
   - Select root directory as `frontend`

3. **Configure build settings:**
   - Framework Preset: Create React App
   - Build Command: `npm run build`
   - Output Directory: `build`

4. **Add environment variable:**
   - Go to Settings → Environment Variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`

5. **Deploy:**
   - Click "Deploy"
   - Your site will be live at: `https://your-project.vercel.app`

### Deploy Frontend to Netlify

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Create a new site:**
   - Click "Add new site" → "Import an existing project"
   - Connect your GitHub repository
   - Set base directory: `frontend`

3. **Configure build settings:**
   - Build command: `npm run build`
   - Publish directory: `build`

4. **Add environment variable:**
   - Go to Site settings → Environment variables
   - Add: `REACT_APP_API_URL` = `https://your-backend-url.onrender.com/api`

5. **Update netlify.toml:**
   - Edit `frontend/netlify.toml`
   - Update `REACT_APP_API_URL` with your backend URL

6. **Deploy:**
   - Trigger deployment
   - Your site will be live at: `https://your-site-name.netlify.app`

---

## 🧪 Testing the System

### End-to-End Testing

1. **Test Backend:**
   ```bash
   # Health check
   curl https://your-backend-url.com/api/health
   
   # Get shop info
   curl https://your-backend-url.com/api/shop-info
   
   # Trigger alert
   curl -X POST https://your-backend-url.com/api/alert
   ```

2. **Test Frontend:**
   - Open your deployed frontend URL
   - Verify shop information displays correctly
   - Click "Notify Barber" button
   - Check for success message
   - Verify backend logs show the alert was triggered

3. **Test QR Code:**
   - Scroll down on the frontend
   - Click "Show QR Code"
   - Download the QR code
   - Scan with phone camera
   - Should open the website

### QR Code for Printing

1. Open your deployed frontend URL
2. Click "Show QR Code" button
3. Click "Download QR Code"
4. Print on high-quality paper (recommended: 3x3 inches minimum)
5. Laminate for durability
6. Place in visible location in your shop

**Printing Tips:**
- Use high-quality printer
- Minimum size: 3x3 inches (larger is better)
- Test scan before printing multiple copies
- Consider adding text: "Scan to notify barber"

---

## ⚙️ Configuration

### Backend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `8080` |
| `PHONE_TRIGGER_URL` | URL to trigger phone notification | `https://maker.ifttt.com/trigger/notify_barber/with/key/YOUR_KEY` |

### Frontend Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `REACT_APP_API_URL` | Backend API URL | `https://your-backend.onrender.com/api` |

### Setting Up Phone Trigger URL

You have several options for phone notifications:

#### Option 1: IFTTT Webhook (Easiest)
1. Create IFTTT account
2. Create applet: Webhooks → Phone Call/SMS
3. Get webhook URL: `https://maker.ifttt.com/trigger/notify_barber/with/key/YOUR_KEY`
4. Set as `PHONE_TRIGGER_URL`

#### Option 2: Twilio
1. Create Twilio account
2. Get your Account SID and Auth Token
3. Create a webhook endpoint that calls Twilio API
4. Set as `PHONE_TRIGGER_URL`

#### Option 3: Custom App
- Use apps like Tasker (Android) or Shortcuts (iOS)
- Create webhook listener
- Trigger phone action (ring, vibrate, notification)

---

## 🔧 Troubleshooting

### Backend Issues

**Build fails:**
```bash
# Clean and rebuild
mvn clean install -U

# Check Java version
java -version  # Should be 17+
```

**CORS errors:**
- Check `CorsConfig.java` allows your frontend domain
- Verify environment variables are set correctly

**Alert not triggering:**
- Check `PHONE_TRIGGER_URL` is set
- Test the trigger URL manually with curl
- Check backend logs for errors

### Frontend Issues

**API connection fails:**
- Verify `REACT_APP_API_URL` is correct
- Check backend is running and accessible
- Check browser console for CORS errors

**Build fails:**
```bash
# Clear cache and rebuild
rm -rf node_modules package-lock.json
npm install
npm run build
```

**QR code not working:**
- Ensure frontend is deployed and accessible
- QR code needs proper URL to work
- Test by manually entering the URL

### Deployment Issues

**Render/Railway timeout:**
- Free tier has cold start delays (~30 seconds)
- First request after inactivity may be slow
- Consider keeping service awake with cron job

**Vercel/Netlify build fails:**
- Check build logs for specific errors
- Verify all dependencies in package.json
- Ensure environment variables are set

---

## 📞 Support

For issues or questions:
- Check the troubleshooting section above
- Review backend logs in Render/Railway dashboard
- Check browser console for frontend errors
- Verify all environment variables are set correctly

---

## 📝 License

This project is created for Vicky Hair Salon.

---

## 🎨 Customization

### Changing Shop Details

Edit `backend/src/main/java/com/vickysalon/controller/AlertController.java`:
```java
ShopInfo info = new ShopInfo(
    "Your Shop Name",
    "Owner Name",
    "Phone Number",
    "Experience",
    "Description"
);
```

### Replacing Owner Photo

1. Add your photo to `frontend/public/` directory (e.g., `owner.jpg`)
2. Edit `frontend/src/components/SalonCard.js`:
   ```jsx
   <div className="owner-photo">
     <img src="/owner.jpg" alt="Owner" />
   </div>
   ```

### Changing Colors

Edit `frontend/src/index.css` and component CSS files:
```css
/* Current gradient: purple */
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);

/* Change to blue: */
background: linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%);

/* Change to green: */
background: linear-gradient(135deg, #11998e 0%, #38ef7d 100%);
```

---

## 🏗️ Architecture Diagram

```
┌─────────────────────────────────────────────────────────────┐
│                        Customer                              │
│                           │                                  │
│                           ▼                                  │
│                    Scans QR Code                             │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                    Frontend (React)                          │
│                 Deployed on Vercel/Netlify                   │
│                                                              │
│  • Display shop info                                         │
│  • Professional UI                                           │
│  • "Notify Barber" button                                    │
│  • QR code generator                                         │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTPS Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│                Backend (Spring Boot)                         │
│               Deployed on Render/Railway                     │
│                                                              │
│  Endpoints:                                                  │
│  • POST /api/alert      - Trigger notification              │
│  • GET  /api/shop-info  - Get shop details                  │
│  • GET  /api/health     - Health check                      │
└─────────────────────────────────────────────────────────────┘
                            │
                            │ HTTP GET Request
                            ▼
┌─────────────────────────────────────────────────────────────┐
│              Phone Trigger Service                           │
│          (IFTTT / Twilio / Custom Webhook)                   │
│                                                              │
│  • Receives trigger request                                  │
│  • Makes phone ring                                          │
│  • Sends notification                                        │
└─────────────────────────────────────────────────────────────┘
                            │
                            ▼
                    Owner's Phone Rings 📱
```

---

## 🎯 Next Steps

1. ✅ Deploy backend to Render/Railway
2. ✅ Deploy frontend to Vercel/Netlify
3. ✅ Set up phone trigger URL
4. ✅ Test end-to-end flow
5. ✅ Download and print QR code
6. ✅ Place QR code in shop
7. ✅ Replace owner photo (optional)
8. ✅ Customize colors/branding (optional)

---

**Built with ❤️ for Vicky Hair Salon**
