import { useState, useCallback, useMemo } from 'react';
import { AnimatePresence } from 'framer-motion';
import CoverPage from './components/CoverPage';
import InvitationPage from './components/InvitationPage';
import './App.css';

/* 生成五彩纸屑元素的配置 */
function useConfetti() {
  return useMemo(() => {
    const colors = ['#ff69b4', '#ff6b6b', '#ffd93d', '#6bcb77', '#4d96ff', '#ff922b', '#cc5de8', '#20c997'];
    const shapes = ['circle', 'rect', 'triangle'];
    const pieces = [];

    for (let i = 0; i < 60; i++) {
      const color = colors[Math.floor(Math.random() * colors.length)];
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const left = Math.random() * 100;
      const size = Math.random() * 8 + 4;
      const duration = Math.random() * 2 + 2;
      const delay = Math.random() * 1.5;
      const rotateEnd = Math.random() * 1080 - 540;
      const drift = Math.random() * 200 - 100;

      let borderRadius = '50%';
      if (shape === 'rect') borderRadius = '2px';
      if (shape === 'triangle') borderRadius = '0';

      pieces.push({
        color,
        borderRadius,
        width: shape === 'rect' ? size * 1.5 : size,
        height: size,
        left,
        drift,
        '--fall-duration': `${duration}s`,
        '--fall-delay': `${delay}s`,
        '--rotate-end': `${rotateEnd}deg`,
        style: {
          left: `${left}%`,
          width: `${shape === 'rect' ? size * 1.5 : size}px`,
          height: `${size}px`,
          backgroundColor: color,
          borderRadius,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
        },
      });
    }
    return pieces;
  }, []);
}

function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const confettiPieces = useConfetti();

  const handleOpenInvitation = useCallback(() => {
    setShowConfetti(true);
    setTimeout(() => setIsCoverOpen(false), 300);
    setTimeout(() => setShowConfetti(false), 5000);
  }, []);

  const handleBackToCover = useCallback(() => {
    setIsCoverOpen(true);
  }, []);

  return (
    <div className="app-container">
      {/* 五彩纸屑效果 */}
      {showConfetti && (
        <div className="confetti-container">
          {confettiPieces.map((piece, i) => (
            <div
              key={i}
              className="confetti-piece"
              style={{
                ...piece.style,
                animationName: 'confetti-fall',
                animationTimingFunction: 'ease-out',
                animationFillMode: 'forwards',
              }}
            />
          ))}
        </div>
      )}

      <AnimatePresence mode="wait">
        {isCoverOpen ? (
          <CoverPage key="cover" onOpen={handleOpenInvitation} />
        ) : (
          <InvitationPage key="invitation" onBack={handleBackToCover} />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
