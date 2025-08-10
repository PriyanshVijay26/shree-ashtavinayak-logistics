import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { UserPlus, Mail, Lock, User, MapPin, Eye, EyeOff } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { cityAPI } from '../services/api';
import { City } from '../types/auth';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: '',
    cityId: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [cities, setCities] = useState<City[]>([]);
  const [loadingCities, setLoadingCities] = useState(true);

  const { register, isLoading, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      navigate('/dashboard', { replace: true });
    }
  }, [isAuthenticated, navigate]);

  // Fetch cities on component mount
  useEffect(() => {
    const fetchCities = async () => {
      try {
        const response = await cityAPI.getAllCities();
        if (response.success) {
          setCities(response.data.cities);
        }
      } catch (error) {
        console.error('Error fetching cities:', error);
      } finally {
        setLoadingCities(false);
      }
    };

    fetchCities();
  }, []);

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.firstName.trim()) {
      newErrors.firstName = 'First name is required';
    }

    if (!formData.lastName.trim()) {
      newErrors.lastName = 'Last name is required';
    }

    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email is invalid';
    }

    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters';
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.cityId) {
      newErrors.cityId = 'Please select a city';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    const { confirmPassword, ...registerData } = formData;
    const success = await register(registerData);
    
    if (success) {
      navigate('/dashboard', { replace: true });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const selectedCity = cities.find(city => city.id === formData.cityId);

  return (
    <div className="auth-container">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="auth-card"
      >
        <div className="auth-header">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="auth-icon"
          >
            <UserPlus className="h-6 w-6" />
          </motion.div>
          <h2 className="auth-title">
            Create your account
          </h2>
          <p className="auth-subtitle">
            Or{' '}
            <Link to="/login" className="auth-link">
              sign in to your existing account
            </Link>
          </p>
        </div>

        <motion.form
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="auth-form"
          onSubmit={handleSubmit}
        >
          <div className="form-grid">
            <div className="input-group">
              <label htmlFor="firstName" className="input-label">
                First Name
              </label>
              <div className="input-wrapper">
                <User className="input-icon" />
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  value={formData.firstName}
                  onChange={handleChange}
                  className={`input-field ${errors.firstName ? 'error' : ''}`}
                  placeholder="First name"
                />
              </div>
              {errors.firstName && (
                <p className="error-message">{errors.firstName}</p>
              )}
            </div>

            <div className="input-group">
              <label htmlFor="lastName" className="input-label">
                Last Name
              </label>
              <div className="input-wrapper">
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  value={formData.lastName}
                  onChange={handleChange}
                  className={`input-field ${errors.lastName ? 'error' : ''}`}
                  placeholder="Last name"
                  style={{ paddingLeft: '0.75rem' }}
                />
              </div>
              {errors.lastName && (
                <p className="error-message">{errors.lastName}</p>
              )}
            </div>
          </div>

          <div className="input-group">
            <label htmlFor="email" className="input-label">
              Email address
            </label>
            <div className="input-wrapper">
              <Mail className="input-icon" />
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                value={formData.email}
                onChange={handleChange}
                className={`input-field ${errors.email ? 'error' : ''}`}
                placeholder="Enter your email"
              />
            </div>
            {errors.email && (
              <p className="error-message">{errors.email}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="cityId" className="input-label">
              Select Your City
            </label>
            <div className="input-wrapper">
              <MapPin className="input-icon" />
              <select
                id="cityId"
                name="cityId"
                value={formData.cityId}
                onChange={handleChange}
                className={`input-field ${errors.cityId ? 'error' : ''}`}
                disabled={loadingCities}
              >
                <option value="">
                  {loadingCities ? 'Loading cities...' : 'Select a city'}
                </option>
                {cities.map((city) => (
                  <option key={city.id} value={city.id}>
                    {city.name}, {city.state} - ₹{city.pricePerKg}/kg
                  </option>
                ))}
              </select>
            </div>
            {errors.cityId && (
              <p className="error-message">{errors.cityId}</p>
            )}
            {selectedCity && (
              <p className="success-message">
                Rate: ₹{selectedCity.pricePerKg}/kg for {selectedCity.name}
              </p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="password" className="input-label">
              Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.password}
                onChange={handleChange}
                className={`input-field input-field-with-toggle ${errors.password ? 'error' : ''}`}
                placeholder="Enter your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.password && (
              <p className="error-message">{errors.password}</p>
            )}
          </div>

          <div className="input-group">
            <label htmlFor="confirmPassword" className="input-label">
              Confirm Password
            </label>
            <div className="input-wrapper">
              <Lock className="input-icon" />
              <input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                autoComplete="new-password"
                value={formData.confirmPassword}
                onChange={handleChange}
                className={`input-field input-field-with-toggle ${errors.confirmPassword ? 'error' : ''}`}
                placeholder="Confirm your password"
              />
              <button
                type="button"
                className="password-toggle"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className="h-5 w-5" />
                ) : (
                  <Eye className="h-5 w-5" />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <p className="error-message">{errors.confirmPassword}</p>
            )}
          </div>

          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            disabled={isLoading || loadingCities}
            className="auth-button"
          >
            {isLoading ? (
              <div className="loading-spinner"></div>
            ) : (
              'Create Account'
            )}
          </motion.button>
        </motion.form>
      </motion.div>
    </div>
  );
};

export default Register;