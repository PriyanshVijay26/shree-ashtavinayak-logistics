import React from 'react';
import { motion } from 'framer-motion';
import { 
  Truck, 
  Package, 
  Globe, 
  Clock, 
  Warehouse, 
  Plane, 
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
      title: 'Local and National Shipping',
      description: 'Comprehensive shipping solutions across India with door-to-door logistics services.',
      features: [
        'B2B and B2C orders',
        'Door-to-door delivery',
        'Local city delivery',
        'Interstate transportation',
        'Real-time tracking',
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
    },
    {
      title: 'Appointment Deliveries',
      description: 'Delivery your goods as per your preferred time.',
      icon: <Clock />
    }
  ];

  return (
    <div className="services-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <div className="services-hero-content">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="hero-text-content"
            >
              <h1>Our Services</h1>
              <p>Comprehensive logistics solutions tailored to meet your business needs</p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="services-hero-image"
            >
              <img 
                src="/images/logistics-truck.png" 
                alt="Logistics Truck" 
                className="truck-hero-image"
                onError={(e) => {
                  // Fallback to truck icon if image not found
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  target.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="truck-icon-fallback hidden">
                <Truck className="large-truck-icon" />
              </div>
            </motion.div>
          </div>
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
                  <a href="tel:+919773575251" className="btn btn-primary">
                    Get Quote
                    <Phone />
                  </a>
                  <a href="mailto:shipspheretechnologies@gmail.com" className="btn btn-outline">
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
              <div className="map-container">
                <div className="india-map-visual">
                  {/* India Map Background */}
                  <div className="india-outline">
                    <svg viewBox="0 0 800 900" className="india-svg">
                      {/* Main India outline - Accurate shape */}
                      <path 
                        d="M200 150 C220 130 250 120 280 125 C310 115 340 110 370 120 C400 110 430 115 460 125 C490 120 520 125 550 135 C580 130 610 140 630 155 C650 170 660 190 655 210 C660 230 665 250 660 270 C665 290 670 310 665 330 C670 350 675 370 670 390 C675 410 680 430 675 450 C680 470 685 490 680 510 C685 530 690 550 685 570 C690 590 695 610 690 630 C695 650 700 670 695 690 C700 710 705 730 700 750 C695 770 685 785 670 795 C655 805 635 810 615 805 C595 810 575 815 555 810 C535 815 515 820 495 815 C475 820 455 825 435 820 C415 825 395 830 375 825 C355 830 335 835 315 830 C295 835 275 840 255 835 C235 840 215 835 200 825 C185 815 175 800 170 780 C165 760 170 740 175 720 C170 700 165 680 170 660 C165 640 160 620 165 600 C160 580 155 560 160 540 C155 520 150 500 155 480 C150 460 145 440 150 420 C145 400 140 380 145 360 C140 340 135 320 140 300 C135 280 130 260 135 240 C130 220 135 200 140 180 C145 160 155 145 170 135 C185 125 200 130 200 150 Z"
                        fill="#e6f3ff"
                        stroke="#0369a1"
                        strokeWidth="3"
                        className="india-border"
                      />
                      
                      {/* Kashmir/Jammu region */}
                      <path 
                        d="M280 100 C300 85 320 80 340 85 C360 80 380 85 400 95 C420 90 440 95 460 105 L455 120 C450 130 440 135 430 130 C420 135 410 130 400 125 C390 130 380 125 370 120 C360 125 350 120 340 115 C330 120 320 115 310 110 C300 115 290 110 280 105 Z"
                        fill="#e6f3ff"
                        stroke="#0369a1"
                        strokeWidth="2"
                        className="india-border"
                      />
                      
                      {/* Northeast states (Assam, Meghalaya, etc.) */}
                      <path 
                        d="M650 250 C670 240 690 245 710 255 C730 265 740 285 735 305 C730 325 720 340 705 345 C690 350 675 345 665 330 C655 315 650 300 650 285 C645 270 650 255 650 250 Z"
                        fill="#e6f3ff"
                        stroke="#0369a1"
                        strokeWidth="2"
                        className="india-border"
                      />
                      
                      {/* Southern tip (Tamil Nadu) */}
                      <path 
                        d="M420 780 C430 790 440 800 445 815 C450 830 445 845 435 855 C425 865 415 860 410 845 C405 830 410 815 415 800 C415 790 417 785 420 780 Z"
                        fill="#e6f3ff"
                        stroke="#0369a1"
                        strokeWidth="2"
                        className="india-border"
                      />
                      
                      {/* Gujarat peninsula */}
                      <path 
                        d="M150 350 C140 340 130 330 125 315 C120 300 125 285 135 275 C145 265 155 270 160 285 C165 300 160 315 155 330 C155 340 152 345 150 350 Z"
                        fill="#e6f3ff"
                        stroke="#0369a1"
                        strokeWidth="2"
                        className="india-border"
                      />
                      
                      {/* Western coastline detail */}
                      <path 
                        d="M180 600 C170 590 165 575 170 560 C175 545 185 535 195 540 C205 545 210 560 205 575 C200 590 190 600 185 605 C183 603 181 601 180 600 Z"
                        fill="#e6f3ff"
                        stroke="#0369a1"
                        strokeWidth="2"
                        className="india-border"
                      />
                      
                      {/* Sri Lanka */}
                      <ellipse cx="450" cy="880" rx="25" ry="35" fill="#f0f8ff" stroke="#0369a1" strokeWidth="1"/>
                      
                      {/* Andaman & Nicobar Islands */}
                      <circle cx="750" cy="500" r="4" fill="#e6f3ff" stroke="#0369a1" strokeWidth="1"/>
                      <circle cx="755" cy="520" r="3" fill="#e6f3ff" stroke="#0369a1" strokeWidth="1"/>
                      <circle cx="750" cy="540" r="3" fill="#e6f3ff" stroke="#0369a1" strokeWidth="1"/>
                      <circle cx="748" cy="560" r="2.5" fill="#e6f3ff" stroke="#0369a1" strokeWidth="1"/>
                      
                      {/* Lakshadweep Islands */}
                      <circle cx="80" cy="550" r="2" fill="#e6f3ff" stroke="#0369a1" strokeWidth="1"/>
                      <circle cx="75" cy="570" r="1.5" fill="#e6f3ff" stroke="#0369a1" strokeWidth="1"/>
                      <circle cx="78" cy="590" r="1.5" fill="#e6f3ff" stroke="#0369a1" strokeWidth="1"/>
                    </svg>
                    
                    {/* City Markers */}
                    <div className="city-markers">
                      {/* Metro Cities */}
                      <div className="city-marker metro" style={{top: '28%', left: '40%'}} title="Delhi">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Delhi</span>
                      </div>
                      <div className="city-marker metro" style={{top: '48%', left: '22%'}} title="Mumbai">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Mumbai</span>
                      </div>
                      <div className="city-marker metro" style={{top: '75%', left: '55%'}} title="Bangalore">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Bangalore</span>
                      </div>
                      <div className="city-marker metro" style={{top: '78%', left: '65%'}} title="Chennai">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Chennai</span>
                      </div>
                      <div className="city-marker metro" style={{top: '42%', left: '75%'}} title="Kolkata">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Kolkata</span>
                      </div>
                      <div className="city-marker metro" style={{top: '58%', left: '62%'}} title="Hyderabad">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Hyderabad</span>
                      </div>
                      <div className="city-marker metro" style={{top: '50%', left: '58%'}} title="Pune">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Pune</span>
                      </div>
                      <div className="city-marker metro" style={{top: '38%', left: '28%'}} title="Ahmedabad">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Ahmedabad</span>
                      </div>
                      
                      {/* Industrial Hubs */}
                      <div className="city-marker industrial" style={{top: '42%', left: '32%'}} title="Surat">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Surat</span>
                      </div>
                      <div className="city-marker industrial" style={{top: '48%', left: '55%'}} title="Indore">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Indore</span>
                      </div>
                      <div className="city-marker industrial" style={{top: '45%', left: '65%'}} title="Nagpur">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Nagpur</span>
                      </div>
                      <div className="city-marker industrial" style={{top: '35%', left: '52%'}} title="Kanpur">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Kanpur</span>
                      </div>
                      <div className="city-marker industrial" style={{top: '32%', left: '35%'}} title="Jaipur">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Jaipur</span>
                      </div>
                      <div className="city-marker industrial" style={{top: '35%', left: '60%'}} title="Lucknow">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Lucknow</span>
                      </div>
                      <div className="city-marker industrial" style={{top: '68%', left: '48%'}} title="Coimbatore">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Coimbatore</span>
                      </div>
                      <div className="city-marker industrial" style={{top: '38%', left: '45%'}} title="Ludhiana">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Ludhiana</span>
                      </div>
                      
                      {/* Port Cities */}
                      <div className="city-marker port" style={{top: '82%', left: '52%'}} title="Kochi">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Kochi</span>
                      </div>
                      <div className="city-marker port" style={{top: '28%', left: '18%'}} title="Kandla">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Kandla</span>
                      </div>
                      <div className="city-marker port" style={{top: '55%', left: '80%'}} title="Visakhapatnam">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Vizag</span>
                      </div>
                      <div className="city-marker port" style={{top: '25%', left: '15%'}} title="Mundra">
                        <span className="marker-dot"></span>
                        <span className="marker-label">Mundra</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Moved legend below the map */}
              <div className="map-legend-bottom">
                <h4>📍 Service Network Coverage</h4>
                <div className="legend-items-horizontal">
                  <div className="legend-item">
                    <span className="legend-dot metro"></span>
                    <span>Metro Cities (8)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot industrial"></span>
                    <span>Industrial Hubs (8)</span>
                  </div>
                  <div className="legend-item">
                    <span className="legend-dot port"></span>
                    <span>Port Cities (7)</span>
                  </div>
                </div>
                <div className="coverage-summary">
                  <span>🚚 Pan-India Logistics Network</span>
                </div>
              </div>
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
              <a href="tel:+919773575251" className="btn btn-primary">
                Call: +91 9773575251
                <Phone />
              </a>
              <a href="tel:+917011279296" className="btn btn-primary">
                Call: +91 7011279296
                <Phone />
              </a>
              <a href="mailto:shipspheretechnologies@gmail.com" className="btn btn-secondary">
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