import { motion } from 'framer-motion';
import { FaBullhorn, FaBriefcase, FaCheckCircle, FaRocket, FaLightbulb, FaBrain, FaHeart } from 'react-icons/fa';
import './FinalCTA.css';

const FinalCTA = ({ onContactClick }) => {
    const takeaways = [
        {
            icon: <FaHeart />,
            text: "Una historia real de amor, código y transformación",
            color: "warm"
        },
        {
            icon: <FaBrain />,
            text: "Conocimientos profundos sobre cómo funciona la IA",
            color: "primary"
        },
        {
            icon: <FaLightbulb />,
            text: "Herramientas prácticas para potenciar tu trabajo",
            color: "accent"
        },
        {
            icon: <FaRocket />,
            text: "Una nueva forma de pensar sobre tecnología y futuro",
            color: "secondary"
        }
    ];

    return (
        <section className="final-cta-section section">
            <div className="container">
                {/* Main Quote */}
                <motion.div
                    className="final-quote"
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="quote-main">
                        La tecnología no decide tu futuro…
                    </h2>
                    <h2 className="quote-emphasis">
                        Tu <span className="gradient-text-warm">curiosidad</span> sí.
                    </h2>
                </motion.div>

                {/* Takeaways */}
                <motion.div
                    className="takeaways-container"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h3 className="takeaways-title">
                        Hoy te llevas:
                    </h3>
                    <div className="takeaways-grid">
                        {takeaways.map((item, index) => (
                            <motion.div
                                key={index}
                                className={`takeaway-card takeaway-${item.color}`}
                                initial={{ opacity: 0, scale: 0.8, rotateY: -90 }}
                                whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.15, duration: 0.5 }}
                                whileHover={{ scale: 1.05, y: -5 }}
                            >
                                <div className="takeaway-icon">
                                    {item.icon}
                                </div>
                                <p className="takeaway-text">{item.text}</p>
                                <div className="takeaway-check">
                                    <FaCheckCircle />
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="final-buttons"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <motion.button
                        className="btn btn-secondary btn-cta"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255, 107, 107, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() => {
                            if (navigator.share) {
                                navigator.share({
                                    title: 'Amor y Caos - InformatiK-AI',
                                    text: '¡Descubre esta increíble charla sobre IA!',
                                    url: window.location.href
                                });
                            } else {
                                navigator.clipboard.writeText(window.location.href);
                                alert('¡Enlace copiado al portapapeles!');
                            }
                        }}
                    >
                        <FaBullhorn /> Compartir página
                    </motion.button>
                    <motion.button
                        className="btn btn-warm btn-cta"
                        whileHover={{ scale: 1.05, boxShadow: "0 10px 40px rgba(255, 165, 0, 0.4)" }}
                        whileTap={{ scale: 0.95 }}
                        onClick={onContactClick}
                    >
                        <FaBriefcase /> Contactar con nosotros
                    </motion.button>
                </motion.div>

                {/* Footer */}
                <motion.div
                    className="final-footer"
                    initial={{ opacity: 0 }}
                    whileInView={{ opacity: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <p className="footer-text">
                        Hecho con 💙 desde Temuco, Chile
                    </p>
                    <p className="footer-signature">
                        <strong>InformatiK-AI</strong> · Amor, Código y Caos · 2024
                    </p>
                </motion.div>
            </div>

            {/* Decorative Elements */}
            <div className="decorative-circles">
                <div className="circle circle-1"></div>
                <div className="circle circle-2"></div>
                <div className="circle circle-3"></div>
            </div>
        </section>
    );
};

export default FinalCTA;
