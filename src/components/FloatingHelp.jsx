import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaQuestionCircle, FaTimes, FaRedo } from 'react-icons/fa';
import gameService from '../services/gameService';
import './FloatingHelp.css';

const FloatingHelp = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleResetGame = () => {
        if (window.confirm('¿Estás seguro de que quieres reiniciar el juego? Esto borrará todos los votos.')) {
            gameService.reset();
            // Clear all vote records from localStorage
            for (let i = 0; i < 10; i++) {
                localStorage.removeItem(`voted_q${i}`);
            }
            alert('🎮 Juego reiniciado exitosamente');
        }
    };

    const faqs = [
        {
            question: "¿Qué es esta charla?",
            answer: "Es una presentación de 1 hora sobre Inteligencia Artificial desde una perspectiva humana y práctica, basada en nuestra historia real."
        },
        {
            question: "¿Necesito conocimientos previos?",
            answer: "No. Esta charla está diseñada para cualquier persona curiosa, sin importar su nivel técnico."
        },
        {
            question: "¿Qué voy a aprender?",
            answer: "Aprenderás qué es realmente la IA, cómo crear prompts efectivos, por qué la IA 'alucina', y cómo empezar a usar IA en tu día a día."
        },
        {
            question: "¿Cómo puedo contactarlos?",
            answer: "Puedes escribirnos a través de los botones de contacto en la página o unirte a nuestra comunidad en Discord."
        }
    ];

    return (
        <>
            {/* Floating Help Button */}
            <motion.button
                className="floating-help-button"
                onClick={() => setIsOpen(true)}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1, duration: 0.5 }}
            >
                <FaQuestionCircle />
            </motion.button>

            {/* Floating Reset Button */}
            <motion.button
                className="floating-reset-button"
                onClick={handleResetGame}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 1.2, duration: 0.5 }}
                title="Reiniciar Juego"
            >
                <FaRedo />
            </motion.button>

            {/* Modal */}
            <AnimatePresence>
                {isOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            className="modal-backdrop"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsOpen(false)}
                        />

                        {/* Modal Content */}
                        <motion.div
                            className="modal-content"
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="modal-header">
                                <h3>❓ Preguntas frecuentes</h3>
                                <button
                                    className="modal-close"
                                    onClick={() => setIsOpen(false)}
                                    aria-label="Cerrar"
                                >
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="modal-body">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="faq-item">
                                        <h4 className="faq-question">{faq.question}</h4>
                                        <p className="faq-answer">{faq.answer}</p>
                                    </div>
                                ))}
                            </div>

                            <div className="modal-footer">
                                <p>¿Tienes más preguntas? <a href="#contact" className="footer-link">Contáctanos</a></p>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </>
    );
};

export default FloatingHelp;
