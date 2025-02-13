import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Coffee, Menu as MenuIcon, X } from 'lucide-react';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  return (
    <nav className="bg-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-20">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <Coffee className="h-8 w-8 text-coffee" />
              <span className="font-serif text-2xl text-coffee-dark">AzrilCoffey</span>
            </Link>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-8">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/menu">Menu</NavLink>
            <NavLink to="/blog">Blog</NavLink>
            <NavLink to="/stories">Stories</NavLink>
            <NavLink to="/gallery">Gallery</NavLink>
            <NavLink to="/location">Location</NavLink>
            <NavLink to="/contact">Contact</NavLink>
          </div>

          {/* Hamburger Button */}
          <div className="md:hidden flex items-center">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-coffee-dark hover:text-coffee w-10 h-10 relative focus:outline-none"
              aria-label="Menu"
            >
              <div className="block w-5 absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <span
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                    isOpen ? 'rotate-45' : '-translate-y-1.5'
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                    isOpen ? 'opacity-0' : ''
                  }`}
                ></span>
                <span
                  className={`block absolute h-0.5 w-5 bg-current transform transition duration-500 ease-in-out ${
                    isOpen ? '-rotate-45' : 'translate-y-1.5'
                  }`}
                ></span>
              </div>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 transition-opacity duration-300 md:hidden ${
          isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={() => setIsOpen(false)}
      ></div>

      {/* Mobile Menu Panel */}
      <div
        className={`fixed top-0 right-0 w-64 h-full bg-white transform transition-transform duration-300 ease-in-out md:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="p-6">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
              <Coffee className="h-6 w-6 text-coffee" />
              <span className="font-serif text-xl text-coffee-dark">AzrilCoffey</span>
            </Link>
          </div>

          <div className="space-y-4">
            <MobileNavLink to="/" onClick={() => setIsOpen(false)}>Home</MobileNavLink>
            <MobileNavLink to="/menu" onClick={() => setIsOpen(false)}>Menu</MobileNavLink>
            <MobileNavLink to="/blog" onClick={() => setIsOpen(false)}>Blog</MobileNavLink>
            <MobileNavLink to="/stories" onClick={() => setIsOpen(false)}>Stories</MobileNavLink>
            <MobileNavLink to="/gallery" onClick={() => setIsOpen(false)}>Gallery</MobileNavLink>
            <MobileNavLink to="/location" onClick={() => setIsOpen(false)}>Location</MobileNavLink>
            <MobileNavLink to="/contact" onClick={() => setIsOpen(false)}>Contact</MobileNavLink>
          </div>
        </div>
      </div>
    </nav>
  );
};

const NavLink = ({ to, children }: { to: string; children: React.ReactNode }) => (
  <Link
    to={to}
    className="text-coffee-dark hover:text-coffee transition-colors duration-200 font-medium"
  >
    {children}
  </Link>
);

const MobileNavLink = ({ to, children, onClick }: { to: string; children: React.ReactNode; onClick: () => void }) => (
  <Link
    to={to}
    className="block py-2 text-coffee-dark hover:text-coffee transition-colors duration-200 font-medium"
    onClick={onClick}
  >
    {children}
  </Link>
);

export default Navbar;