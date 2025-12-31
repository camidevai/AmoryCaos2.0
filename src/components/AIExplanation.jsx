import { motion } from 'framer-motion';
import './AIExplanation.css';

const AIExplanation = () => {
    return (
        <section className="ai-explanation-section section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-center mb-md">
                        🤖 <span className="gradient-text">¿Qué es la Inteligencia Artificial?</span>
                    </h2>
                    <p className="section-subtitle text-center">
                        Descubre los conceptos fundamentales de la IA
                    </p>
                </motion.div>

                <div className="ai-cards">
                    <motion.div
                        className="ai-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.1 }}
                    >
                        <div className="ai-card-icon">🧠</div>
                        <h3>Aprendizaje Automático</h3>
                        <p>
                            La IA aprende de patrones en grandes cantidades de datos, 
                            similar a cómo los humanos aprendemos de la experiencia.
                        </p>
                    </motion.div>

                    <motion.div
                        className="ai-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        <div className="ai-card-icon">💡</div>
                        <h3>Procesamiento de Lenguaje</h3>
                        <p>
                            Las IAs modernas pueden entender y generar texto de manera 
                            natural, facilitando la comunicación humano-máquina.
                        </p>
                    </motion.div>

                    <motion.div
                        className="ai-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.3 }}
                    >
                        <div className="ai-card-icon">⚡</div>
                        <h3>Automatización</h3>
                        <p>
                            La IA puede automatizar tareas repetitivas, liberando tiempo 
                            para actividades más creativas y estratégicas.
                        </p>
                    </motion.div>

                    <motion.div
                        className="ai-card"
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className="ai-card-icon">🎯</div>
                        <h3>Herramienta de Apoyo</h3>
                        <p>
                            La IA es una herramienta poderosa, pero siempre requiere 
                            supervisión y criterio humano para decisiones importantes.
                        </p>
                    </motion.div>
                </div>

                <motion.div
                    className="ai-facts"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                >
                    <h3 className="text-center mb-md">
                        💭 Mitos vs. Realidades
                    </h3>
                    
                    <div className="fact-grid">
                        <div className="fact-item myth">
                            <span className="fact-label">❌ MITO</span>
                            <p>La IA puede sentir emociones reales como los humanos</p>
                            <small>La IA no tiene conciencia ni emociones. Solo simula respuestas basadas en patrones.</small>
                        </div>

                        <div className="fact-item reality">
                            <span className="fact-label">✅ REALIDAD</span>
                            <p>La IA aprende de patrones en grandes cantidades de datos</p>
                            <small>Analiza millones de ejemplos para identificar patrones y hacer predicciones.</small>
                        </div>

                        <div className="fact-item myth">
                            <span className="fact-label">❌ MITO</span>
                            <p>La IA puede crear contenido completamente original sin datos previos</p>
                            <small>La IA necesita datos de entrenamiento. No puede crear desde cero sin referencias.</small>
                        </div>

                        <div className="fact-item reality">
                            <span className="fact-label">✅ REALIDAD</span>
                            <p>ChatGPT y otras IAs pueden generar código funcional</p>
                            <small>Las IAs modernas pueden generar código, pero siempre debe ser revisado por humanos.</small>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AIExplanation;

