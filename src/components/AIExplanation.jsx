import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaBrain, FaCompass, FaLightbulb, FaRobot, FaExclamationTriangle } from 'react-icons/fa';
import './AIExplanation.css';

const AIExplanation = () => {
    const [activeTab, setActiveTab] = useState('historia');

    return (
        <section className="ai-explanation-section section">
            <div className="container">
                {/* Hook Inicial */}
                <motion.div
                    className="hook-section"
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="hook-title">
                        Todos hablan de <span className="gradient-text">Inteligencia Artificial</span> hoy...
                    </h2>
                    <motion.p
                        className="hook-subtitle"
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3, duration: 0.6 }}
                    >
                        ¿Pero sabías que existe desde hace <strong>más de 70 años</strong>? 🤯
                    </motion.p>
                </motion.div>

                {/* Tabs de Navegación */}
                <motion.div
                    className="ai-tabs"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.4, duration: 0.6 }}
                >
                    <button
                        className={`tab-btn ${activeTab === 'historia' ? 'active' : ''}`}
                        onClick={() => setActiveTab('historia')}
                    >
                        📜 Historia
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'tipos' ? 'active' : ''}`}
                        onClick={() => setActiveTab('tipos')}
                    >
                        � Tipos de IA
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'diferencia' ? 'active' : ''}`}
                        onClick={() => setActiveTab('diferencia')}
                    >
                        ⚙️ IA vs Automatización
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'funciona' ? 'active' : ''}`}
                        onClick={() => setActiveTab('funciona')}
                    >
                        🗣️ ¿Cómo funciona?
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'herramientas' ? 'active' : ''}`}
                        onClick={() => setActiveTab('herramientas')}
                    >
                        🛠️ Herramientas
                    </button>
                    <button
                        className={`tab-btn ${activeTab === 'alucinaciones' ? 'active' : ''}`}
                        onClick={() => setActiveTab('alucinaciones')}
                    >
                        🔍 ¿Por qué alucina?
                    </button>
                </motion.div>

                {/* Contenido de Tabs */}
                <div className="tab-content">
                    {/* TAB: Historia */}
                    {activeTab === 'historia' && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="timeline-section"
                        >
                            <h3 className="section-title">📜 La IA no es nueva</h3>

                            <div className="timeline">
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="timeline-year">1950</div>
                                    <div className="timeline-content">
                                        <h4>🧠 Alan Turing</h4>
                                        <p>Creador de la famosa máquina para descifrar códigos nazis. Propone el "Test de Turing" para medir la inteligencia de las máquinas.</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="timeline-year">1956</div>
                                    <div className="timeline-content">
                                        <h4>🎓 Conferencia de Dartmouth</h4>
                                        <p>Nace oficialmente el término <strong>"Inteligencia Artificial"</strong>. El objetivo: crear máquinas que piensen y aprendan como humanos.</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="timeline-year">2022</div>
                                    <div className="timeline-content">
                                        <h4>🚀 Revolución Generativa</h4>
                                        <p>ChatGPT llega al público y cambia todo. La IA generativa se vuelve accesible para todos.</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB: Tipos de IA */}
                    {activeTab === 'tipos' && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="section-title">🧩 Tipos de Inteligencia Artificial</h3>
                            <p className="section-intro">Tradicional vs Generativa</p>

                            <div className="comparison-grid">
                                <motion.div
                                    className="comparison-card traditional"
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="card-icon">🤖</div>
                                    <h4>IA Tradicional</h4>
                                    <p className="card-description">Basada en reglas, lógica y decisiones predefinidas</p>
                                    <div className="card-example">
                                        <strong>Ejemplo:</strong>
                                        <p>Un sistema que decide si aprobar o no un préstamo bancario</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="comparison-card generative"
                                    whileHover={{ scale: 1.05, y: -10 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="card-icon">✨</div>
                                    <h4>IA Generativa</h4>
                                    <p className="card-description">Crea contenido: texto, imágenes, videos, música...</p>
                                    <div className="card-example">
                                        <strong>Ejemplos:</strong>
                                        <p>ChatGPT, Midjourney, Suno, Runway</p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="highlight-box"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.3 }}
                            >
                                <p className="highlight-text">
                                    👉 "La IA que usamos hoy es <strong>generativa</strong>. No solo responde: <strong>crea</strong>."
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* TAB: IA vs Automatización */}
                    {activeTab === 'diferencia' && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="section-title">⚙️ ¿IA o Automatización?</h3>
                            <p className="section-intro">"Spoiler: No. Y acá te explico por qué."</p>

                            <div className="vs-container">
                                <motion.div
                                    className="vs-card automation"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="vs-icon">💻</div>
                                    <h4>Automatización</h4>
                                    <p className="vs-description">Hace tareas repetitivas sin pensar</p>
                                    <div className="vs-example">
                                        <p>Ejemplo: Enviar emails al apretar un botón</p>
                                    </div>
                                    <div className="vs-analogy">
                                        <strong>Es como:</strong>
                                        <p>Tu microondas 🍕</p>
                                    </div>
                                </motion.div>

                                <div className="vs-divider">
                                    <span>VS</span>
                                </div>

                                <motion.div
                                    className="vs-card ai"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    <div className="vs-icon">🧠</div>
                                    <h4>Inteligencia Artificial</h4>
                                    <p className="vs-description">Aprende, analiza y toma decisiones complejas</p>
                                    <div className="vs-example">
                                        <p>Ejemplo: Recomendar contenido personalizado</p>
                                    </div>
                                    <div className="vs-analogy">
                                        <strong>Es como:</strong>
                                        <p>Un chef que aprende tus gustos y cocina por ti 👨‍🍳</p>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    )}

                    {/* TAB: ¿Cómo funciona? */}
                    {activeTab === 'funciona' && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="section-title">🗣️ ¿Cómo funciona hablar con una IA como ChatGPT?</h3>

                            <div className="process-flow">
                                <motion.div
                                    className="process-step"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="step-number">1</div>
                                    <div className="step-content">
                                        <h4>💬 Le haces una pregunta (prompt)</h4>
                                        <p>Escribes tu consulta en lenguaje natural</p>
                                    </div>
                                </motion.div>

                                <div className="process-arrow">↓</div>

                                <motion.div
                                    className="process-step"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="step-number">2</div>
                                    <div className="step-content">
                                        <h4>🔄 Conversión a lenguaje de máquina</h4>
                                        <p>El sistema traduce tu pregunta a un formato que el modelo entiende</p>
                                    </div>
                                </motion.div>

                                <div className="process-arrow">↓</div>

                                <motion.div
                                    className="process-step"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="step-number">3</div>
                                    <div className="step-content">
                                        <h4>🧠 Búsqueda y generación</h4>
                                        <p>La IA busca en su base de datos/pesos y genera una respuesta</p>
                                    </div>
                                </motion.div>

                                <div className="process-arrow">↓</div>

                                <motion.div
                                    className="process-step"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="step-number">4</div>
                                    <div className="step-content">
                                        <h4>✨ Respuesta en lenguaje natural</h4>
                                        <p>Te responde de forma comprensible y conversacional</p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="info-box"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className="info-text">
                                    📍 <strong>Dato interesante:</strong> Tus datos no se van directo a una "nube mágica".
                                    Hay un proceso de interpretación, predicción y generación de texto según
                                    <strong> millones de parámetros entrenados</strong>.
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* TAB: Herramientas */}
                    {activeTab === 'herramientas' && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="section-title">🛠️ Herramientas de IA que uso y recomiendo</h3>
                            <p className="section-intro">Mis aliadas diarias para potenciar mi trabajo</p>

                            <div className="tools-grid">
                                <motion.div
                                    className="tool-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="tool-icon">📓</div>
                                    <h4>Notebook LM</h4>
                                    <p className="tool-purpose">Crear resúmenes y organizar ideas con contexto largo</p>
                                    <div className="tool-highlight">
                                        <strong>Lo que más me gusta:</strong>
                                        <p>Su comprensión profunda de documentos</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="tool-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="tool-icon">💎</div>
                                    <h4>Gemini</h4>
                                    <p className="tool-purpose">IA de Google para investigación, escritura y productividad</p>
                                    <div className="tool-highlight">
                                        <strong>Lo que más me gusta:</strong>
                                        <p>Su integración con Google Docs y buena memoria contextual</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="tool-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="tool-icon">🤖</div>
                                    <h4>ChatGPT (GPTs)</h4>
                                    <p className="tool-purpose">Crear asistentes personalizados para tareas específicas</p>
                                    <div className="tool-highlight">
                                        <strong>Lo que más me gusta:</strong>
                                        <p>Puedes crear tu propio GPT con instrucciones propias</p>
                                    </div>
                                </motion.div>

                                <motion.div
                                    className="tool-card"
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    whileHover={{ scale: 1.05, y: -5 }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="tool-icon">⚡</div>
                                    <h4>Augment AI</h4>
                                    <p className="tool-purpose">Desarrollo y ejecución de código con IA</p>
                                    <div className="tool-highlight">
                                        <strong>Lo que más me gusta:</strong>
                                        <p>Más barato que otros como Code Interpreter o Cloud Code</p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="tools-quote"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5 }}
                            >
                                <p className="quote-text">
                                    "Estas son mis aliadas diarias. Cada una tiene su magia, y combinadas... <strong>¡te hacen volar!</strong> ✨"
                                </p>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* TAB: ¿Por qué alucina? */}
                    {activeTab === 'alucinaciones' && (
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <h3 className="section-title">🔍 ¿Por qué la IA alucina?</h3>
                            <p className="section-intro">"Cuando la IA 'miente', no es error... es su forma de llenar el vacío"</p>

                            {/* Starfield Background */}
                            <div className="hallucination-starfield">
                                {[...Array(30)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        className="star"
                                        style={{
                                            left: `${Math.random() * 100}%`,
                                            top: `${Math.random() * 100}%`,
                                        }}
                                        animate={{
                                            opacity: [0.2, 1, 0.2],
                                            scale: [0.8, 1.2, 0.8],
                                        }}
                                        transition={{
                                            duration: 2 + Math.random() * 2,
                                            repeat: Infinity,
                                            delay: Math.random() * 2,
                                        }}
                                    />
                                ))}
                            </div>

                            {/* Razones en formato visual interactivo */}
                            <div className="hallucination-reasons">
                                {/* Razón 1 */}
                                <motion.div
                                    className="hallucination-card card-primary"
                                    initial={{ opacity: 0, rotateY: -90 }}
                                    whileInView={{ opacity: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1, duration: 0.6 }}
                                    whileHover={{ scale: 1.05, rotateZ: 2 }}
                                >
                                    <div className="hallucination-number">01</div>
                                    <div className="hallucination-icon">
                                        <FaBrain />
                                    </div>
                                    <h4>Vive en más de 12.000 dimensiones</h4>
                                    <p>
                                        Los modelos de lenguaje trabajan en espacios vectoriales de alta dimensionalidad.
                                        Imagina un universo donde cada palabra tiene su propia coordenada en <strong>miles de dimensiones</strong>.
                                    </p>
                                    <div className="hallucination-visual">
                                        <div className="dimension-cube">
                                            <motion.div
                                                className="cube-face"
                                                animate={{ rotateY: 360 }}
                                                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                                            >
                                                🧊
                                            </motion.div>
                                        </div>
                                        <span className="visual-label">Espacio vectorial multidimensional</span>
                                    </div>
                                </motion.div>

                                {/* Razón 2 */}
                                <motion.div
                                    className="hallucination-card card-warm"
                                    initial={{ opacity: 0, rotateY: -90 }}
                                    whileInView={{ opacity: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2, duration: 0.6 }}
                                    whileHover={{ scale: 1.05, rotateZ: -2 }}
                                >
                                    <div className="hallucination-number">02</div>
                                    <div className="hallucination-icon">
                                        <FaCompass />
                                    </div>
                                    <h4>Cambia distancia por dirección</h4>
                                    <p>
                                        La IA no mide qué tan lejos está una respuesta, sino <strong>en qué dirección apunta</strong>.
                                        Es como navegar con una brújula en lugar de un mapa.
                                    </p>
                                    <div className="hallucination-tooltip">
                                        💡 Usa el ángulo del coseno para medir similitud entre vectores
                                    </div>
                                    <div className="hallucination-visual">
                                        <motion.div
                                            className="compass-animation"
                                            animate={{ rotate: [0, 360] }}
                                            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                                        >
                                            🧭
                                        </motion.div>
                                        <span className="visual-label">Navegación por similitud angular</span>
                                    </div>
                                </motion.div>

                                {/* Razón 3 */}
                                <motion.div
                                    className="hallucination-card card-accent"
                                    initial={{ opacity: 0, rotateY: -90 }}
                                    whileInView={{ opacity: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3, duration: 0.6 }}
                                    whileHover={{ scale: 1.05, rotateZ: 2 }}
                                >
                                    <div className="hallucination-number">03</div>
                                    <div className="hallucination-icon">
                                        <FaLightbulb />
                                    </div>
                                    <h4>Inventa respuestas creíbles</h4>
                                    <p>
                                        Si no encuentra información relevante, la IA genera algo que <strong>"suene bien"</strong>
                                        basándose en patrones aprendidos. Prefiere la coherencia sobre la precisión.
                                    </p>
                                    <div className="hallucination-tooltip">
                                        ⚠️ Probabilidad ≠ Verdad
                                    </div>
                                    <div className="hallucination-visual">
                                        <div className="creativity-animation">
                                            <motion.span
                                                animate={{ y: [-10, 10, -10], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 2, repeat: Infinity }}
                                            >💭</motion.span>
                                            <motion.span
                                                animate={{ y: [10, -10, 10], opacity: [1, 0.5, 1] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                                            >✨</motion.span>
                                            <motion.span
                                                animate={{ y: [-5, 5, -5], opacity: [0.7, 1, 0.7] }}
                                                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
                                            >🎨</motion.span>
                                        </div>
                                        <span className="visual-label">Generación creativa de patrones</span>
                                    </div>
                                </motion.div>

                                {/* Razón 4 */}
                                <motion.div
                                    className="hallucination-card card-danger"
                                    initial={{ opacity: 0, rotateY: -90 }}
                                    whileInView={{ opacity: 1, rotateY: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4, duration: 0.6 }}
                                    whileHover={{ scale: 1.05, rotateZ: -2 }}
                                >
                                    <div className="hallucination-number">04</div>
                                    <div className="hallucination-icon">
                                        <FaRobot />
                                    </div>
                                    <h4>Fue entrenada para evitar el silencio</h4>
                                    <p>
                                        Los modelos son penalizados durante el entrenamiento por no responder.
                                        Esto los incentiva a <strong>siempre generar algo</strong>, incluso cuando deberían decir "no lo sé".
                                    </p>
                                    <div className="hallucination-visual">
                                        <div className="silence-animation">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 1, 0.5] }}
                                                transition={{ duration: 1.5, repeat: Infinity }}
                                            >
                                                🤐
                                            </motion.div>
                                            <motion.div
                                                className="cross-mark"
                                                animate={{ rotate: [0, 360] }}
                                                transition={{ duration: 3, repeat: Infinity }}
                                            >
                                                ❌
                                            </motion.div>
                                        </div>
                                        <span className="visual-label">Penalización por silencio</span>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Conclusión visual */}
                            <motion.div
                                className="hallucination-conclusion"
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.5, duration: 0.8 }}
                            >
                                <div className="conclusion-icon">
                                    <motion.div
                                        animate={{ rotate: [0, 360] }}
                                        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                                    >
                                        🧭
                                    </motion.div>
                                </div>
                                <div className="conclusion-content">
                                    <h4>La IA navega como una brújula, no con una regla</h4>
                                    <p>
                                        En este universo oscuro de conocimiento, la IA busca estrellas cercanas.
                                        Cuando no las encuentra, <strong>crea sus propias constelaciones</strong>.
                                    </p>
                                    <div className="conclusion-highlight">
                                        <FaExclamationTriangle />
                                        <span>Por eso es crucial <strong>verificar siempre</strong> la información que genera</span>
                                    </div>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </div>

                {/* Cierre con Impacto */}
                <motion.div
                    className="closing-section"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: 0.3, duration: 0.8 }}
                >
                    <div className="closing-content">
                        <h3 className="closing-title">
                            La Inteligencia Artificial no viene a <span className="gradient-text">reemplazarte</span>,
                        </h3>
                        <h3 className="closing-title">
                            viene a <span className="gradient-text">potenciarte</span>. 🚀
                        </h3>
                        <p className="closing-subtitle">
                            El futuro no es de quien tenga más herramientas,<br />
                            sino de quien mejor las sepa usar.
                        </p>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default AIExplanation;