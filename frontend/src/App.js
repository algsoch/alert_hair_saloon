import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import SalonCard from './components/SalonCard';
import QRCodeGenerator from './components/QRCodeGenerator';
import OwnerNotifications from './components/OwnerNotifications';
import { sendAlert, getShopInfo } from './services/api';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<CustomerPage />} />
        <Route path="/owner" element={<OwnerNotifications />} />
      </Routes>
    </Router>
  );
}

function CustomerPage() {
  const [shopInfo, setShopInfo] = useState(null);
  const [alertStatus, setAlertStatus] = useState({ show: false, message: '', type: '' });
  const [loading, setLoading] = useState(false);
  const [showQR, setShowQR] = useState(false);

  useEffect(() => {
    fetchShopInfo();
  }, []);

  const fetchShopInfo = async () => {
    try {
      const data = await getShopInfo();
      setShopInfo(data);
    } catch (error) {
      console.error('Error fetching shop info:', error);
      // Use default data if API fails
      setShopInfo({
        shopName: 'Vicky Hair Salon',
        ownerName: 'Karpuri Thakur',
        phoneNumber: '7835805279',
        experience: '20+ Years of Excellence',
        description: 'Welcome to Vicky Hair Salon, where tradition meets excellence. With over two decades of expertise in hair styling and grooming, we provide premium services tailored to your needs. From classic cuts to modern styles, our experienced barber ensures you leave looking your absolute best.'
      });
    }
  };

  const handleNotifyBarber = async (customerPhoto) => {
    setLoading(true);
    setAlertStatus({ show: false, message: '', type: '' });

    try {
      const response = await sendAlert(customerPhoto);
      setAlertStatus({
        show: true,
        message: response.message || 'Barber notified successfully! Please wait, they will be with you shortly.',
        type: 'success'
      });
    } catch (error) {
      setAlertStatus({
        show: true,
        message: 'Failed to notify barber. Please try again or call directly.',
        type: 'error'
      });
    } finally {
      setLoading(false);
      setTimeout(() => {
        setAlertStatus({ show: false, message: '', type: '' });
      }, 5000);
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🪒 Vicky Hair Salon Alert System</h1>
        <p>QR Code Based Barber Notification</p>
        <Link to="/owner" className="owner-link">
          मालिक नोटिफिकेशन पैनल →
        </Link>
      </header>
      <div className="container">
        {shopInfo && (
          <SalonCard
            shopInfo={shopInfo}
            onNotify={handleNotifyBarber}
            loading={loading}
            alertStatus={alertStatus}
          />
        )}
        
        <button 
          className="qr-toggle-btn"
          onClick={() => setShowQR(!showQR)}
        >
          {showQR ? 'Hide QR Code' : 'Show QR Code'}
        </button>

        {showQR && <QRCodeGenerator />}
      </div>
    </div>
  );
}

export default App;
