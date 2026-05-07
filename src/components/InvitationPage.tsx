import React, { useState, useRef } from 'react';
import { motion, AnimatePresence, type Variants } from 'framer-motion';
import { Music, MapPin, ArrowLeft, X } from 'lucide-react';
import './InvitationPage.css';

interface InvitationPageProps {
  onBack: () => void;
}

/* 照片数据 — 使用 picsum 占位图，可替换为真实照片 */
const PHOTOS = [
  { src: 'https://picsum.photos/seed/birthday1/400/400', alt: '朵朵童年照片 1' },
  { src: 'https://picsum.photos/seed/birthday2/400/400', alt: '朵朵童年照片 2' },
  { src: 'https://picsum.photos/seed/birthday3/400/400', alt: '朵朵童年照片 3' },
  { src: 'https://picsum.photos/seed/birthday4/400/400', alt: '朵朵童年照片 4' },
  { src: 'https://picsum.photos/seed/birthday5/400/400', alt: '朵朵童年照片 5' },
  { src: 'https://picsum.photos/seed/birthday6/400/400', alt: '朵朵童年照片 6' },
];

/* 照片入场动画变体 */
const photoVariants: Variants = {
  hidden: { opacity: 0, y: 30, scale: 0.8 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: 2.0 + i * 0.15,
      duration: 0.5,
      type: 'spring' as const,
      stiffness: 200,
    },
  }),
};

const InvitationPage: React.FC<InvitationPageProps> = ({ onBack }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [selectedPhoto, setSelectedPhoto] = useState<number | null>(null);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(() => {});
      }
      setIsPlaying(!isPlaying);
    }
  };

  const navigateToMap = () => {
    const address = '巴国城六六六宴会大厅';
    const qqmapUrl = `https://apis.map.qq.com/uri/v1/routeplan?type=drive&to=${encodeURIComponent(address)}&referer=myapp`;
    window.open(qqmapUrl, '_blank');
  };

  return (
    <motion.div
      className="invitation-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.8 }}
    >
      {/* 返回按钮 */}
      <motion.button
        className="back-button"
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.5 }}
        onClick={onBack}
      >
        <ArrowLeft size={18} />
        <span>返回</span>
      </motion.button>

      <div className="invitation-card">
        {/* 标题 */}
        <motion.div
          className="card-header"
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6, type: 'spring' as const }}
        >
          <div className="header-emoji">🎉</div>
          <h2>朵朵 10 岁生日宴</h2>
          <div className="header-emoji">🎉</div>
        </motion.div>

        {/* 正文 */}
        <motion.div className="card-body">
          <motion.p
            className="greeting"
            initial={{ x: -50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.0, duration: 0.6 }}
          >
            亲爱的朋友们，
          </motion.p>
          <motion.p
            className="greeting"
            initial={{ x: 50, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
          >
            诚挚邀请您参加朵朵的 <strong>10 岁生日派对</strong>！
          </motion.p>

          {/* 信息卡片 */}
          <motion.div
            className="info-cards"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.5, duration: 0.6 }}
          >
            <div className="info-card date-card">
              <span className="info-icon">📅</span>
              <div className="info-content">
                <span className="info-label">时间</span>
                <span className="info-value">5月2日</span>
              </div>
            </div>
            <div className="info-card location-card">
              <span className="info-icon">📍</span>
              <div className="info-content">
                <span className="info-label">地点</span>
                <span className="info-value">巴国城六六六宴会大厅</span>
              </div>
            </div>
          </motion.div>

          <motion.p
            className="closing"
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.8, duration: 0.6 }}
          >
            期待与您一同分享这份喜悦！🎈
          </motion.p>
        </motion.div>

        {/* 成长照片墙 */}
        <motion.div
          className="photo-wall"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8 }}
        >
          <motion.h3
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.9, duration: 0.5 }}
          >
            💖 成长足迹 💖
          </motion.h3>
          <div className="photo-grid">
            {PHOTOS.map((photo, i) => (
              <motion.div
                key={i}
                className="photo-item"
                custom={i}
                variants={photoVariants}
                initial="hidden"
                animate="visible"
                whileHover={{ y: -6, boxShadow: '0 12px 30px rgba(0,0,0,0.2)' }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setSelectedPhoto(i)}
              >
                <img src={photo.src} alt={photo.alt} loading="lazy" />
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* 底部功能按钮 */}
        <motion.div
          className="footer-actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3.0, duration: 0.6 }}
        >
          <motion.button
            className={`action-button music-button ${isPlaying ? 'playing' : ''}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleMusic}
          >
            <Music size={20} />
            <span>{isPlaying ? '暂停音乐' : '播放音乐'}</span>
            {isPlaying && (
              <span className="music-bars">
                <span /><span /><span />
              </span>
            )}
          </motion.button>
          <motion.button
            className="action-button nav-button"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={navigateToMap}
          >
            <MapPin size={20} />
            <span>一键导航</span>
          </motion.button>
        </motion.div>
      </div>

      {/* 照片大图预览 */}
      <AnimatePresence>
        {selectedPhoto !== null && (
          <motion.div
            className="lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <motion.img
              src={PHOTOS[selectedPhoto].src}
              alt={PHOTOS[selectedPhoto].alt}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: 'spring' as const, stiffness: 300, damping: 25 }}
            />
            <button className="lightbox-close" onClick={() => setSelectedPhoto(null)}>
              <X size={24} />
            </button>
            <div className="lightbox-hint">点击任意处关闭</div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* 背景音乐 */}
      <audio
        ref={audioRef}
        loop
        preload="auto"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      />
    </motion.div>
  );
};

export default InvitationPage;
