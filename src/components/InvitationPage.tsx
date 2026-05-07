import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Music, MapPin } from 'lucide-react'; // 引入图标
import './InvitationPage.css';

const InvitationPage: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = React.useRef<HTMLAudioElement>(null);

  // 音乐播放/暂停逻辑
  const toggleMusic = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  // 地图导航逻辑
  const navigateToMap = () => {
    const address = "巴国城六六六宴会大厅";
    const mapUrl = `https://uri.amap.com/search?keyword=${encodeURIComponent(address)}&callnative=1`; // 高德地图搜索URL
    window.open(mapUrl, '_blank');
  };

  return (
    <motion.div
      className="invitation-page"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, delay: 0.5 }}
    >
      <div className="invitation-card">
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.8, duration: 0.6 }}
        >
          🎉 朵朵 10 岁生日宴 🎉
        </motion.h2>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1, duration: 0.6 }}
        >
          亲爱的朋友们，
        </motion.p>
        <motion.p
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          诚挚邀请您参加朵朵的 10 岁生日派对！
        </motion.p>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.4, duration: 0.6 }}
          className="event-detail"
        >
          <span role="img" aria-label="date">📅</span> 日期：5月2日
        </motion.p>
        <motion.p
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.6, duration: 0.6 }}
          className="event-detail"
        >
          <span role="img" aria-label="location">📍</span> 地点：巴国城六六六宴会大厅
        </motion.p>
        <motion.p
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.6 }}
        >
          期待与您一同分享这份喜悦！
        </motion.p>

        {/* 成长照片墙 */}
        <motion.div
          className="photo-wall"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.8 }}
        >
          <h3>💖 成长足迹 💖</h3>
          <div className="photo-grid">
            {/* 使用占位图，实际可替换为朵朵照片 */}
            <img src="https://via.placeholder.com/100x100?text=朵朵1" alt="朵朵童年照片1" />
            <img src="https://via.placeholder.com/100x100?text=朵朵2" alt="朵朵童年照片2" />
            <img src="https://via.placeholder.com/100x100?text=朵朵3" alt="朵朵童年照片3" />
            <img src="https://via.placeholder.com/100x100?text=朵朵4" alt="朵朵童年照片4" />
          </div>
        </motion.div>

        {/* 底部功能区 */}
        <motion.div
          className="footer-actions"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.2, duration: 0.8 }}
        >
          <button onClick={toggleMusic} className="action-button">
            <Music size={20} /> {isPlaying ? '暂停音乐' : '播放音乐'}
          </button>
          <button onClick={navigateToMap} className="action-button">
            <MapPin size={20} /> 一键导航
          </button>
        </motion.div>
      </div>

      {/* 背景音乐播放器 */}
      <audio ref={audioRef} loop src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"></audio>
    </motion.div>
  );
};

export default InvitationPage;
