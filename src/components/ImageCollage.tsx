import React, { useState, useEffect } from 'react';
import { useTheme } from '@/contexts/ThemeContext';

// Import all images from the login folder
import img1 from '@/assets/login/assets_task_01k5hbpkvvee088bsrs0x5e5x2_1758298173_img_0.webp';
import img2 from '@/assets/login/assets_task_01k5hbpkvvee088bsrs0x5e5x2_1758298173_img_1.webp';
import img3 from '@/assets/login/assets_task_01k5hbzax9fbmbjj17ehk24py0_1758298458_img_0.webp';
import img4 from '@/assets/login/assets_task_01k5hbzax9fbmbjj17ehk24py0_1758298458_img_1.webp';
import img5 from '@/assets/login/assets_task_01k5hc4t23ffese6yha8d1k07x_1758298641_img_0.webp';
import img6 from '@/assets/login/assets_task_01k5hcfat0e2rvbq2mg2ch5qk7_1758299024_img_0.webp';
import img7 from '@/assets/login/assets_task_01k5hcfat0e2rvbq2mg2ch5qk7_1758299024_img_1.webp';

const images = [img1, img2, img3, img4, img5, img6, img7];

interface ImageCollageProps {
  className?: string;
}

const ImageCollage: React.FC<ImageCollageProps> = ({ className = '' }) => {
  const { theme } = useTheme();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Fade in animation
    const timer = setTimeout(() => setIsVisible(true), 100);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Auto-rotate images every 4 seconds
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className={`absolute inset-0 overflow-hidden ${className}`}>
      {/* Background overlay based on theme */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-black/60' : 'bg-white/60'
        }`} 
      />
      
      {/* Static collage background */}
      <div 
        className={`absolute inset-0 transition-opacity duration-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}
      >
        {/* Grid of static images */}
        <div className="grid grid-cols-3 gap-4 h-full p-8">
          {images.map((img, index) => (
            <div
              key={`static-${index}`}
              className="relative overflow-hidden rounded-lg"
              style={{
                gridRow: index % 2 === 0 ? 'span 2' : 'span 1',
                transform: `rotate(${(index - 3) * 2}deg)`,
                zIndex: 1
              }}
            >
              <img
                src={img}
                alt={`Construction ${index + 1}`}
                className="w-full h-full object-cover opacity-70 hover:opacity-90 transition-opacity duration-300"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Sliding individual images */}
      <div className="absolute inset-0 z-10">
        {images.map((img, index) => (
          <div
            key={`sliding-${index}`}
            className={`absolute inset-0 transition-all duration-1000 ${
              index === currentImageIndex 
                ? 'opacity-100 translate-x-0' 
                : index < currentImageIndex 
                  ? 'opacity-0 -translate-x-full' 
                  : 'opacity-0 translate-x-full'
            }`}
          >
            <div className="flex items-center justify-center h-full">
              <div className="relative w-80 h-80 rounded-2xl overflow-hidden shadow-2xl">
                <img
                  src={img}
                  alt={`Sliding construction ${index + 1}`}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImageCollage;

