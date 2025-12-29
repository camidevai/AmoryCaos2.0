import { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import StoryCarouselCami from './components/StoryCarouselCami';
import StoryBridge from './components/StoryBridge';
import StoryCarouselDaniel from './components/StoryCarouselDaniel';
import AIExplanation from './components/AIExplanation';
import AIHallucination from './components/AIHallucination';
import Resources from './components/Resources';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import FloatingHelp from './components/FloatingHelp';
import FloatingQR from './components/FloatingQR';
import './App.css';

function App() {
  const [isVoteMode, setIsVoteMode] = useState(false);
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';

    // Check if we're in vote mode
    const urlParams = new URLSearchParams(window.location.search);
    setIsVoteMode(urlParams.get('mode') === 'vote');
  }, []);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  // If in vote mode, render ONLY the voting interface
  if (isVoteMode) {
    return (
      <div className="App vote-mode-only">
        <AIExplanation />
      </div>
    );
  }

  // Normal presentation mode - render everything
  return (
    <div className="App">
      {/* Floating Help Button */}
      <FloatingHelp />

      {/* Floating QR Code */}
      <FloatingQR />

      {/* Main Content */}
      <main>
        {/* Section 1: Hero */}
        <Hero />

        {/* Section 2: Historia de Cami */}
        <StoryCarouselCami />

        {/* Section 3: Capítulo Puente */}
        <StoryCarouselDaniel />

        {/* Section 4: Historia de Daniel */}
        <StoryBridge />
        {/* Section 5: AI Explanation */}
        <AIExplanation />

        {/* Section 6: AI Hallucination */}
        <AIHallucination />

        {/* Section 7: Resources */}
        <Resources onContactClick={handleContactClick} />

        {/* Section 8: Final CTA */}
        <FinalCTA />
      </main>

      {/* Contact Modal */}
      <Contact
        ref={contactRef}
        isOpen={isContactModalOpen}
        onClose={handleCloseContactModal}
      />
    </div>
  );
}

export default App;
