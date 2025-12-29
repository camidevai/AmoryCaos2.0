import { useState } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaQrcode, FaTimes } from 'react-icons/fa';
import './FloatingQR.css';

function FloatingQR() {
  const [isExpanded, setIsExpanded] = useState(false);
  const voteUrl = `${window.location.origin}${window.location.pathname}?mode=vote`;

  return (
    <div className="floating-qr-container">
      <AnimatePresence>
        {isExpanded && (
          <>
            {/* Backdrop */}
            <motion.div
              className="qr-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsExpanded(false)}
            />

            {/* QR Modal */}
            <motion.div
              className="qr-modal"
              initial={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
              animate={{ scale: 1, opacity: 1, x: '-50%', y: '-50%' }}
              exit={{ scale: 0, opacity: 0, x: '-50%', y: '-50%' }}
              transition={{ type: 'spring', damping: 20 }}
              style={{
                position: 'fixed',
                top: '50%',
                left: '50%'
              }}
            >
              <button
                className="qr-close-btn"
                onClick={() => setIsExpanded(false)}
              >
                <FaTimes />
              </button>

              <h3>¡Participa en el Juego!</h3>
              <p>Escanea el código QR para votar</p>

              <div className="qr-code-wrapper">
                <QRCodeSVG
                  value={voteUrl}
                  size={280}
                  level="H"
                  includeMargin={true}
                  bgColor="#ffffff"
                  fgColor="#000000"
                />
              </div>

              <div className="qr-url">
                <small>{voteUrl}</small>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Floating Button */}
      <motion.button
        className="floating-qr-btn"
        onClick={() => setIsExpanded(true)}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ delay: 1, type: 'spring', damping: 15 }}
      >
        <FaQrcode />
        <span className="qr-tooltip">Escanea para votar</span>
      </motion.button>
    </div>
  );
}

export default FloatingQR;

