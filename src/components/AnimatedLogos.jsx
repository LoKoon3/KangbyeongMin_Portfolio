import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const AnimatedLogos = ({ icons }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % icons.length);
    }, 2500); // 2.5초마다 전환

    return () => clearInterval(interval);
  }, [icons.length]);

  return (
    <div className="relative w-32 h-32 flex items-center justify-center mb-8">
      <AnimatePresence mode="wait">
        <motion.img
          key={currentIndex}
          src={icons[currentIndex]}
          alt={`logo-${currentIndex}`}
          className="w-24 h-24 object-contain absolute"
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -50 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
        />
      </AnimatePresence>
    </div>
  );
};

export default AnimatedLogos;
