import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import './AIHallucination.css';

const AIHallucination = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const [activeTooltip, setActiveTooltip] = useState(null);

    const y1 = useTransform(scrollYProgress, [0, 1], [0, -50]);
    const y2 = useTransform(scrollYProgress, [0, 1], [0, -100]);
    const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

    const tooltips = {
        cosine: {
            term: "Ángulo del coseno",
            definition: "Método matemático para medir similitud entre vectores. La IA usa esto para encontrar respuestas 'cercanas' en su espacio de conocimiento."
        },
        silence: {
            term: "Silencio no es opción",
            definition: "Los modelos de IA están entrenados para siempre dar una respuesta. Prefieren inventar algo coherente antes que admitir que no saben."
        },
        probability: {
            term: "Probabilidad ≠ Verdad",
            definition: "La IA genera respuestas basadas en probabilidades estadísticas, no en verificación de hechos. Lo más probable no siempre es lo más verdadero."
        }
    };

    const toggleTooltip = (key) => {
        setActiveTooltip(activeTooltip === key ? null : key);
    };

    return (
        <section className="hallucination-section section" ref={sectionRef}>
            {/* Animated Starfield Background */}
            <div className="starfield">
                {[...Array(50)].map((_, i) => (
                    <div
                        key={i}
                        className="star"
                        style={{
                            left: `${Math.random() * 100}%`,
                            top: `${Math.random() * 100}%`,
                            animationDelay: `${Math.random() * 3}s`,
                            animationDuration: `${2 + Math.random() * 3}s`
                        }}
                    />
                ))}
            </div>

            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-center mb-lg">
                        🔍 ¿Por qué la IA <span className="gradient-text-warm">alucina</span>?
                    </h2>
                    <p className="hallucination-intro text-center">
                        Cuando la IA "miente", no es error… es su forma de llenar el vacío.
                    </p>
                </motion.div>

                {/* Animated Content Blocks */}
                <div className="hallucination-content">
                    <motion.div
                        className="content-block"
                        style={{ y: y1 }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                    >
                        <div className="block-number">01</div>
                        <h3>Vive en más de 12.000 dimensiones</h3>
                        <p>
                            Los modelos de lenguaje modernos trabajan en espacios vectoriales de alta dimensionalidad.
                            Imagina un universo donde cada palabra, concepto e idea tiene su propia coordenada en miles de dimensiones.
                        </p>
                    </motion.div>

                    <motion.div
                        className="content-block"
                        style={{ y: y2 }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="block-number">02</div>
                        <h3>
                            Cambia distancia por dirección{' '}
                            <span
                                className="tooltip-trigger"
                                onClick={() => toggleTooltip('cosine')}
                            >
                                (ángulo del coseno)
                            </span>
                        </h3>
                        <p>
                            La IA no mide qué tan lejos está una respuesta, sino en qué dirección apunta.
                            Es como navegar con una brújula en lugar de un mapa.
                        </p>
                        {activeTooltip === 'cosine' && (
                            <motion.div
                                className="tooltip-box"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <strong>{tooltips.cosine.term}</strong>
                                <p>{tooltips.cosine.definition}</p>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        className="content-block"
                        style={{ y: y3 }}
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="block-number">03</div>
                        <h3>
                            Cuando no tiene datos cercanos,{' '}
                            <span
                                className="tooltip-trigger"
                                onClick={() => toggleTooltip('probability')}
                            >
                                inventa una respuesta creíble
                            </span>
                        </h3>
                        <p>
                            Si no encuentra información relevante, la IA genera algo que "suene bien" basándose en patrones aprendidos.
                            Prefiere la coherencia sobre la precisión.
                        </p>
                        {activeTooltip === 'probability' && (
                            <motion.div
                                className="tooltip-box"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <strong>{tooltips.probability.term}</strong>
                                <p>{tooltips.probability.definition}</p>
                            </motion.div>
                        )}
                    </motion.div>

                    <motion.div
                        className="content-block"
                        style={{ y: y2 }}
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.6 }}
                    >
                        <div className="block-number">04</div>
                        <h3>
                            Fue entrenada para{' '}
                            <span
                                className="tooltip-trigger"
                                onClick={() => toggleTooltip('silence')}
                            >
                                evitar el silencio
                            </span>
                        </h3>
                        <p>
                            Los modelos son penalizados durante el entrenamiento por no responder.
                            Esto los incentiva a siempre generar algo, incluso cuando deberían decir "no lo sé".
                        </p>
                        {activeTooltip === 'silence' && (
                            <motion.div
                                className="tooltip-box"
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                            >
                                <strong>{tooltips.silence.term}</strong>
                                <p>{tooltips.silence.definition}</p>
                            </motion.div>
                        )}
                    </motion.div>
                </div>

                {/* Visual Metaphor */}
                <motion.div
                    className="universe-metaphor"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="metaphor-content">
                        <h3>La IA navega como una brújula, no con una regla</h3>
                        <p>
                            En este universo oscuro de conocimiento, la IA busca estrellas cercanas.
                            Cuando no las encuentra, crea sus propias constelaciones.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AIHallucination;
