import React, { useState } from 'react';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Sidenav from './Sidenav';
import Home from './pages/Home';
import Products from './pages/Products';
import Orders from './pages/Orders';
import Customers from './pages/Customers';
import Analytics from './pages/Analytics';
import Settings from './pages/Settings';
import Auth from './pages/Auth';
import { CustomThemeProvider } from './ThemeContext';
import { getCurrentUser } from './services/api';
import './App.css';

function App() {
  const [user, setUser] = useState(() => getCurrentUser());

  const handleLoginSuccess = (userData) => {
    setUser(userData);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <CustomThemeProvider>
      {!user ? (
        <Auth onLoginSuccess={handleLoginSuccess} />
      ) : (
        <BrowserRouter>
          <Sidenav onLogout={handleLogout}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/products" element={<Products />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </Sidenav>
        </BrowserRouter>
      )}
    </CustomThemeProvider>
  );
}

export default App;
