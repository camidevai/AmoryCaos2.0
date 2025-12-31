import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FaBriefcase, FaTimes } from 'react-icons/fa';
import './FloatingContact.css';

const FloatingContact = ({ onContactClick }) => {
    const [showQR, setShowQR] = useState(false);

    const toggleQR = () => {
        setShowQR(!showQR);
    };

    const handleContactClick = () => {
        setShowQR(false);
        onContactClick();
    };

    return (
        <div className="floating-contact-container">
            {/* QR Code Popup */}
            <AnimatePresence>
                {showQR && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="qr-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setShowQR(false)}
                        />
                        
                        {/* QR Card */}
                        <motion.div
                            className="qr-card"
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        >
                            <button 
                                className="qr-close"
                                onClick={() => setShowQR(false)}
                                aria-label="Cerrar"
                            >
                                <FaTimes />
                            </button>

                            <h3 className="qr-title">Escanea para visitar</h3>
                            
                            <div className="qr-code-wrapper">
                                <QRCodeSVG
                                    value="https://amorycodigo.netlify.app/"
                                    size={200}
                                    bgColor="#ffffff"
                                    fgColor="#1a1f3a"
                                    level="H"
                                    includeMargin={true}
                                />
                            </div>

                            <p className="qr-url">amorycodigo.netlify.app</p>

                            <button 
                                className="qr-contact-btn"
                                onClick={handleContactClick}
                            >
                                <FaBriefcase /> Contactar con nosotros
                            </button>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                className="floating-contact-btn"
                onClick={toggleQR}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <motion.div
                    animate={{ 
                        rotate: showQR ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {showQR ? <FaTimes /> : <FaBriefcase />}
                </motion.div>
                
                {/* Pulse animation */}
                <motion.div
                    className="pulse-ring"
                    animate={{
                        scale: [1, 1.5, 1],
                        opacity: [0.5, 0, 0.5],
                    }}
                    transition={{
                        duration: 2,
                        repeat: Infinity,
                        ease: "easeInOut"
                    }}
                />
            </motion.button>

            {/* Tooltip */}
            <AnimatePresence>
                {!showQR && (
                    <motion.div
                        className="floating-tooltip"
                        initial={{ opacity: 0, x: 10 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 10 }}
                        transition={{ delay: 1 }}
                    >
                        ¡Contáctanos!
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FloatingContact;

