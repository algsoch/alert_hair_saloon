import React, { useEffect, useState, useRef } from 'react';
import './OwnerNotifications.css';

const OwnerNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const audioRef = useRef(null);
  const notificationsEndRef = useRef(null);

  const CORRECT_PASSWORD = 'Iit7065@';

  // Check if already authenticated in localStorage
  useEffect(() => {
    const savedAuth = localStorage.getItem('ownerAuthenticated');
    if (savedAuth === 'true') {
      setIsAuthenticated(true);
    }
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (password === CORRECT_PASSWORD) {
      setIsAuthenticated(true);
      localStorage.setItem('ownerAuthenticated', 'true');
      setPasswordError('');
    } else {
      setPasswordError('गलत पासवर्ड! फिर से प्रयास करें।');
      setPassword('');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('ownerAuthenticated');
    setPassword('');
  };

  const scrollToBottom = () => {
    notificationsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(scrollToBottom, [notifications]);

  useEffect(() => {
    // Load speech synthesis voices
    if ('speechSynthesis' in window) {
      speechSynthesis.getVoices();
      window.speechSynthesis.onvoiceschanged = () => {
        speechSynthesis.getVoices();
      };
    }

    // Only connect to SSE if authenticated
    if (!isAuthenticated) {
      return;
    }

    // Connect to SSE endpoint
    // If REACT_APP_API_URL is not set (dev), derive backend host from the current page hostname.
    // This makes the owner page work when opened on a phone using http://<computer-ip>:3000/owner
    const inferredHost = (() => {
      try {
        const hostname = window.location.hostname; // e.g. 192.168.1.4 when accessed from phone
        const protocol = window.location.protocol; // http:
        return `${protocol}//${hostname}:8080`;
      } catch (e) {
        return 'http://localhost:8080';
      }
    })();

    const apiUrl = process.env.REACT_APP_API_URL || inferredHost;
    const eventSource = new EventSource(`${apiUrl}/api/notifications/stream`);

    eventSource.addEventListener('connected', (event) => {
      console.log('Connected to notification stream:', event.data);
      setIsConnected(true);
      setNotifications(prev => [{
        id: Date.now(),
        message: event.data,
        type: 'system',
        timestamp: new Date().toLocaleString('hi-IN')
      }, ...prev]);
    });

    eventSource.addEventListener('customer-alert', (event) => {
      console.log('New customer alert:', event.data);
      
      // Parse JSON payload
      let alertData;
      try {
        alertData = JSON.parse(event.data);
      } catch (e) {
        // Fallback for old text format
        alertData = {
          message: event.data,
          photo: null,
          spokenMessage: null
        };
      }
      
      // Play notification sound
      if (audioRef.current) {
        audioRef.current.play().catch(err => console.log('Audio play failed:', err));
      }
      
      // Speak the Hindi message using Web Speech API
      if (alertData.spokenMessage && 'speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(alertData.spokenMessage);
        utterance.lang = 'hi-IN';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;
        utterance.volume = 1.0;
        
        // Get Hindi voice if available
        const voices = speechSynthesis.getVoices();
        const hindiVoice = voices.find(voice => voice.lang.startsWith('hi'));
        if (hindiVoice) {
          utterance.voice = hindiVoice;
        }
        
        speechSynthesis.speak(utterance);
      }
      
      // Vibrate if supported
      if (navigator.vibrate) {
        navigator.vibrate([200, 100, 200, 100, 200]);
      }
      
      // Add notification with photo
      setNotifications(prev => [{
        id: Date.now(),
        message: alertData.message,
        photo: alertData.photo,
        type: 'alert',
        timestamp: new Date().toLocaleString('hi-IN')
      }, ...prev]);
      
      // Show browser notification if permission granted
      if (Notification.permission === 'granted') {
        new Notification('🔔 नया ग्राहक!', {
          body: alertData.spokenMessage || alertData.message,
          icon: '/barber-icon.png',
          vibrate: [200, 100, 200]
        });
      }
    });

    eventSource.onerror = (error) => {
      console.error('SSE Error:', error);
      setIsConnected(false);
    };

    // Request notification permission
    if (Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      eventSource.close();
    };
  }, [isAuthenticated]); // Re-run when authentication changes

  // Show password screen if not authenticated
  if (!isAuthenticated) {
    return (
      <div className="owner-notifications">
        <div className="password-screen">
          <div className="password-container">
            <h1>🪒 Vicky Hair Salon</h1>
            <h2>मालिक प्रवेश</h2>
            <p className="password-subtitle">कृपया पासवर्ड डालें</p>
            
            <form onSubmit={handlePasswordSubmit} className="password-form">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="पासवर्ड"
                className="password-input"
                autoFocus
              />
              {passwordError && (
                <div className="password-error">{passwordError}</div>
              )}
              <button type="submit" className="password-submit">
                लॉगिन करें
              </button>
            </form>
            
            <div className="password-hint">
              <small>🔒 सुरक्षित प्रवेश</small>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="owner-notifications">
      <header className="notification-header">
        <h1>🪒 Vicky Hair Salon</h1>
        <h2>मालिक नोटिफिकेशन पैनल</h2>
        <div className="header-controls">
          <div className={`connection-status ${isConnected ? 'connected' : 'disconnected'}`}>
            <span className="status-dot"></span>
            {isConnected ? 'कनेक्टेड ✓' : 'डिस्कनेक्टेड ✗'}
          </div>
          <button onClick={handleLogout} className="logout-button">
            लॉगआउट
          </button>
        </div>
      </header>

      <div className="notifications-container">
        {notifications.length === 0 && isConnected && (
          <div className="empty-state">
            <div className="empty-icon">📱</div>
            <p>नोटिफिकेशन के लिए तैयार</p>
            <p className="empty-subtitle">जब ग्राहक आएगा, यहाँ दिखेगा</p>
          </div>
        )}

        {notifications.map((notification) => (
          <div 
            key={notification.id} 
            className={`notification-card ${notification.type}`}
          >
            {notification.photo && (
              <div className="customer-photo-container">
                <img 
                  src={notification.photo} 
                  alt="Customer" 
                  className="customer-photo"
                />
              </div>
            )}
            <div className="notification-content">
              <pre className="notification-message">{notification.message}</pre>
              <div className="notification-time">{notification.timestamp}</div>
            </div>
          </div>
        ))}
        <div ref={notificationsEndRef} />
      </div>

      {/* Hidden audio element for notification sound */}
      <audio ref={audioRef} src="/notification-sound.mp3" />
    </div>
  );
};

export default OwnerNotifications;
