import React from 'react';
import { motion } from 'framer-motion';
import { 
  Users, 
  Target, 
  Eye, 
  Award, 
  Globe, 
  Shield, 
  Clock,
  Phone,
  Mail
} from 'lucide-react';

const About: React.FC = () => {
  const milestones = [
    {
      year: '2010',
      title: 'Company Founded',
      description: 'Started as a small transportation company in Mumbai'
    },
    {
      year: '2015',
      title: 'Expansion Phase',
      description: 'Expanded to 10 major cities across India'
    },
    {
      year: '2018',
      title: 'Warehouse Addition',
      description: 'Added warehousing and storage facilities'
    },
    {
      year: '2020',
      title: 'International Services',
      description: 'Launched international shipping and freight services'
    },
    {
      year: '2023',
      title: 'Digital Transformation',
      description: 'Implemented advanced tracking and management systems'
    }
  ];

  const values = [
    {
      icon: <Shield />,
      title: 'Reliability',
      description: 'We deliver on our promises, every time.'
    },
    {
      icon: <Clock />,
      title: 'Punctuality',
      description: 'Time-critical deliveries with guaranteed timelines.'
    },
    {
      icon: <Users />,
      title: 'Customer Focus',
      description: 'Your success is our priority.'
    },
    {
      icon: <Globe />,
      title: 'Innovation',
      description: 'Embracing technology for better service delivery.'
    }
  ];

  const team = [
    {
      name: 'Rajesh Kumar',
      position: 'CEO & Founder',
      experience: '15+ years in logistics',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Priya Sharma',
      position: 'Operations Director',
      experience: '12+ years in supply chain',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Amit Patel',
      position: 'Head of International',
      experience: '10+ years in freight',
      image: '/api/placeholder/150/150'
    },
    {
      name: 'Sneha Reddy',
      position: 'Customer Relations',
      experience: '8+ years in customer service',
      image: '/api/placeholder/150/150'
    }
  ];

  return (
    <div className="about-page">
      {/* Hero Section */}
      <section className="page-hero">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="hero-content"
          >
            <h1>About Us</h1>
            <p>Your trusted partner in logistics for over a decade</p>
          </motion.div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="company-overview">
        <div className="container">
          <div className="overview-content">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="overview-text"
            >
              <h2>Shipshphere Logistics</h2>
              <p>
                Founded in 2010, Shipshphere Logistics has grown from a small 
                transportation company to one of the leading logistics providers in India. 
                We specialize in providing comprehensive logistics solutions including 
                road transportation, warehousing, international shipping, and express delivery.
              </p>
              <p>
                With a fleet of modern vehicles, experienced team, and state-of-the-art 
                technology, we ensure that your cargo reaches its destination safely and 
                on time. Our commitment to quality, reliability, and customer satisfaction 
                has made us the preferred choice for businesses across various industries.
              </p>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="overview-stats"
            >
              <div className="stat-item">
                <div className="stat-number">13+</div>
                <div className="stat-label">Years Experience</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">500+</div>
                <div className="stat-label">Happy Clients</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">50+</div>
                <div className="stat-label">Cities Covered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100+</div>
                <div className="stat-label">Team Members</div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="mission-vision">
        <div className="container">
          <div className="mission-vision-grid">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mission-card"
            >
              <Target className="card-icon" />
              <h3>Our Mission</h3>
              <p>
                To provide reliable, efficient, and cost-effective logistics solutions 
                that enable our clients to focus on their core business while we handle 
                their transportation and storage needs with utmost care and professionalism.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="vision-card"
            >
              <Eye className="card-icon" />
              <h3>Our Vision</h3>
              <p>
                To become the most trusted and preferred logistics partner in India, 
                known for innovation, reliability, and customer satisfaction, while 
                contributing to the growth of our nation's trade and commerce.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Company Values */}
      <section className="company-values">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Our Values</h2>
            <p>The principles that guide everything we do</p>
          </motion.div>

          <div className="values-grid">
            {values.map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="value-card"
              >
                <div className="value-icon">
                  {value.icon}
                </div>
                <h3>{value.title}</h3>
                <p>{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Company Timeline */}
      <section className="company-timeline">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Our Journey</h2>
            <p>Key milestones in our growth story</p>
          </motion.div>

          <div className="timeline">
            {milestones.map((milestone, index) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className={`timeline-item ${index % 2 === 0 ? 'left' : 'right'}`}
              >
                <div className="timeline-content">
                  <div className="timeline-year">{milestone.year}</div>
                  <h3>{milestone.title}</h3>
                  <p>{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Leadership Team */}
      <section className="leadership-team">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="section-header"
          >
            <h2>Leadership Team</h2>
            <p>Meet the experts behind our success</p>
          </motion.div>

          <div className="team-grid">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="team-member"
              >
                <div className="member-image">
                  <Users />
                </div>
                <div className="member-info">
                  <h3>{member.name}</h3>
                  <h4>{member.position}</h4>
                  <p>{member.experience}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Certifications & Awards */}
      <section className="certifications">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="certifications-content"
          >
            <div className="certifications-text">
              <h2>Certifications & Recognition</h2>
              <p>Our commitment to quality and excellence has been recognized through various certifications and awards:</p>
              <ul>
                <li>ISO 9001:2015 Quality Management System</li>
                <li>ISO 14001:2015 Environmental Management</li>
                <li>OHSAS 18001:2007 Occupational Health & Safety</li>
                <li>Best Logistics Provider Award 2023</li>
                <li>Customer Excellence Award 2022</li>
              </ul>
            </div>
            <div className="certifications-visual">
              <Award className="award-icon" />
            </div>
          </motion.div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="about-cta">
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="cta-content"
          >
            <h2>Ready to Partner with Us?</h2>
            <p>Let's discuss how we can help streamline your logistics operations</p>
            <div className="cta-buttons">
              <a href="tel:+918076727536" className="btn btn-primary">
                Call Us
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

export default About; 