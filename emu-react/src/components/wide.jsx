// ReusableCarousel.jsx
import React from 'react';

const Crthree = ({ images, className = "carousel rounded-box w-64" }) => {
  return (
    <div className={className}>
      {images.map((image, index) => (
        <div key={index} className="carousel-item w-full">
          <img
            src={image.src}
            className="w-full"
            alt={image.alt || `Carousel image ${index + 1}`}
          />
        </div>
      ))}
    </div>
  );
};
//use an imagelist as props /argument  and define the images there 
//for reuse 
export default Crthree;