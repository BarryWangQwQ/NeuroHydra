import React from 'react';

const FullScreenImageSlide = ({ imagePath = '/images/slide-image.png' }) => {
  return (
    <div 
      className="min-h-screen w-full bg-white flex items-center justify-center relative overflow-hidden"
      style={{ fontFamily: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, sans-serif" }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@300;400;500;600;700;800;900&display=swap');
        
        .fullscreen-image {
          width: 100vw;
          height: 100vh;
          object-fit: contain;
          object-position: center;
          display: block;
        }
      `}</style>
      
      <img 
        src={imagePath} 
        alt="Full screen slide"
        className="fullscreen-image"
        onError={(e) => {
          console.error('Failed to load image:', imagePath);
          e.target.style.display = 'none';
        }}
      />
    </div>
  );
};

export default FullScreenImageSlide;
