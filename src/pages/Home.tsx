import React from 'react';
import { Coffee, Clock, MapPin, Star } from 'lucide-react';

const Home = () => {
  return (
    <div className="space-y-20">
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center">
        <div
          className="absolute inset-0 bg-cover bg-center z-0"
          style={{
            backgroundImage: 'url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80")',
          }}
        >
          <div className="absolute inset-0 bg-black bg-opacity-50"></div>
        </div>
        <div className="relative z-10 text-center text-white px-4">
          <h1 className="font-serif text-5xl md:text-7xl mb-4">Welcome to AzrilCoffey</h1>
          <p className="text-xl md:text-2xl mb-8">Where Every Cup Tells a Story</p>
          <a
            href="#about"
            className="bg-coffee text-white px-8 py-3 rounded-full hover:bg-coffee-dark transition-colors duration-200"
          >
            Discover More
          </a>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="font-serif text-4xl text-coffee-dark mb-6">Our Story</h2>
            <p className="text-lg text-gray-700 mb-6">
              Founded in 2024, AzrilCoffey brings together the finest coffee beans and traditional
              brewing methods to create an unforgettable coffee experience. Our passion for coffee
              is matched only by our commitment to quality and service.
            </p>
            <div className="grid grid-cols-2 gap-6">
              <Feature
                icon={<Coffee className="h-8 w-8" />}
                title="Premium Beans"
                description="Sourced from the world's finest coffee regions"
              />
              <Feature
                icon={<Star className="h-8 w-8" />}
                title="Expert Baristas"
                description="Crafting the perfect cup, every time"
              />
              <Feature
                icon={<Clock className="h-8 w-8" />}
                title="Fresh Roasts"
                description="Daily roasted beans for maximum flavor"
              />
              <Feature
                icon={<MapPin className="h-8 w-8" />}
                title="Cozy Space"
                description="A perfect blend of modern and vintage ambiance"
              />
            </div>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80"
              alt="Coffee brewing"
              className="rounded-lg shadow-xl"
            />
            <div className="absolute -bottom-6 -left-6 bg-coffee p-6 rounded-lg text-white">
              <p className="font-serif text-2xl">10+ Years</p>
              <p>of Coffee Excellence</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products Preview */}
      <section className="bg-cream py-16">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="font-serif text-4xl text-coffee-dark text-center mb-12">Featured Drinks</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <ProductCard
              image="https://images.unsplash.com/photo-1534778101976-62847782c213?auto=format&fit=crop&q=80"
              name="Classic Cappuccino"
              price="4.50"
              description="Rich espresso topped with creamy milk foam"
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?auto=format&fit=crop&q=80"
              name="Caramel Macchiato"
              price="5.00"
              description="Espresso marked with vanilla and caramel"
            />
            <ProductCard
              image="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80"
              name="Pour Over"
              price="3.50"
              description="Hand-crafted, single-origin coffee"
            />
          </div>
        </div>
      </section>

      {/* Location Section */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Visit Us</h2>
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
                    <div className="flex items-start space-x-3 text-gray-600">
                      <Clock className="h-5 w-5 mt-1 text-coffee" />
                      <div>
                        <p className="font-medium">Monday - Friday</p>
                        <p>7:00 AM - 10:00 PM</p>
                      </div>
                    </div>
                    <div className="flex items-start space-x-3 text-gray-600">
                      <Clock className="h-5 w-5 mt-1 text-coffee" />
                      <div>
                        <p className="font-medium">Weekend</p>
                        <p>8:00 AM - 11:00 PM</p>
                      </div>
                    </div>
                  </div>
                </div>

                <a
                  href="/location"
                  className="inline-block bg-coffee hover:bg-coffee-dark text-white px-6 py-2 rounded-full transition-colors duration-200"
                >
                  View Full Details
                </a>
              </div>
            </div>

            <div className="h-[400px] rounded-lg overflow-hidden shadow-md">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126915.06709645538!2d106.7891356!3d-6.2297465!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f3e945e34b9d%3A0x5371bf0fdad786a2!2sCentral%20Jakarta%2C%20Jakarta!5e0!3m2!1sen!2sid!4v1710486000000!5m2!1sen!2sid"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="AzrilCoffey Location"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const Feature = ({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) => (
  <div className="flex flex-col items-center text-center">
    <div className="text-coffee mb-2">{icon}</div>
    <h3 className="font-medium text-lg mb-1">{title}</h3>
    <p className="text-gray-600 text-sm">{description}</p>
  </div>
);

const ProductCard = ({ image, name, price, description }: { image: string; name: string; price: string; description: string }) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-200 hover:-translate-y-1">
    <img src={image} alt={name} className="w-full h-48 object-cover" />
    <div className="p-6">
      <h3 className="font-serif text-xl text-coffee-dark mb-2">{name}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <div className="flex justify-between items-center">
        <span className="text-coffee-dark font-medium">${price}</span>
        <button className="bg-coffee text-white px-4 py-2 rounded-full hover:bg-coffee-dark transition-colors duration-200">
          Order Now
        </button>
      </div>
    </div>
  </div>
);

export default Home;