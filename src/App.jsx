import { useEffect, useState, useRef } from 'react';
import Hero from './components/Hero';
import StoryCarouselCami from './components/StoryCarouselCami';
import StoryBridge from './components/StoryBridge';
import StoryCarouselDaniel from './components/StoryCarouselDaniel';
import AIExplanation from './components/AIExplanation';
import Resources from './components/Resources';
import Contact from './components/Contact';
import FinalCTA from './components/FinalCTA';
import FloatingContact from './components/FloatingContact';
import './App.css';

function App() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);
  const contactRef = useRef(null);

  useEffect(() => {
    // Smooth scroll behavior
    document.documentElement.style.scrollBehavior = 'smooth';
  }, []);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  const handleCloseContactModal = () => {
    setIsContactModalOpen(false);
  };

  return (
    <div className="App">
      {/* Floating Contact Button with QR */}
      <FloatingContact onContactClick={handleContactClick} />

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

        {/* Section 6: Resources */}
        <Resources onContactClick={handleContactClick} />

        {/* Section 7: Final CTA */}
        <FinalCTA onContactClick={handleContactClick} />
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
