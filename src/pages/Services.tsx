import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Globe, 
  Clock, 
  Warehouse, 
  Ship, 
  Plane, 
  MapPin,
  Shield,
  FileText,
  Phone,
  Mail
} from 'lucide-react';

const Services: React.FC = () => {
  const services = [
    {
      icon: <Truck />,
      title: 'Road Transportation',
      description: 'Comprehensive road transport solutions across India with modern fleet.',
      features: [
        'Full Truck Load (FTL) & Part Truck Load (PTL)',
        'Temperature-controlled vehicles',
        'Real-time GPS tracking',
        'Experienced drivers and crew',
        'Door-to-door delivery',
        'Insurance coverage'
      ],
      color: '#3B82F6'
    },
    {
      icon: <Warehouse />,
      title: 'Warehousing & Storage',
      description: 'Secure storage facilities with advanced inventory management.',
      features: [
        'Climate-controlled warehouses',
        '24/7 security monitoring',
        'Inventory management system',
        'Pick and pack services',
        'Cross-docking facilities',
        'Bonded warehouse options'
      ],
      color: '#10B981'
    },
    {
      icon: <Globe />,
      title: 'International Shipping',
      description: 'Global logistics solutions with customs clearance expertise.',
      features: [
        'Air freight services',
        'Ocean freight (FCL/LCL)',
        'Customs clearance',
        'Documentation assistance',
        'Door-to-port delivery',
        'Insurance coverage'
      ],
      color: '#F59E0B'
    },
    {
      icon: <Clock />,
      title: 'Express Delivery',
      description: 'Time-critical deliveries with guaranteed timelines.',
      features: [
        'Same-day delivery (select cities)',
        'Next-day delivery',
        'Real-time tracking',
        'Priority handling',
        'Dedicated customer support',
        'Proof of delivery'
      ],
      color: '#EF4444'
    },
    {
      icon: <Ship />,
      title: 'Ocean Freight',
      description: 'Cost-effective sea freight solutions for international trade.',
      features: [
        'Full Container Load (FCL)',
        'Less than Container Load (LCL)',
        'Port-to-port services',
        'Customs documentation',
        'Cargo insurance',
        'Tracking and monitoring'
      ],
      color: '#8B5CF6'
    },
    {
      icon: <Plane />,
      title: 'Air Freight',
      description: 'Fast and reliable air freight services worldwide.',
      features: [
        'Express air freight',
        'Standard air freight',
        'Charter services',
        'Customs clearance',
        'Door-to-door service',
        'Real-time tracking'
      ],
      color: '#06B6D4'
    }
  ];

  const additionalServices = [
    {
      title: 'Supply Chain Management',
      description: 'End-to-end supply chain optimization and management.',
      icon: <FileText />
    },
    {
      title: 'Project Cargo',
      description: 'Specialized handling for oversized and heavy equipment.',
      icon: <Package />
    },
    {
      title: 'E-commerce Logistics',
      description: 'Tailored solutions for online businesses and marketplaces.',
      icon: <Globe />
    },
    {
      title: 'Cold Chain Logistics',
      description: 'Temperature-controlled transportation for perishable goods.',
      icon: <Shield />
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>Our Services</h1>
            <p>Comprehensive logistics solutions tailored to meet your business needs</p>
          </motion.div>
        </div>
      </section>

      {/* Main Services */}
      <section className="main-services">
        <div className="container">
          <div className="services-grid">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="service-detail-card"
                style={{ '--accent-color': service.color } as React.CSSProperties}
              >
                <div className="service-header">
                  <div className="service-icon">
                    {service.icon}
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                </div>
                <div className="service-features">
                  <h4>Key Features:</h4>
                  <ul>
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex}>{feature}</li>
                    ))}
                  </ul>
                </div>
                <div className="service-cta">
                  <a href="tel:+919876543210" className="btn btn-primary">
                    Get Quote
                    <Phone />
                  </a>
                  <a href="mailto:info@ashtavinayaklogistics.com" className="btn btn-outline">
                    Learn More
                    <Mail />
                  </a>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Additional Services */}
      <section className="additional-services">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Specialized Services</h2>
            <p>Additional solutions for specific industry requirements</p>
          </motion.div>

          <div className="additional-services-grid">
            {additionalServices.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="additional-service-card"
              >
                <div className="service-icon">
                  {service.icon}
                </div>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Service Coverage */}
      <section className="coverage-section">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="coverage-content"
          >
            <div className="coverage-text">
              <h2>Service Coverage</h2>
              <p>We provide logistics services across major cities and industrial hubs in India:</p>
              <div className="coverage-cities">
                <div className="city-group">
                  <h4>Metro Cities</h4>
                  <p>Mumbai, Delhi, Bangalore, Chennai, Kolkata, Hyderabad, Pune, Ahmedabad</p>
                </div>
                <div className="city-group">
                  <h4>Industrial Hubs</h4>
                  <p>Surat, Indore, Nagpur, Coimbatore, Ludhiana, Kanpur, Jaipur, Lucknow</p>
                </div>
                <div className="city-group">
                  <h4>Port Cities</h4>
                  <p>Mumbai, Chennai, Kolkata, Kochi, Visakhapatnam, Kandla, Mundra</p>
                </div>
              </div>
            </div>
            <div className="coverage-visual">
              <MapPin className="coverage-icon" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="services-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2>Need a Custom Solution?</h2>
            <p>Contact our team to discuss your specific logistics requirements</p>
            <div className="cta-buttons">
              <a href="tel:+919876543210" className="btn btn-primary">
                Call Us Now
                <Phone />
              </a>
              <a href="mailto:info@ashtavinayaklogistics.com" className="btn btn-secondary">
                Send Email
                <Mail />
              </a>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Services; 