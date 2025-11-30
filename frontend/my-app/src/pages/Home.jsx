import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="home">
      <section className="hero">
        <div className="container">
          <h1>Welcome to Miyahi</h1>
          <p>Your Partner in IoT Solutions</p>
          <p>Transform your business with cutting-edge IoT technology</p>
          <div className="hero-actions">
            <Link to="/services" className="btn btn-primary">Our Services</Link>
            <Link to="/products" className="btn btn-secondary">View Products</Link>
          </div>
        </div>
      </section>

      <section className="features">
        <div className="container">
          <h2>Why Choose Miyahi?</h2>
          <div className="features-grid">
            <div className="feature-card">
              <h3>Smart Sensors</h3>
              <p>Advanced sensor technology for precise monitoring</p>
            </div>
            <div className="feature-card">
              <h3>IoT Services</h3>
              <p>Complete IoT solutions tailored to your needs</p>
            </div>
            <div className="feature-card">
              <h3>Smart Meters</h3>
              <p>Efficient energy monitoring and management</p>
            </div>
            <div className="feature-card">
              <h3>24/7 Support</h3>
              <p>Round-the-clock technical assistance</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta">
        <div className="container">
          <h2>Ready to Get Started?</h2>
          <p>Join hundreds of businesses transforming with IoT</p>
          <Link to="/contact" className="btn btn-primary">Contact Us</Link>
        </div>
      </section>
    </div>
  );
}

export default Home;