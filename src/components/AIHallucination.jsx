import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef, useState } from 'react';
import { FaBrain, FaCompass, FaRobot, FaExclamationTriangle, FaLightbulb, FaQuestionCircle } from 'react-icons/fa';
import './AIHallucination.css';

const AIHallucination = () => {
    const sectionRef = useRef(null);
    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start end", "end start"]
    });

    const [activeExample, setActiveExample] = useState(null);

    // Razones por las que la IA alucina
    const reasons = [
        {
            icon: <FaBrain />,
            number: "01",
            title: "Vive en más de 12.000 dimensiones",
            description: "Los modelos de lenguaje modernos trabajan en espacios vectoriales de alta dimensionalidad. Imagina un universo donde cada palabra, concepto e idea tiene su propia coordenada en miles de dimensiones.",
            color: "primary",
            gifPlaceholder: "/gifs/dimensions.gif" // Aquí puedes agregar tu GIF
        },
        {
            icon: <FaCompass />,
            number: "02",
            title: "Cambia distancia por dirección",
            description: "La IA no mide qué tan lejos está una respuesta, sino en qué dirección apunta. Es como navegar con una brújula en lugar de un mapa.",
            tooltip: "Usa el ángulo del coseno para medir similitud entre vectores",
            color: "warm",
            gifPlaceholder: "/gifs/compass.gif"
        },
        {
            icon: <FaLightbulb />,
            number: "03",
            title: "Inventa respuestas creíbles",
            description: "Si no encuentra información relevante, la IA genera algo que 'suene bien' basándose en patrones aprendidos. Prefiere la coherencia sobre la precisión.",
            tooltip: "Probabilidad ≠ Verdad",
            color: "accent",
            gifPlaceholder: "/gifs/creative.gif"
        },
        {
            icon: <FaRobot />,
            number: "04",
            title: "Fue entrenada para evitar el silencio",
            description: "Los modelos son penalizados durante el entrenamiento por no responder. Esto los incentiva a siempre generar algo, incluso cuando deberían decir 'no lo sé'.",
            color: "danger",
            gifPlaceholder: "/gifs/silence.gif"
        }
    ];

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
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                    className="hallucination-header"
                >
                    <h2 className="text-center mb-md">
                        🔍 ¿Por qué la IA <span className="gradient-text-warm">alucina</span>?
                    </h2>
                    <p className="hallucination-intro text-center">
                        Cuando la IA "miente", no es error… es su forma de llenar el vacío.
                    </p>
                </motion.div>

                {/* Reasons Grid - Visual Cards */}
                <div className="reasons-grid">
                    {reasons.map((reason, index) => (
                        <motion.div
                            key={index}
                            className={`reason-card reason-card-${reason.color}`}
                            initial={{ opacity: 0, y: 50 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10, scale: 1.02 }}
                        >
                            <div className="reason-icon-wrapper">
                                <div className={`reason-icon reason-icon-${reason.color}`}>
                                    {reason.icon}
                                </div>
                                <div className="reason-number">{reason.number}</div>
                            </div>

                            <h3 className="reason-title">{reason.title}</h3>
                            <p className="reason-description">{reason.description}</p>

                            {reason.tooltip && (
                                <div className="reason-tooltip">
                                    💡 {reason.tooltip}
                                </div>
                            )}

                            {/* Placeholder para GIF - Puedes agregar tus GIFs aquí */}
                            <div className="reason-visual">
                                <div className="gif-placeholder">
                                    <FaQuestionCircle />
                                    <span>Agrega tu GIF aquí</span>
                                    <small>{reason.gifPlaceholder}</small>
                                </div>
                            </div>
                        </motion.div>
                    ))}
                </div>



                {/* Visual Metaphor - Conclusión */}
                <motion.div
                    className="universe-metaphor"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <div className="metaphor-icon">
                        <FaCompass />
                    </div>
                    <div className="metaphor-content">
                        <h3>La IA navega como una brújula, no con una regla</h3>
                        <p>
                            En este universo oscuro de conocimiento, la IA busca estrellas cercanas.
                            Cuando no las encuentra, crea sus propias constelaciones.
                        </p>
                        <div className="metaphor-highlight">
                            💡 Por eso es crucial verificar siempre la información que genera
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AIHallucination;
