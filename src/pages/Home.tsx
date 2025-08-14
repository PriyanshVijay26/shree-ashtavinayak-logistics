import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Globe, 
  Clock, 
  Shield, 
  Users, 
  MapPin, 
  Phone,
  Mail,
  ArrowRight,
  FileText,
  Search,
  X
} from 'lucide-react';

const Home = () => {
  const [showTrackingModal, setShowTrackingModal] = useState(false);
  const [orderId, setOrderId] = useState('');

  const handleTrackOrder = () => {
    if (orderId.trim()) {
      const trackingNumber = orderId.trim();
      
      // Copy to clipboard and open Delhivery tracking page
      if (navigator.clipboard) {
        navigator.clipboard.writeText(trackingNumber).then(() => {
          window.open('https://www.delhivery.com/tracking', '_blank');
          // Show a more helpful message
          setTimeout(() => {
            alert(`✅ Tracking number "${trackingNumber}" copied to clipboard!\n\nThe Delhivery tracking page is now open. Simply paste (Ctrl+V) the tracking number in the AWB field.`);
          }, 500);
        }).catch(() => {
          // Fallback if clipboard API fails
          window.open('https://www.delhivery.com/tracking', '_blank');
          prompt(`Copy this tracking number and paste it on the Delhivery page:`, trackingNumber);
        });
      } else {
        // Fallback for browsers without clipboard API
        window.open('https://www.delhivery.com/tracking', '_blank');
        prompt(`Copy this tracking number and paste it on the Delhivery page:`, trackingNumber);
      }
      
      setShowTrackingModal(false);
      setOrderId('');
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleTrackOrder();
    }
  };
  const services = [
    {
      icon: <Truck />,
      title: 'Road Transport',
      description: 'Reliable road transportation across India with modern fleet and experienced drivers.',
      color: '#3B82F6'
    },
    {
      icon: <Package />,
      title: 'Warehousing',
      description: 'Secure storage solutions with advanced inventory management systems.',
      color: '#10B981'
    },
    {
      icon: <Globe />,
      title: 'Local and National Shipping',
      description: 'Comprehensive shipping solutions across India with door-to-door logistics services.',
      color: '#F59E0B'
    },
    {
      icon: <Clock />,
      title: 'Express Delivery',
      description: 'Time-critical deliveries with real-time tracking and guaranteed timelines.',
      color: '#EF4444'
    }
  ];

  const stats = [
    { number: '500+', label: 'Happy Clients', icon: <Users /> },
    { number: '27000+', label: 'Pin Code Coverage', icon: <MapPin /> },
    { number: '24/7', label: 'Support', icon: <Phone /> },
    { number: '99%', label: 'On-time Delivery', icon: <Clock /> }
  ];

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-content">
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-text"
          >
            <h1>Your Trusted Logistics Partner</h1>
            <p>
              Shipsphere Logistics provides comprehensive transportation and 
              warehousing solutions across India. We ensure your cargo reaches its 
              destination safely and on time.
            </p>
            <div className="hero-buttons">
              <Link to="/services" className="btn btn-primary">
                Our Services
                <ArrowRight />
              </Link>
              <Link to="/contact" className="btn btn-secondary">
                Get Quote
              </Link>
              <button 
                onClick={() => setShowTrackingModal(true)}
                className="btn btn-secondary"
              >
                <Search />
                Track Your Order
              </button>
              <a 
                href="/documents/RATE CARD OF SHIPSPHERE LOGISTICS .pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                <FileText />
                Rate Card
              </a>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="hero-image"
          >
            <div className="hero-visual">
              {/* Replace with your actual image */}
              <img 
                src="/images/logistics-hero.jpg" 
                alt="Man holding package with logistics truck" 
                className="hero-main-image"
                onError={(e) => {
                  // Fallback to icon if image not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hero-visual-fallback">
                <Truck className="hero-truck" />
                <div className="hero-packages">
                  <Package />
                  <Package />
                  <Package />
                </div>
              </div>
              <div className="hero-truck-message">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  className="truck-message-box"
                >
                  <Truck className="message-truck-icon" />
                  <p>Your First Delivery is Free — Experience Our Reliable Door-to-Door Service and Save with Low-Cost Shipping</p>
                </motion.div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="services-overview">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Our Services</h2>
            <p>Comprehensive logistics solutions tailored to your needs</p>
          </motion.div>

          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-card"
                style={{ '--accent-color': service.color } as React.CSSProperties}
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>

          <div className="services-cta">
            <Link to="/services" className="btn btn-secondary">
              View All Services
              <ArrowRight />
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="stats-section">
        <div className="container">
          <div className="stats-grid">
            {stats.map((stat, index) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="stat-item"
              >
                <div className="stat-icon">{stat.icon}</div>
                <div className="stat-number">{stat.number}</div>
                <div className="stat-label">{stat.label}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Best Rates & Services */}
      <section className="why-choose-us">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Best Rates Guaranteed</h2>
            <p className="highlight-pricing">B2B shipping starts at ₹6/kg</p>
          </motion.div>

          <div className="features-grid">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="feature-item"
            >
              <Shield className="feature-icon" />
              <h3>Safe & Secure</h3>
              <p>Your cargo is protected with comprehensive insurance and secure handling.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="feature-item"
            >
              <Clock className="feature-icon" />
              <h3>On-Time Delivery</h3>
              <p>We guarantee timely delivery with real-time tracking and updates.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="feature-item"
            >
              <Users className="feature-icon" />
              <h3>Expert Team</h3>
              <p>Experienced professionals handle your logistics with care and expertise.</p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="cta-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2>Ready to Ship with Confidence?</h2>
            <p>Get in touch with us today for a customized logistics solution</p>
            <div className="cta-buttons">
              <Link to="/contact" className="btn btn-primary">
                Contact Us
                <Mail />
              </Link>
              <a href="tel:+919773575251" className="btn btn-secondary">
                Call: +91 9773575251
                <Phone />
              </a>
              <a href="tel:+917011279296" className="btn btn-secondary">
                Call: +91 7011279296
                <Phone />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Track Order Modal */}
      {showTrackingModal && (
        <div className="modal-overlay" onClick={() => setShowTrackingModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Track Your Order</h3>
              <button 
                className="modal-close"
                onClick={() => setShowTrackingModal(false)}
              >
                <X size={24} />
              </button>
            </div>
            <div className="modal-body">
              <p>Enter your AWB/Order ID below. We'll copy it and open Delhivery's tracking page for you:</p>
              <input
                type="text"
                value={orderId}
                onChange={(e) => setOrderId(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter AWB Number or Order ID"
                className="tracking-input"
                autoFocus
              />
              <div className="modal-buttons">
                <button 
                  onClick={handleTrackOrder}
                  className="btn btn-primary"
                  disabled={!orderId.trim()}
                >
                  <Search />
                  Track Order
                </button>
                <button 
                  onClick={() => setShowTrackingModal(false)}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home; 