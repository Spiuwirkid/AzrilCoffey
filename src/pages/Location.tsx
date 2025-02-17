import React from 'react';
import { MapPin, Clock, Phone, Mail } from 'lucide-react';

const Location = () => {
  const openingHours = [
    { day: 'Monday - Friday', hours: '7:00 AM - 10:00 PM' },
    { day: 'Saturday', hours: '8:00 AM - 11:00 PM' },
    { day: 'Sunday', hours: '8:00 AM - 9:00 PM' }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Visit Us</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Come experience the perfect blend of modern comfort and vintage charm at our coffee shop.
        </p>

        <div className="grid md:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <div className="bg-white rounded-lg shadow-md p-8">
              <div className="mb-8">
                <h2 className="font-serif text-2xl text-coffee-dark mb-4">Our Location</h2>
                <div className="flex items-start space-x-3 text-gray-600">
                  <MapPin className="h-5 w-5 mt-1 text-coffee" />
                  <p>
                    123 Coffee Street<br />
                    Central Jakarta<br />
                    Indonesia 10110
                  </p>
                </div>
              </div>

              <div className="mb-8">
                <h2 className="font-serif text-2xl text-coffee-dark mb-4">Opening Hours</h2>
                <div className="space-y-2">
                  {openingHours.map((schedule, index) => (
                    <div key={index} className="flex items-start space-x-3 text-gray-600">
                      <Clock className="h-5 w-5 mt-1 text-coffee" />
                      <div>
                        <p className="font-medium">{schedule.day}</p>
                        <p>{schedule.hours}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Map Section - Using Local Static Image */}
          <div className="h-[400px] rounded-lg shadow-md overflow-hidden bg-coffee-light">
            <div className="w-full h-full relative p-4">
              <div className="absolute inset-0 bg-coffee-dark/5 backdrop-blur-sm"></div>
              <div className="relative h-full flex flex-col items-center justify-center text-center p-6">
                <MapPin className="h-12 w-12 text-coffee mb-4" />
                <h3 className="text-xl font-serif text-coffee-dark mb-2">Visit Our Coffee Shop</h3>
                <p className="text-gray-600">
                  123 Coffee Street, Central Jakarta<br />
                  Indonesia 10110
                </p>
                <a 
                  href="https://maps.google.com/?q=Central+Jakarta+Indonesia" 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 px-6 py-2 bg-coffee text-white rounded-full hover:bg-coffee-dark transition-colors"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Location Preview Section */}
        <section className="py-16">
          <div className="max-w-7xl mx-auto px-4">
            <h2 className="font-serif text-4xl text-coffee-dark text-center mb-12">Find Us</h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3 mb-4">
                  <MapPin className="h-6 w-6 text-coffee" />
                  <h3 className="font-serif text-xl text-coffee-dark">Address</h3>
                </div>
                <p className="text-gray-600">
                  123 Coffee Street<br />
                  Central Jakarta<br />
                  Indonesia 10110
                </p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3 mb-4">
                  <Phone className="h-6 w-6 text-coffee" />
                  <h3 className="font-serif text-xl text-coffee-dark">Phone</h3>
                </div>
                <p className="text-gray-600">+62 123 456 789</p>
              </div>

              <div className="bg-white p-6 rounded-lg shadow-md">
                <div className="flex items-center space-x-3 mb-4">
                  <Mail className="h-6 w-6 text-coffee" />
                  <h3 className="font-serif text-xl text-coffee-dark">Email</h3>
                </div>
                <p className="text-gray-600">hello@azrilcoffey.com</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Location;