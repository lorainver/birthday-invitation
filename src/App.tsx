import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import CoverPage from './components/CoverPage';
import InvitationPage from './components/InvitationPage';
import './App.css'; // 主应用样式，可能包含全局背景等

function App() {
  const [isCoverOpen, setIsCoverOpen] = useState(true);

  const handleOpenInvitation = () => {
    setIsCoverOpen(false);
  };

  return (
    <div className="app-container">
      {/* 使用 AnimatePresence 确保在组件离开时有退出动画 */}
      <AnimatePresence mode="wait">
        {isCoverOpen ? (
          <CoverPage key="cover" onOpen={handleOpenInvitation} />
        ) : (
          <InvitationPage key="invitation" />
        )}
      </AnimatePresence>
    </div>
  );
}

export default App;
