import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Truck, User, LogOut, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';

const Navbar: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, isAuthenticated, logout } = useAuth();

  const navItems = [
    { path: '/', label: 'Home' },
    { path: '/services', label: 'Services' },
    { path: '/about', label: 'About' },
    { path: '/contact', label: 'Contact' },
  ];

  const handleLogout = () => {
    logout();
    setShowUserMenu(false);
    navigate('/');
  };

  return (
    <nav style={{
      width: '100%',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      backgroundColor: '#ffffff',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
      padding: 0,
      margin: 0
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: 0,
        margin: 0,
        width: '100%',
        maxWidth: '100vw'
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          textDecoration: 'none',
          margin: 0,
          padding: 0,
          flexShrink: 0
        }}>
          <img 
            src="/images/company-logo.jpg" 
            alt="Shipsphere Logistics Logo" 
            style={{ 
              width: '20rem',
              height: '4.5rem',
              maxWidth: '100%',
              objectFit: 'contain',
              margin: 0,
              padding: 0,
              display: 'block'
            }}
            onError={(e) => {
              // Fallback to truck icon if logo not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              const truckIcon = target.nextElementSibling as HTMLElement;
              if (truckIcon) {
                truckIcon.style.display = 'block';
                truckIcon.style.width = '4rem';
                truckIcon.style.height = '4rem';
                truckIcon.style.color = '#2563eb';
              }
            }}
          />
          <Truck style={{
            display: 'none',
            width: '4rem',
            height: '4rem',
            color: '#2563eb'
          }} />
        </Link>

        <div className="nav-menu" style={{ marginLeft: 'auto', flexWrap: 'wrap' }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Authentication Links */}
          {isAuthenticated ? (
            <div className="auth-menu">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="nav-link"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer'
                }}
              >
                <User className="h-4 w-4" />
                <span>{user?.firstName}</span>
              </button>
              
              {showUserMenu && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="user-menu"
                >
                  <Link
                    to="/dashboard"
                    className="user-menu-item"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="inline h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link
                      to="/admin/cities"
                      className="user-menu-item"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="inline h-4 w-4 mr-2" />
                      Manage Cities
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="user-menu-item"
                  >
                    <LogOut className="inline h-4 w-4 mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div className="auth-links">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link 
                to="/register" 
                className="nav-link"
                style={{ 
                  backgroundColor: '#2563eb', 
                  color: '#ffffff', 
                  padding: '8px 16px', 
                  borderRadius: '6px', 
                  textDecoration: 'none',
                  fontWeight: '500',
                  border: 'none',
                  display: 'inline-block',
                  transition: 'all 0.3s ease',
                  whiteSpace: 'nowrap'
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#1d4ed8';
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLElement).style.backgroundColor = '#2563eb';
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <div className="nav-toggle" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </div>
      </div>

      <motion.div
        className={`nav-mobile ${isOpen ? 'show' : ''}`}
        initial={{ opacity: 0, height: 0 }}
        animate={{ opacity: isOpen ? 1 : 0, height: isOpen ? 'auto' : 0 }}
        transition={{ duration: 0.3 }}
      >
        {navItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`nav-link-mobile ${location.pathname === item.path ? 'active' : ''}`}
            onClick={() => setIsOpen(false)}
          >
            {item.label}
          </Link>
        ))}
        
        {/* Mobile Authentication Links */}
        {isAuthenticated ? (
          <>
            <Link
              to="/dashboard"
              className="nav-link-mobile"
              onClick={() => setIsOpen(false)}
            >
              Dashboard
            </Link>
            {user?.role === 'ADMIN' && (
              <Link
                to="/admin/cities"
                className="nav-link-mobile"
                onClick={() => setIsOpen(false)}
              >
                Manage Cities
              </Link>
            )}
            <button
              onClick={() => {
                handleLogout();
                setIsOpen(false);
              }}
              className="nav-link-mobile text-left w-full"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="nav-link-mobile"
              onClick={() => setIsOpen(false)}
            >
              Login
            </Link>
            <Link
              to="/register"
              className="register-button-mobile"
              onClick={() => setIsOpen(false)}
            >
              Register
            </Link>
          </>
        )}
      </motion.div>
    </nav>
  );
};

export default Navbar; 