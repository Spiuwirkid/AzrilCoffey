import React from 'react';
import { Heart } from 'lucide-react';

const Stories = () => {
  const stories = [
    {
      id: 1,
      title: "From Bean to Dream",
      content: "How AzrilCoffey started from a small cart to becoming Jakarta's favorite coffee spot.",
      image: "https://images.unsplash.com/photo-1442512595331-e89e73853f31?auto=format&fit=crop&q=80",
      likes: 245
    },
    {
      id: 2,
      title: "Our Coffee Journey",
      content: "Exploring the world's finest coffee regions to bring you the perfect cup.",
      image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?auto=format&fit=crop&q=80",
      likes: 189
    },
    {
      id: 3,
      title: "Community & Coffee",
      content: "Building connections one cup at a time - our community impact story.",
      image: "https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?auto=format&fit=crop&q=80",
      likes: 312
    }
  ];

  return (
    <div className="py-16 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-serif text-coffee-dark text-center mb-4">Our Stories</h1>
        <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
          Discover the stories behind AzrilCoffey, our passion for coffee, and the community we serve.
        </p>

        <div className="grid md:grid-cols-3 gap-8">
          {stories.map((story) => (
            <div key={story.id} className="group relative overflow-hidden rounded-lg">
              <div className="aspect-w-16 aspect-h-9">
                <img
                  src={story.image}
                  alt={story.title}
                  className="w-full h-[300px] object-cover group-hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent flex flex-col justify-end p-6 text-white">
                <h3 className="font-serif text-2xl mb-2">{story.title}</h3>
                <p className="text-cream-light mb-4">{story.content}</p>
                <div className="flex items-center space-x-2">
                  <Heart className="h-5 w-5 text-red-500" />
                  <span className="text-cream-light">{story.likes} loves</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-16 grid md:grid-cols-2 gap-8 items-center">
          <div>
            <h2 className="font-serif text-3xl text-coffee-dark mb-4">Our Mission</h2>
            <p className="text-gray-600 mb-6">
              At AzrilCoffey, we believe in more than just serving coffee. We're creating a space where
              stories are shared, friendships are formed, and memories are made. Our mission is to
              provide an exceptional coffee experience while fostering a sense of community and connection.
            </p>
            <button className="bg-coffee hover:bg-coffee-dark text-white px-8 py-3 rounded-full transition-colors duration-200">
              Learn More About Us
            </button>
          </div>
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&q=80"
              alt="Coffee shop interior"
              className="rounded-lg shadow-xl"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Stories;