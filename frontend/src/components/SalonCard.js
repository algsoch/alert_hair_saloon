import React, { useState, useRef } from 'react';
import './SalonCard.css';

const SalonCard = ({ shopInfo, onNotify, loading, alertStatus }) => {
  const [showCamera, setShowCamera] = useState(false);
  const [cameraReady, setCameraReady] = useState(false);
  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);

  const startCamera = async () => {
    try {
      setCameraReady(false);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user', 
          width: { ideal: 1280 }, 
          height: { ideal: 720 } 
        } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        
        // Wait for video to be ready
        videoRef.current.onloadedmetadata = () => {
          videoRef.current.play();
          // Small delay to ensure video has rendered frames
          setTimeout(() => {
            setCameraReady(true);
          }, 300);
        };
        
        // Backup: set ready after delay if metadata event doesn't fire
        setTimeout(() => {
          if (videoRef.current && videoRef.current.readyState >= 2) {
            setCameraReady(true);
          }
        }, 1000);
      }
      setShowCamera(true);
    } catch (error) {
      console.error('Camera access denied:', error);
      alert('कैमरा एक्सेस नहीं मिला। कृपया अनुमति दें या बिना फोटो के जारी रखें।');
    }
  };

  const captureAndNotify = async () => {
    let customerPhoto = null;
    
    if (showCamera && videoRef.current && canvasRef.current) {
      try {
        // Ensure video is ready
        const video = videoRef.current;
        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          const canvas = canvasRef.current;
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          
          const ctx = canvas.getContext('2d');
          ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
          customerPhoto = canvas.toDataURL('image/jpeg', 0.8);
          
          console.log('Photo captured, size:', customerPhoto.length);
        } else {
          alert('कैमरा अभी तैयार नहीं है। कृपया 2 सेकंड प्रतीक्षा करें।');
          return;
        }
      } catch (error) {
        console.error('Error capturing photo:', error);
        alert('फोटो लेने में समस्या। फिर से प्रयास करें।');
        return;
      }
      
      // Stop camera
      if (streamRef.current) {
        streamRef.current.getTracks().forEach(track => track.stop());
      }
      setShowCamera(false);
    }
    
    // Call parent's onNotify with photo
    await onNotify(customerPhoto);
  };

  return (
    <div className="salon-card">
      {/* Header with gradient */}
      <div className="card-header">
        <h1 className="shop-name">{shopInfo.shopName}</h1>
      </div>

      {/* Owner Photo */}
      <div className="owner-photo-container">
        <div className="owner-photo">
          <img 
            src="/owner.png" 
            alt={shopInfo.ownerName}
            className="owner-image"
            onError={(e) => {
              // Fallback to placeholder SVG if image fails to load
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'block';
            }}
          />
          <svg 
            viewBox="0 0 200 200" 
            xmlns="http://www.w3.org/2000/svg"
            style={{ display: 'none' }}
          >
            <circle cx="100" cy="80" r="40" fill="#667eea" />
            <path
              d="M 50 150 Q 100 120, 150 150 L 150 200 L 50 200 Z"
              fill="#667eea"
            />
          </svg>
        </div>
        <p className="owner-name-tag">{shopInfo.ownerName}</p>
      </div>

      {/* Shop Details */}
      <div className="shop-details">
        <div className="detail-item">
          <span className="detail-label">Owner:</span>
          <span className="detail-value">{shopInfo.ownerName}</span>
        </div>

        <div className="detail-item">
          <span className="detail-label">Phone:</span>
          <a href={`tel:${shopInfo.phoneNumber}`} className="detail-value phone-link">
            {shopInfo.phoneNumber}
          </a>
        </div>

        <div className="detail-item">
          <span className="detail-label">Experience:</span>
          <span className="detail-value">{shopInfo.experience}</span>
        </div>

        <div className="description">
          <p>{shopInfo.description}</p>
        </div>
      </div>

      {/* Alert Status */}
      {alertStatus.show && (
        <div className={`alert ${alertStatus.type}`}>
          {alertStatus.type === 'success' ? '✅ ' : '❌ '}
          {alertStatus.message}
        </div>
      )}

      {/* Camera Section */}
      {showCamera && (
        <div className="camera-container">
          <video ref={videoRef} autoPlay playsInline muted className="camera-preview"></video>
          <canvas ref={canvasRef} style={{ display: 'none' }}></canvas>
          {!cameraReady && (
            <div className="camera-loading">
              <div className="spinner-small"></div>
              <p>कैमरा तैयार हो रहा है...</p>
            </div>
          )}
        </div>
      )}

      {/* Notify Button */}
      {!showCamera && !loading && (
        <button
          className="camera-button"
          onClick={startCamera}
        >
          📸 फोटो के साथ नोटिफाई करें
        </button>
      )}

      {showCamera && (
        <button
          className="capture-button"
          onClick={captureAndNotify}
          disabled={loading || !cameraReady}
        >
          {loading ? 'भेज रहे हैं...' : !cameraReady ? 'कैमरा तैयार हो रहा है...' : '✓ फोटो लें और भेजें'}
        </button>
      )}

      {!showCamera && !loading && (
        <button
          className="notify-button-simple"
          onClick={() => onNotify(null)}
        >
          <span className="bell-icon">🔔</span>
          बिना फोटो के नोटिफाई करें
        </button>
      )}

      {/* Footer */}
      <div className="card-footer">
        <p>Thank you for choosing {shopInfo.shopName}!</p>
      </div>
    </div>
  );
};

export default SalonCard;
