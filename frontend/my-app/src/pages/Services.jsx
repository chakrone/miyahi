function Services() {
  const services = [
    {
      title: 'IoT Consulting',
      description: 'Expert guidance on implementing IoT solutions for your business',
      features: ['Strategy Development', 'Technology Assessment', 'ROI Analysis']
    },
    {
      title: 'Smart Sensors',
      description: 'Advanced sensor solutions for environmental and industrial monitoring',
      features: ['Temperature Monitoring', 'Humidity Control', 'Motion Detection']
    },
    {
      title: 'Smart Meters',
      description: 'Intelligent metering solutions for efficient resource management',
      features: ['Energy Monitoring', 'Water Management', 'Real-time Analytics']
    },
    {
      title: 'Custom Development',
      description: 'Tailored IoT solutions designed specifically for your needs',
      features: ['Custom Hardware', 'Software Integration', 'API Development']
    },
    {
      title: 'Data Analytics',
      description: 'Transform your IoT data into actionable insights',
      features: ['Real-time Dashboards', 'Predictive Analytics', 'Reporting Tools']
    },
    {
      title: 'Support & Maintenance',
      description: 'Comprehensive support to keep your systems running smoothly',
      features: ['24/7 Monitoring', 'Technical Support', 'System Updates']
    }
  ];

  return (
    <div className="services">
      <section className="page-hero">
        <div className="container">
          <h1>Our Services</h1>
          <p>Comprehensive IoT Solutions for Your Business</p>
        </div>
      </section>

      <section className="services-content">
        <div className="container">
          <div className="services-grid">
            {services.map((service, idx) => (
              <div key={idx} className="service-card">
                <h3>{service.title}</h3>
                <p>{service.description}</p>
                <ul>
                  {service.features.map((feature, i) => (
                    <li key={i}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="cta-section">
            <h2>Need a Custom Solution?</h2>
            <p>Contact us to discuss your specific requirements</p>
            <a href="/contact" className="btn btn-primary">Get in Touch</a>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Services;