import React from 'react';
import './AboutPage.css';

const AboutPage = () => {
  return (
    <div className="about-page">
      <div className="about-container">
        <div className="about-header">
          <h1>About Expert Session Booking System</h1>
          <p className="about-subtitle">Connecting Experts with Clients Through Seamless Booking</p>
        </div>

        <div className="about-content">
          <section className="about-section">
            <h2>Our Mission</h2>
            <p>
              We believe that everyone deserves access to expert knowledge and guidance. Our platform bridges the gap between skilled professionals and individuals seeking specialized advice, making it easy to book one-on-one sessions with experts across various fields.
            </p>
          </section>

          <section className="about-section">
            <h2>What We Offer</h2>
            <div className="features-grid">
              <div className="feature-card">
                <div className="feature-icon">👥</div>
                <h3>76+ Verified Experts</h3>
                <p>Professionals across Healthcare, Technology, Finance, Education, Business, and more</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">⏰</div>
                <h3>Real-time Booking</h3>
                <p>See available time slots and book instantly with real-time updates</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">🔒</div>
                <h3>Secure Platform</h3>
                <p>Safe authentication and protected booking system</p>
              </div>
              <div className="feature-card">
                <div className="feature-icon">💬</div>
                <h3>Live Updates</h3>
                <p>Real-time notifications when slots are booked by others</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <div className="step-content">
                  <h3>Sign Up</h3>
                  <p>Create your account to get started</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">2</div>
                <div className="step-content">
                  <h3>Browse Experts</h3>
                  <p>Search and filter through our expert directory</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">3</div>
                <div className="step-content">
                  <h3>Book Session</h3>
                  <p>Select your preferred time slot and book instantly</p>
                </div>
              </div>
              <div className="step">
                <div className="step-number">4</div>
                <div className="step-content">
                  <h3>Connect</h3>
                  <p>Attend your session and gain valuable insights</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Expert Categories</h2>
            <div className="categories-showcase">
              <div className="category-item">
                <span className="category-emoji">🏥</span>
                <div className="category-info">
                  <h3>Healthcare</h3>
                  <p>26 medical professionals</p>
                </div>
              </div>
              <div className="category-item">
                <span className="category-emoji">💻</span>
                <div className="category-info">
                  <h3>Technology</h3>
                  <p>10 tech experts</p>
                </div>
              </div>
              <div className="category-item">
                <span className="category-emoji">💰</span>
                <div className="category-info">
                  <h3>Finance</h3>
                  <p>10 financial advisors</p>
                </div>
              </div>
              <div className="category-item">
                <span className="category-emoji">🎓</span>
                <div className="category-info">
                  <h3>Education</h3>
                  <p>10 educators</p>
                </div>
              </div>
              <div className="category-item">
                <span className="category-emoji">💼</span>
                <div className="category-info">
                  <h3>Business</h3>
                  <p>10 business consultants</p>
                </div>
              </div>
              <div className="category-item">
                <span className="category-emoji">🌈</span>
                <div className="category-info">
                  <h3>Other</h3>
                  <p>10 specialized professionals</p>
                </div>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Why Choose Us?</h2>
            <div className="benefits-list">
              <div className="benefit-item">
                <h3>🎯 Quality Experts</h3>
                <p>All our experts are verified and have proven experience in their fields</p>
              </div>
              <div className="benefit-item">
                <h3>⚡ Instant Booking</h3>
                <p>No waiting - book available slots immediately with real-time confirmation</p>
              </div>
              <div className="benefit-item">
                <h3>🛡️ Secure Platform</h3>
                <p>Your data and bookings are protected with enterprise-grade security</p>
              </div>
              <div className="benefit-item">
                <h3>📱 User-Friendly</h3>
                <p>Intuitive interface designed for seamless user experience</p>
              </div>
            </div>
          </section>

          <section className="about-section">
            <h2>Contact Us</h2>
            <div className="contact-info">
              <p>Have questions or feedback? We'd love to hear from you!</p>
              <div className="contact-methods">
                <div className="contact-method">
                  <span className="contact-icon">📧</span>
                  <span>support@expertbooking.com</span>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">📞</span>
                  <span>+1 (555) 123-4567</span>
                </div>
                <div className="contact-method">
                  <span className="contact-icon">🌐</span>
                  <span>www.expertbooking.com</span>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
