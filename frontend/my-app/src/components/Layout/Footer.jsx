function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>Miyahi</h3>
            <p>IoT Solutions for a Connected World</p>
          </div>
          
          <div className="footer-section">
            <h4>Quick Links</h4>
            <ul>
              <li><a href="/about">About Us</a></li>
              <li><a href="/services">Services</a></li>
              <li><a href="/products">Products</a></li>
              <li><a href="/contact">Contact</a></li>
            </ul>
          </div>
          
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: [email protected]</p>
            <p>Phone: +1 234 567 890</p>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>&copy; 2024 Miyahi. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;