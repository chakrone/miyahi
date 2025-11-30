function About() {
  return (
    <div className="about">
      <section className="page-hero">
        <div className="container">
          <h1>About Miyahi</h1>
          <p>Leading the IoT Revolution</p>
        </div>
      </section>

      <section className="about-content">
        <div className="container">
          <div className="about-section">
            <h2>Our Mission</h2>
            <p>
              At Miyahi, we're dedicated to transforming businesses through innovative
              IoT solutions. Our mission is to make cutting-edge technology accessible
              and practical for organizations of all sizes.
            </p>
          </div>

          <div className="about-section">
            <h2>Our Vision</h2>
            <p>
              We envision a world where every device is connected, every process is
              optimized, and every decision is data-driven. Through our IoT solutions,
              we're building that future today.
            </p>
          </div>

          <div className="about-section">
            <h2>What We Do</h2>
            <ul>
              <li>IoT Consulting and Strategy</li>
              <li>Smart Sensor Solutions</li>
              <li>Energy Management Systems</li>
              <li>Custom IoT Development</li>
              <li>Data Analytics and Monitoring</li>
              <li>24/7 Technical Support</li>
            </ul>
          </div>

          <div className="about-section">
            <h2>Why Choose Us</h2>
            <div className="benefits-grid">
              <div className="benefit">
                <h3>Experience</h3>
                <p>Years of expertise in IoT technology</p>
              </div>
              <div className="benefit">
                <h3>Innovation</h3>
                <p>Cutting-edge solutions for modern challenges</p>
              </div>
              <div className="benefit">
                <h3>Support</h3>
                <p>Dedicated team available 24/7</p>
              </div>
              <div className="benefit">
                <h3>Results</h3>
                <p>Proven track record of success</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default About;