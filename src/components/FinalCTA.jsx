import { motion } from 'framer-motion';
import { FaFire, FaBullhorn, FaBriefcase, FaCheckCircle } from 'react-icons/fa';
import './FinalCTA.css';

const FinalCTA = () => {
    const takeaways = [
        "Una historia real de transformación",
        "Un juego interactivo IA: ¿Verdad o Mito?",
        "conocimientos sobre por qué la IA alucina",
        "Una nueva forma de pensar sobre tecnología"
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
                    <h3 className="takeaways-title">Hoy te llevas:</h3>
                    <ul className="takeaways-list">
                        {takeaways.map((item, index) => (
                            <motion.li
                                key={index}
                                initial={{ opacity: 0, x: -20 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.4 }}
                            >
                                <FaCheckCircle className="check-icon" />
                                <span>{item}</span>
                            </motion.li>
                        ))}
                    </ul>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    className="final-buttons"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <button className="btn btn-primary btn-cta">
                        <FaFire /> Quiero el Mini-curso gratuito
                    </button>
                    <button className="btn btn-secondary btn-cta">
                        <FaBullhorn /> Compartir página
                    </button>
                    <button className="btn btn-warm btn-cta">
                        <FaBriefcase /> Contactar con nosotros
                    </button>
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
