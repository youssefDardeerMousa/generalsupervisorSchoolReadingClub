import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainNavbar from '../Navbar/Navbar';

export default function Protected({ children }) {
  const navigate = useNavigate();
  const location = useLocation();
  const token = localStorage.getItem('tokengeneralsupervisor');

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  if (!token) {
    return null;
  }

  // Don't show navbar on WelcomePage
  const isWelcomePage = location.pathname === '/';

  return (
    <>
      {!isWelcomePage && <MainNavbar />}
      {children}
    </>
  );
}
