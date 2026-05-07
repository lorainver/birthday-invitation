import { useEffect, useState, useMemo } from 'react';
import { motion } from 'framer-motion';
import './CoverPage.css';

interface CoverPageProps {
  onOpen: () => void;
}

/* 生成飘落花瓣的配置 */
function usePetals() {
  return useMemo(() => {
    const petals = [];
    const colors = ['#ffb6c1', '#ff69b4', '#ff85a2', '#ffd1dc', '#ffc0cb'];
    for (let i = 0; i < 20; i++) {
      petals.push({
        left: Math.random() * 100,
        size: Math.random() * 12 + 8,
        duration: Math.random() * 6 + 6,
        delay: Math.random() * 8,
        opacity: Math.random() * 0.6 + 0.3,
        rotation: Math.random() * 360,
        swayAmount: Math.random() * 100 + 50,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }
    return petals;
  }, []);
}

/* 生成闪烁星星 */
function useStars() {
  return useMemo(() => {
    const stars = [];
    for (let i = 0; i < 30; i++) {
      stars.push({
        left: Math.random() * 100,
        top: Math.random() * 100,
        size: Math.random() * 4 + 1,
        duration: Math.random() * 3 + 1.5,
        delay: Math.random() * 4,
      });
    }
    return stars;
  }, []);
}

const CoverPage: React.FC<CoverPageProps> = ({ onOpen }) => {
  const petals = usePetals();
  const stars = useStars();
  const [showSubtitle, setShowSubtitle] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowSubtitle(true), 1500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="cover-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8 }}
    >
      {/* 魔法光晕背景 */}
      <div className="magic-background" />

      {/* 飘落花瓣 */}
      <div className="petals-container">
        {petals.map((petal, i) => (
          <div
            key={`petal-${i}`}
            className="falling-petal"
            style={{
              left: `${petal.left}%`,
              width: `${petal.size}px`,
              height: `${petal.size * 1.3}px`,
              backgroundColor: petal.color,
              opacity: petal.opacity,
              animationDuration: `${petal.duration}s`,
              animationDelay: `${petal.delay}s`,
              '--sway': `${petal.swayAmount}px`,
              transform: `rotate(${petal.rotation}deg)`,
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 闪烁星星 */}
      <div className="stars-container">
        {stars.map((star, i) => (
          <div
            key={`star-${i}`}
            className="twinkling-star"
            style={{
              left: `${star.left}%`,
              top: `${star.top}%`,
              width: `${star.size}px`,
              height: `${star.size}px`,
              animationDuration: `${star.duration}s`,
              animationDelay: `${star.delay}s`,
            }}
          />
        ))}
      </div>

      {/* 装饰元素 */}
      <motion.div
        className="decoration-ring ring-1"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="decoration-ring ring-2"
        animate={{ rotate: -360 }}
        transition={{ duration: 30, repeat: Infinity, ease: 'linear' }}
      />

      {/* 标题区域 */}
      <div className="cover-content">
        <motion.div
          className="cover-badge"
          initial={{ scale: 0, rotate: -180 }}
          animate={{ scale: 1, rotate: 0 }}
          transition={{ delay: 0.3, type: 'spring', stiffness: 200 }}
        >
          🎂
        </motion.div>

        <motion.h1
          className="cover-title"
          initial={{ y: -80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.5, duration: 1, type: 'spring' }}
        >
          <span className="title-name">朵朵</span>
          <span className="title-age">10岁</span>
          <span className="title-wish">生日快乐!</span>
        </motion.h1>

        {showSubtitle && (
          <motion.p
            className="cover-subtitle"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            💌 诚挚邀请您参加生日派对 💌
          </motion.p>
        )}

        <motion.button
          className="open-button"
          whileHover={{ scale: 1.08, boxShadow: '0 8px 30px rgba(255,105,180,0.5)' }}
          whileTap={{ scale: 0.92 }}
          initial={{ y: 60, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 2, duration: 0.8, type: 'spring' }}
          onClick={onOpen}
        >
          <motion.span
            className="sparkle sparkle-left"
            animate={{
              rotate: [0, 360],
              scale: [0.8, 1.3, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          >
            ✨
          </motion.span>
          打开邀请函
          <motion.span
            className="sparkle sparkle-right"
            animate={{
              rotate: [360, 0],
              scale: [0.8, 1.3, 0.8],
              opacity: [0.5, 1, 0.5],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
          >
            ✨
          </motion.span>
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CoverPage;
