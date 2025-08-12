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
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          <Truck className="logo-icon" />
          <span>Shipsphere Logistics</span>
        </Link>

        <div className="nav-menu">
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
            <div className="relative">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="flex items-center space-x-2 nav-link"
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
            <div className="flex space-x-4">
              <Link to="/login" className="nav-link">
                Login
              </Link>
              <Link to="/register" className="nav-link bg-orange-600 text-white px-4 py-2 rounded-md hover:bg-orange-700">
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
              className="nav-link-mobile bg-orange-600 text-white rounded-md mx-4 my-2 text-center"
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