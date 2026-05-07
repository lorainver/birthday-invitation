import { motion } from 'framer-motion';
import './CoverPage.css';

interface CoverPageProps {
  onOpen: () => void;
}

const CoverPage: React.FC<CoverPageProps> = ({ onOpen }) => {
  return (
    <motion.div
      className="cover-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="magic-background"></div> {/* 魔法背景效果 */}
      <motion.h1
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ delay: 0.5, duration: 1 }}
      >
        朵朵 10 岁生日快乐!
      </motion.h1>
      <motion.button
        className="open-button"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={onOpen}
      >
        <motion.span
          className="sparkle"
          animate={{
            rotate: [0, 360],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        >
          ✨
        </motion.span>
        打开邀请函
        <motion.span
          className="sparkle"
          animate={{
            rotate: [360, 0],
            scale: [0.8, 1.2, 0.8],
            opacity: [0.5, 1, 0.5]
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 0.3
          }}
        >
          ✨
        </motion.span>
      </motion.button>
    </motion.div>
  );
};

export default CoverPage;
