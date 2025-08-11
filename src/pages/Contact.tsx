import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  Send, 
  CheckCircle,
  Truck
} from 'lucide-react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    // Don't prevent default - let Netlify handle the form submission naturally
    console.log('Form submitted - Netlify will handle this');
  };

  const contactInfo = [
    {
      icon: <Phone />,
      title: 'Phone',
      details: ['8076727536', '9773575251'],
      action: 'tel:+918076727536'
    },
    {
      icon: <Mail />,
      title: 'Email',
      details: ['shipspheretechnologies@gmail.com', 'support@shipshphere.com'],
      action: 'mailto:shipspheretechnologies@gmail.com'
    },
    {
      icon: <MapPin />,
      title: 'Address',
      details: ['South Extension, Arjun Nagar, Kotla Mubarakpur', 'South Extension I, New Delhi, Delhi 110003, India'],
      action: 'https://maps.google.com'
    },
    {
      icon: <Clock />,
      title: 'Business Hours',
      details: ['Monday - Friday: 8:00 AM - 8:00 PM', 'Saturday: 9:00 AM - 6:00 PM'],
      action: null
    }
  ];

  const services = [
    'Road Transportation',
    'Warehousing & Storage',
    'International Shipping',
    'Express Delivery',
    'Ocean Freight',
    'Air Freight',
    'Supply Chain Management',
    'Project Cargo',
    'E-commerce Logistics',
    'Cold Chain Logistics'
  ];

  const branches = [
    {
      city: 'New Delhi',
      address: 'South Extension, Arjun Nagar, Kotla Mubarakpur, South Extension I',
      phone: '8076727536',
      email: 'shipspheretechnologies@gmail.com'
    },
    {
      city: 'Mumbai',
      address: 'Logistics Hub, Andheri East',
      phone: '9773575251',
      email: 'mumbai@shipshphere.com'
    },
    {
      city: 'Bangalore',
      address: 'Cargo Center, Whitefield',
      phone: '8076727536',
      email: 'bangalore@shipshphere.com'
    },
    {
      city: 'Chennai',
      address: 'Logistics Zone, Ambattur',
      phone: '9773575251',
      email: 'chennai@shipshphere.com'
    }
  ];

  return (
    <div className="contact-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Contact Us</h1>
            <p>Get in touch with our logistics experts today</p>
          </motion.div>
        </div>
      </section>

      {/* Contact Information */}
      <section className="contact-info">
        <div className="container">
          <div className="contact-grid">
            {contactInfo.map((info, index) => (
              <motion.div
                key={info.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="contact-card"
              >
                <div className="contact-icon">
                  {info.icon}
                </div>
                <h3>{info.title}</h3>
                {info.details.map((detail, detailIndex) => (
                  <p key={detailIndex}>{detail}</p>
                ))}
                {info.action && (
                  <a href={info.action} className="contact-link">
                    {info.title === 'Phone' ? 'Call Now' : 
                     info.title === 'Email' ? 'Send Email' : 'View on Map'}
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Form */}
      <section className="contact-form-section">
        <div className="container">
          <div className="form-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="form-text"
            >
              <h2>Send Us a Message</h2>
              <p>
                Ready to streamline your logistics operations? Fill out the form below 
                and our team will get back to you within 24 hours with a customized solution.
              </p>
              
              <div className="form-features">
                <div className="feature">
                  <CheckCircle />
                  <span>Quick Response</span>
                </div>
                <div className="feature">
                  <CheckCircle />
                  <span>Free Consultation</span>
                </div>
                <div className="feature">
                  <CheckCircle />
                  <span>Custom Solutions</span>
                </div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="contact-form"
            >
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="success-message"
                >
                  <CheckCircle />
                  <h3>Thank You!</h3>
                  <p>Your message has been sent successfully. We'll get back to you soon.</p>
                </motion.div>
              )}

              <form 
                name="contact-form"
                method="POST"
                action="/thank-you.html"
                data-netlify="true"
                data-netlify-honeypot="bot-field"
                onSubmit={handleSubmit} 
                className={isSubmitted ? 'hidden' : ''}
              >
                {/* Hidden fields for Netlify */}
                <input type="hidden" name="form-name" value="contact-form" />
                <input type="hidden" name="bot-field" />
                <input type="hidden" name="email-to" value="priyanshvijay2002@gmail.com" />
                
                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="name">Full Name *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="email">Email Address *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor="company">Company Name</label>
                    <input
                      type="text"
                      id="company"
                      name="company"
                      value={formData.company}
                      onChange={handleInputChange}
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="service">Service Required</label>
                  <select
                    id="service"
                    name="service"
                    value={formData.service}
                    onChange={handleInputChange}
                  >
                    <option value="">Select a service</option>
                    {services.map((service) => (
                      <option key={service} value={service}>
                        {service}
                      </option>
                    ))}
                  </select>
                </div>

                <div className="form-group">
                  <label htmlFor="message">Message *</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Tell us about your logistics requirements..."
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary">
                  Send Message
                  <Send />
                </button>
              </form>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Branch Offices */}
      <section className="branch-offices">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Our Branch Offices</h2>
            <p>Visit us at any of our locations across India</p>
          </motion.div>

          <div className="branches-grid">
            {branches.map((branch, index) => (
              <motion.div
                key={branch.city}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="branch-card"
              >
                <div className="branch-header">
                  <MapPin />
                  <h3>{branch.city}</h3>
                </div>
                <div className="branch-details">
                  <p><strong>Address:</strong> {branch.address}</p>
                  <p><strong>Phone:</strong> <a href={`tel:${branch.phone}`}>{branch.phone}</a></p>
                  <p><strong>Email:</strong> <a href={`mailto:${branch.email}`}>{branch.email}</a></p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Emergency Contact */}
      <section className="emergency-contact">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="emergency-content"
          >
            <div className="emergency-text">
              <h2>24/7 Emergency Support</h2>
              <p>For urgent shipments and emergency logistics requirements</p>
              <div className="emergency-contact-info">
                <div className="emergency-item">
                  <Phone />
                  <div>
                    <h4>Emergency Hotline</h4>
                    <a href="tel:+918076727536">8076727536</a>
                  </div>
                </div>
                <div className="emergency-item">
                  <Mail />
                  <div>
                    <h4>Emergency Email</h4>
                    <a href="mailto:shipspheretechnologies@gmail.com">
                      shipspheretechnologies@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>
            <div className="emergency-visual">
              <Truck />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="faq-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Frequently Asked Questions</h2>
            <p>Quick answers to common questions</p>
          </motion.div>

          <div className="faq-grid">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="faq-item"
            >
              <h3>What areas do you serve?</h3>
              <p>We provide logistics services across all major cities in India and international destinations.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="faq-item"
            >
              <h3>How quickly can you deliver?</h3>
              <p>Delivery times vary by service type. Express delivery is available for same-day or next-day delivery in select cities.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="faq-item"
            >
              <h3>Do you provide insurance?</h3>
              <p>Yes, all our shipments come with comprehensive insurance coverage for your peace of mind.</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="faq-item"
            >
              <h3>Can I track my shipment?</h3>
              <p>Yes, we provide real-time tracking for all shipments through our online portal and mobile app.</p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact; 