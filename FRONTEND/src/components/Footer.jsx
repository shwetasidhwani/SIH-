import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        <div className="footer-grid">
          {/* Column 1 */}
          <div className="footer-column">
            <h4>Download</h4>
            <ul>
              <li><a href="#!">Windows app</a></li>
              <li><a href="#!">Mac app</a></li>
              <li><a href="#!">Linux app</a></li>
              <li><a href="#!">Desktop app</a></li>
            </ul>
          </div>
          {/* Column 2 */}
          <div className="footer-column">
            <h4>Products</h4>
            <ul>
              <li><a href="#!">Web</a></li>
              <li><a href="#!">App</a></li>
              <li><a href="#!">Software</a></li>
              <li><a href="#!">Ecommerce</a></li>
            </ul>
          </div>
          {/* Column 3 */}
          <div className="footer-column">
            <h4>Services</h4>
            <ul>
              <li><a href="#!">Design</a></li>
              <li><a href="#!">Development</a></li>
            </ul>
          </div>
          {/* Column 4 */}
          <div className="footer-column">
            <h4>Company</h4>
            <ul>
              <li><a href="#!">Terms & conditions</a></li>
              <li><a href="#!">Privacy Policy</a></li>
            </ul>
          </div>
        </div>

        {/* Social Media and Subscribe */}
        <div className="footer-subscribe">
          <div className="footer-socials">
            <FontAwesomeIcon icon={faFacebook} className='footer-socials-icons'/>
            <FontAwesomeIcon icon={faInstagram} className='footer-socials-icons'/>
            <FontAwesomeIcon icon={faTwitter} className='footer-socials-icons'/>
          </div>
          <div className="footer-input">
            <input type="email" placeholder="Enter email address" />
            <button>Subscribe</button>
          </div>
        </div>

        {/* Horizontal Line */}
        <hr className="footer-line" />

        {/* Rights Reserved Section */}
        <div className="footer-rights">
          <p>&copy;  2024 StationSathi  |    All rights reserved </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
