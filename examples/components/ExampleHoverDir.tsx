import React from 'react';
import HoverDir from './hover-dir';
import './ExampleHoverDir.css';

const ExampleHoverDir: React.FC = () => {
  const images = [
    {
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image1.jpg',
      alt: 'Image 1',
      title: 'Image 1',
      description: 'Description for image 1'
    },
    {
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image2.jpg',
      alt: 'Image 2',
      title: 'Image 2',
      description: 'Description for image 2'
    },
    {
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image3.jpg',
      alt: 'Image 3',
      title: 'Image 3',
      description: 'Description for image 3'
    },
    {
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image4.jpg',
      alt: 'Image 4',
      title: 'Image 4',
      description: 'Description for image 4'
    },
    {
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image5.jpg',
      alt: 'Image 5',
      title: 'Image 5',
      description: 'Description for image 5'
    },
    {
      src: 'https://s3-us-west-2.amazonaws.com/s.cdpn.io/24345/da_image6.jpg',
      alt: 'Image 6',
      title: 'Image 6',
      description: 'Description for image 6'
    }
  ];

  return (
    <div className="example-hover-dir">
      <h1>Direction Aware Hover</h1>
      <div className="example-container">
        {images.map((image, index) => (
          <HoverDir 
            key={index} 
            className="example-box"
            overlay={
              <div className="overlay-content">
                <h3>{image.title}</h3>
                <p>{image.description}</p>
              </div>
            }
          >
            <img 
              src={image.src} 
              alt={image.alt} 
              className="example-image"
            />
          </HoverDir>
        ))}
      </div>
    </div>
  );
};

export default ExampleHoverDir; 