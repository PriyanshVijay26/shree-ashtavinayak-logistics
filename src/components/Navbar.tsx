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
      backgroundColor: '#ffffff',
      boxShadow: '0 1px 2px 0 rgb(0 0 0 / 0.05)',
      position: 'sticky',
      top: 0,
      zIndex: 1000,
      width: '100%',
      padding: 0,
      margin: 0
    }}>
      <div style={{
        display: 'flex',
        justifyContent: 'flex-start',
        alignItems: 'center',
        padding: '0',
        minHeight: '6rem',
        width: '100%',
        margin: 0
      }}>
        <Link to="/" style={{
          display: 'flex',
          alignItems: 'center',
          gap: 0,
          textDecoration: 'none',
          color: '#1f2937',
          fontWeight: 700,
          margin: 0,
          padding: 0
        }}>
          <img 
            src="/images/company-logo.jpg" 
            alt="Shipsphere Logistics Logo" 
            style={{
              width: '40rem',
              height: '5rem',
              objectFit: 'contain',
              margin: 0,
              padding: 0
            }}
            onError={(e) => {
              // Fallback to truck icon if logo not found
              const target = e.target as HTMLImageElement;
              target.style.display = 'none';
              target.nextElementSibling?.classList.remove('hidden');
            }}
          />
          <Truck style={{
            width: '30rem',
            height: '5rem',
            color: '#2563eb',
            margin: 0,
            padding: 0,
            display: 'none'
          }} className="logo-icon hidden" />
        </Link>

        <div style={{
          display: 'flex',
          gap: '2rem',
          marginLeft: 'auto',
          paddingRight: '2rem'
        }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                textDecoration: 'none',
                color: location.pathname === item.path ? '#2563eb' : '#6b7280',
                fontWeight: 500,
                transition: 'color 0.3s ease',
                position: 'relative'
              }}
              onClick={() => setIsOpen(false)}
            >
              {item.label}
            </Link>
          ))}
          
          {/* Authentication Links */}
          {isAuthenticated ? (
            <div style={{ position: 'relative' }}>
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  textDecoration: 'none',
                  color: '#6b7280',
                  fontWeight: 500,
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
                  className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50 border"
                >
                  <Link
                    to="/dashboard"
                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    onClick={() => setShowUserMenu(false)}
                  >
                    <Settings className="inline h-4 w-4 mr-2" />
                    Dashboard
                  </Link>
                  {user?.role === 'ADMIN' && (
                    <Link
                      to="/admin/cities"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                      onClick={() => setShowUserMenu(false)}
                    >
                      <Settings className="inline h-4 w-4 mr-2" />
                      Manage Cities
                    </Link>
                  )}
                  <button
                    onClick={handleLogout}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    <LogOut className="inline h-4 w-4 mr-2" />
                    Logout
                  </button>
                </motion.div>
              )}
            </div>
          ) : (
            <div style={{ display: 'flex', gap: '1rem' }}>
              <Link 
                to="/login" 
                style={{
                  textDecoration: 'none',
                  color: '#6b7280',
                  fontWeight: 500,
                  transition: 'color 0.3s ease'
                }}
              >
                Login
              </Link>
              <Link 
                to="/register" 
                style={{
                  backgroundColor: '#2563eb',
                  color: 'white',
                  padding: '0.5rem 1rem',
                  borderRadius: '0.5rem',
                  textDecoration: 'none',
                  fontWeight: 500,
                  transition: 'all 0.3s ease',
                  border: 'none'
                }}
              >
                Register
              </Link>
            </div>
          )}
        </div>

        <div 
          style={{
            display: 'none',
            cursor: 'pointer',
            padding: '0.5rem'
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
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