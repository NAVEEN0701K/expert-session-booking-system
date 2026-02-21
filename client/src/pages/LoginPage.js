import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

const LoginPage = () => {
  const [mode, setMode] = useState('login');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleToggleMode = () => {
    setMode(mode === 'login' ? 'register' : 'login');
  };

  const handleAuthSuccess = (userData) => {
    login(userData);
    navigate('/');
  };

  return (
    <div className="login-page">
      <div className="auth-background">
        <div className="auth-content">
          <div className="auth-header">
            <h1>Expert Booking System</h1>
            <p>Connect with professionals across various fields</p>
          </div>
          
          <AuthForm
            mode={mode}
            onToggleMode={handleToggleMode}
            onAuthSuccess={handleAuthSuccess}
          />
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
