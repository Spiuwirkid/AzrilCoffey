import React, { useState } from 'react';
import { Mail, Phone, MapPin, MessageSquare } from 'lucide-react';

const Contact = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
  };

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Contact Us</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Have questions or feedback? We'd love to hear from you.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Form */}
          <div className="bg-white rounded-lg shadow-md p-8">
            <h2 className="font-serif text-2xl text-coffee-dark mb-6">Send us a Message</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label htmlFor="name" className="block text-gray-700 mb-2">Name</label>
                <input
                  type="text"
                  id="name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coffee"
                  placeholder="Your name"
                  value={formData.name}
                  onChange={(e) => setFormData({...formData, name: e.target.value})}
                  required
                />
              </div>
              
              <div className="mb-6">
                <label htmlFor="email" className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  id="email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coffee"
                  placeholder="your@email.com"
                  value={formData.email}
                  onChange={(e) => setFormData({...formData, email: e.target.value})}
                  required
                />
              </div>

              <div className="mb-6">
                <label htmlFor="message" className="block text-gray-700 mb-2">Message</label>
                <textarea
                  id="message"
                  rows={5}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-coffee"
                  placeholder="Your message"
                  value={formData.message}
                  onChange={(e) => setFormData({...formData, message: e.target.value})}
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full bg-coffee hover:bg-coffee-dark text-white py-3 rounded-full transition-colors duration-200"
              >
                Send Message
              </button>
            </form>
          </div>

          {/* Contact Information */}
          <div className="space-y-8">
            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="font-serif text-2xl text-coffee-dark mb-6">Contact Information</h2>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <Mail className="w-6 h-6 text-coffee mt-1" />
                  <div>
                    <h3 className="font-medium text-coffee-dark">Email</h3>
                    <p className="text-gray-600">info@azrilcoffey.com</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <Phone className="w-6 h-6 text-coffee mt-1" />
                  <div>
                    <h3 className="font-medium text-coffee-dark">Phone</h3>
                    <p className="text-gray-600">+62 123 456 7890</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <MapPin className="w-6 h-6 text-coffee mt-1" />
                  <div>
                    <h3 className="font-medium text-coffee-dark">Address</h3>
                    <p className="text-gray-600">
                      123 Coffee Street<br />
                      Central Jakarta<br />
                      Indonesia 10110
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-8">
              <h2 className="font-serif text-2xl text-coffee-dark mb-4">Follow Us</h2>
              <p className="text-gray-600 mb-4">Stay connected with us on social media for updates and special offers.</p>
              {/* Add social media icons/links here if needed */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;