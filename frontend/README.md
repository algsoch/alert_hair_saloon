# Frontend - React

Vicky Hair Salon Alert System Frontend

## Quick Start

### Prerequisites
- Node.js 16+
- npm or yarn

### Running Locally

```bash
# Install dependencies
npm install

# Start development server
npm start
```

The app will open at `http://localhost:3000`

## Configuration

Create `.env.local` file:

```bash
REACT_APP_API_URL=http://localhost:8080/api
```

For production, update with your deployed backend URL:
```bash
REACT_APP_API_URL=https://your-backend-url.onrender.com/api
```

## Building for Production

```bash
# Create production build
npm run build

# The build folder will contain optimized files
```

## Deployment

### Vercel
1. Import project from GitHub
2. Set root directory to `frontend`
3. Add environment variable: `REACT_APP_API_URL`
4. Deploy

### Netlify
1. Connect GitHub repository
2. Set base directory: `frontend`
3. Build command: `npm run build`
4. Publish directory: `build`
5. Add environment variable: `REACT_APP_API_URL`
6. Deploy

## Project Structure

```
src/
├── components/
│   ├── SalonCard.js         # Main salon info card
│   ├── SalonCard.css
│   ├── QRCodeGenerator.js   # QR code component
│   └── QRCodeGenerator.css
├── services/
│   └── api.js              # API service layer
├── App.js                  # Main app component
├── App.css
├── index.js                # Entry point
└── index.css
```

## Features

- ✅ Responsive design for all screen sizes
- ✅ Professional salon information display
- ✅ One-click barber notification
- ✅ QR code generation and download
- ✅ Success/error feedback
- ✅ Beautiful gradient UI

## Customization

### Change Colors
Edit gradient colors in CSS files:
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Replace Owner Photo
1. Add image to `public/` folder
2. Update `SalonCard.js` to use actual image instead of SVG placeholder

### Update Shop Info
Backend API provides shop info. Update in backend `AlertController.java`

## Available Scripts

```bash
npm start      # Run development server
npm build      # Create production build
npm test       # Run tests
npm eject      # Eject from Create React App (irreversible)
```
