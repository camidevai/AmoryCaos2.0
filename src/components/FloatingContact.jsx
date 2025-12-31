import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { QRCodeSVG } from 'qrcode.react';
import { FaBriefcase, FaTimes } from 'react-icons/fa';
import './FloatingContact.css';

const FloatingContact = ({ onContactClick }) => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleContactClick = () => {
        setIsExpanded(false);
        onContactClick();
    };

    return (
        <div className="floating-contact-container">
            {/* QR Alert Card - Always visible, expands on click */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={isExpanded ? "expanded" : "compact"}
                    className={`qr-alert-card ${isExpanded ? 'expanded' : 'compact'}`}
                    initial={{ opacity: 0, y: 100, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 100, scale: 0.8 }}
                    transition={{
                        type: "spring",
                        damping: 20,
                        stiffness: 300
                    }}
                    onClick={() => !isExpanded && setIsExpanded(true)}
                    style={{ cursor: !isExpanded ? 'pointer' : 'default' }}
                >
                    {isExpanded && (
                        <button
                            className="qr-close"
                            onClick={(e) => {
                                e.stopPropagation();
                                setIsExpanded(false);
                            }}
                            aria-label="Cerrar"
                        >
                            <FaTimes />
                        </button>
                    )}

                    <h3 className="qr-title">
                        {isExpanded ? 'Escanea para visitar' : 'QR'}
                    </h3>

                    <div className="qr-code-wrapper">
                        <QRCodeSVG
                            value="https://amorycodigo.netlify.app/"
                            size={isExpanded ? 120 : 60}
                            bgColor="#ffffff"
                            fgColor="#1a1f3a"
                            level="H"
                            includeMargin={true}
                        />
                    </div>

                    {isExpanded && (
                        <>
                            <p className="qr-url">amorycodigo.netlify.app</p>

                            <button
                                className="qr-contact-btn"
                                onClick={(e) => {
                                    e.stopPropagation();
                                    handleContactClick();
                                }}
                            >
                                <FaBriefcase /> Contactar
                            </button>
                        </>
                    )}
                </motion.div>
            </AnimatePresence>

            {/* Floating Button */}
            <motion.button
                className="floating-contact-btn"
                onClick={() => setIsExpanded(!isExpanded)}
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 260, damping: 20 }}
            >
                <motion.div
                    animate={{
                        rotate: isExpanded ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                >
                    {isExpanded ? <FaTimes /> : <FaBriefcase />}
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
                {!isExpanded && (
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

