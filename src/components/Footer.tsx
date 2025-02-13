import React from 'react';
import { Facebook, Instagram, Mail, MapPin, Phone } from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-coffee-dark text-white">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* About Section */}
          <div>
            <h3 className="font-serif text-xl mb-4">AzrilCoffey</h3>
            <p className="text-cream-light text-sm">
              Crafting exceptional coffee experiences since 2024. Join us for a cup of perfection.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-xl mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link to="/menu" className="text-cream-light hover:text-cream transition-colors duration-200">
                  Our Menu
                </Link>
              </li>
              <li>
                <Link to="/blog" className="text-cream-light hover:text-cream transition-colors duration-200">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/gallery" className="text-cream-light hover:text-cream transition-colors duration-200">
                  Gallery
                </Link>
              </li>
              <li>
                <Link to="/contact" className="text-cream-light hover:text-cream transition-colors duration-200">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="font-serif text-xl mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-center space-x-2">
                <MapPin className="h-4 w-4" />
                <span className="text-cream-light">123 Coffee Street, Jakarta</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4" />
                <span className="text-cream-light">+62 123 456 789</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4" />
                <span className="text-cream-light">hello@azrilcoffey.com</span>
              </li>
            </ul>
          </div>

          {/* Social Media */}
          <div>
            <h3 className="font-serif text-xl mb-4">Follow Us</h3>
            <div className="flex space-x-4">
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-light hover:text-cream transition-colors duration-200"
              >
                <Instagram className="h-6 w-6" />
              </a>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                className="text-cream-light hover:text-cream transition-colors duration-200"
              >
                <Facebook className="h-6 w-6" />
              </a>
            </div>
          </div>
        </div>

        <div className="border-t border-coffee mt-8 pt-8 text-center text-cream-light">
          <p>&copy; {new Date().getFullYear()} AzrilCoffey. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;