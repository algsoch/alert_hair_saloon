import React, { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import './QRCodeGenerator.css';

const QRCodeGenerator = () => {
  const [currentUrl, setCurrentUrl] = useState('');
  const [networkUrl, setNetworkUrl] = useState('');

  useEffect(() => {
    // Get current URL
    const currentPageUrl = window.location.href;
    setCurrentUrl(currentPageUrl);
    
    // Try to determine network IP address
    const hostname = window.location.hostname;
    
    // If already on network IP, use that
    if (hostname !== 'localhost' && hostname !== '127.0.0.1') {
      setNetworkUrl(currentPageUrl);
    } else {
      // Provide a placeholder for network URL
      setNetworkUrl('http://192.168.1.X:3000');
    }
  }, []);

  const downloadQR = () => {
    const svg = document.getElementById('qr-code-svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
      const pngFile = canvas.toDataURL('image/png');
      
      const downloadLink = document.createElement('a');
      downloadLink.download = 'vicky-salon-qr-code.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="qr-container">
      <div className="qr-card">
        <h2 className="qr-title">QR Code for Vicky Hair Salon</h2>
        <p className="qr-description">
          Scan this QR code to access the alert system
        </p>
        
        <div className="qr-code-wrapper">
          <QRCodeSVG
            id="qr-code-svg"
            value={networkUrl || currentUrl}
            size={256}
            level="H"
            includeMargin={true}
            bgColor="#ffffff"
            fgColor="#000000"
          />
        </div>

        <button className="download-btn" onClick={downloadQR}>
          📥 Download QR Code
        </button>

        <div className="qr-instructions">
          <h3>How to use:</h3>
          <ol>
            <li>First, open this page using your network IP (not localhost)</li>
            <li>Example: http://192.168.1.4:3000/qr-generator</li>
            <li>Download the QR code using the button above</li>
            <li>Print it on high-quality paper or cardstock</li>
            <li>Laminate for durability (optional)</li>
            <li>Place it in a visible location in your shop</li>
            <li>Customers can scan to notify you instantly</li>
          </ol>
        </div>

        <div className="url-display">
          <p><strong>Network URL for QR Code:</strong></p>
          <input 
            type="text" 
            value={networkUrl || currentUrl} 
            readOnly 
            className="url-input"
            onClick={(e) => e.target.select()}
          />
          {(window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') && (
            <p style={{ color: '#ff6b6b', marginTop: '10px', fontSize: '14px' }}>
              ⚠️ You're on localhost! Open using network IP (192.168.1.X:3000) to generate proper QR code
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default QRCodeGenerator;
