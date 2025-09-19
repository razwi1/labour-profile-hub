import React, { useEffect, useState } from 'react';
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

interface ComicPanelProps {
  images: string[];
  panelClass: string;
}

const ComicPanel: React.FC<ComicPanelProps> = ({ images, panelClass }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [direction, setDirection] = useState<'left' | 'right'>('left');
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    // Random direction and speed for each panel
    setDirection(Math.random() > 0.5 ? 'left' : 'right');
    setSpeed(20 + Math.random() * 30); // Random speed between 20-50px/s

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 3000 + Math.random() * 2000); // Random interval between 3-5 seconds

    return () => clearInterval(interval);
  }, [images.length]);

  return (
    <div className={`relative overflow-hidden ${panelClass}`}>
      <div
        className="flex transition-transform duration-1000 ease-in-out h-full"
        style={{
          transform: `translateX(${direction === 'left' ? '-' : ''}${currentImageIndex * 100}%)`,
          width: `${images.length * 100}%`,
        }}
      >
        {images.map((img, index) => (
          <div
            key={index}
            className="w-full h-full flex-shrink-0"
            style={{ width: `${100 / images.length}%` }}
          >
            <img
              src={img}
              alt={`Construction ${index + 1}`}
              className="w-full h-full object-cover object-center"
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const ComicCollage: React.FC = () => {
  const { theme } = useTheme();

  return (
    <div className="absolute inset-0">
      {/* Base layer with theme color */}
      <div 
        className={`absolute inset-0 transition-colors duration-500 ${
          theme === 'dark' ? 'bg-black' : 'bg-white'
        }`} 
      />
      
      {/* Comic grid collage */}
      <div className="absolute inset-0 p-2">
        <div className="grid grid-cols-4 grid-rows-3 gap-1 h-full">
          {/* Row 1 */}
          <ComicPanel 
            images={[images[0], images[1]]} 
            panelClass="rounded-lg" 
          />
          <ComicPanel 
            images={[images[2], images[3]]} 
            panelClass="rounded-lg" 
          />
          <ComicPanel 
            images={[images[4], images[5]]} 
            panelClass="rounded-lg" 
          />
          <ComicPanel 
            images={[images[6], images[0]]} 
            panelClass="rounded-lg" 
          />
          
          {/* Row 2 */}
          <ComicPanel 
            images={[images[1], images[2], images[3]]} 
            panelClass="col-span-2 rounded-lg" 
          />
          <ComicPanel 
            images={[images[4], images[5]]} 
            panelClass="rounded-lg" 
          />
          <ComicPanel 
            images={[images[6], images[0], images[1]]} 
            panelClass="rounded-lg" 
          />
          
          {/* Row 3 */}
          <ComicPanel 
            images={[images[2], images[3]]} 
            panelClass="rounded-lg" 
          />
          <ComicPanel 
            images={[images[4], images[5], images[6]]} 
            panelClass="col-span-2 rounded-lg" 
          />
          <ComicPanel 
            images={[images[0], images[1]]} 
            panelClass="rounded-lg" 
          />
        </div>
      </div>
    </div>
  );
};

export default ComicCollage;
