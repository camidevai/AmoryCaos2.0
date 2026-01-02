import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaBrain, FaCompass, FaLightbulb, FaRobot, FaExclamationTriangle } from 'react-icons/fa';
import './AIExplanation.css';

const AIExplanation = () => {
    const [activeTab, setActiveTab] = useState('historia');
    const [expandedImage, setExpandedImage] = useState(null);

    const handleImageClick = (imageSrc, imageAlt) => {
        setExpandedImage({ src: imageSrc, alt: imageAlt });
    };

    const closeExpandedImage = () => {
        setExpandedImage(null);
    };

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
                            <h3 className="section-title">📜 La IA tiene más de 2000 años de historia</h3>
                            <p className="section-intro">Desde la lógica antigua hasta la guerra de los gigantes tecnológicos</p>

                            <div className="timeline">
                                {/* Aristóteles */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.05 }}
                                >
                                    <div className="timeline-year" style={{ whiteSpace: 'nowrap' }}>~350 a.C.</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/256px-Aristotle_Altemps_Inv8575.jpg",
                                                "Aristóteles - Filósofo griego, creador del silogismo"
                                            )}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/ae/Aristotle_Altemps_Inv8575.jpg/256px-Aristotle_Altemps_Inv8575.jpg"
                                                alt="Aristóteles"
                                            />
                                        </div>
                                        <h4>🏛️ Aristóteles - El Silogismo</h4>
                                        <p>Hace más de 2000 años, Aristóteles creó el <strong>silogismo</strong>, la primera forma de razonamiento lógico estructurado.</p>
                                        <p className="timeline-highlight">💡 Base fundamental del pensamiento computacional</p>
                                    </div>
                                </motion.div>

                                {/* René Descartes */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.1 }}
                                >
                                    <div className="timeline-year">1637</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/256px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg",
                                                "René Descartes - Filósofo y matemático francés"
                                            )}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/7/73/Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg/256px-Frans_Hals_-_Portret_van_Ren%C3%A9_Descartes.jpg"
                                                alt="René Descartes"
                                            />
                                        </div>
                                        <h4>🧮 René Descartes - Método Cartesiano</h4>
                                        <p>Propone el <strong>método científico</strong> y el razonamiento deductivo.</p>
                                        <p className="timeline-highlight">💭 "Pienso, luego existo"</p>
                                    </div>
                                </motion.div>

                                {/* Charles Babbage */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.15 }}
                                >
                                    <div className="timeline-year">1837</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Charles_Babbage_-_1860.jpg/256px-Charles_Babbage_-_1860.jpg",
                                                "Charles Babbage - Padre de la computación"
                                            )}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/Charles_Babbage_-_1860.jpg/256px-Charles_Babbage_-_1860.jpg"
                                                alt="Charles Babbage"
                                            />
                                        </div>
                                        <h4>⚙️ Charles Babbage - Máquina Analítica</h4>
                                        <p>Diseña la primera <strong>computadora mecánica programable</strong>.</p>
                                        <p className="timeline-highlight">🔧 Padre de la computación moderna</p>
                                    </div>
                                </motion.div>

                                {/* Ada Lovelace */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.2 }}
                                >
                                    <div className="timeline-year">1843</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/256px-Ada_Lovelace_portrait.jpg",
                                                "Ada Lovelace - Primera programadora de la historia"
                                            )}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a4/Ada_Lovelace_portrait.jpg/256px-Ada_Lovelace_portrait.jpg"
                                                alt="Ada Lovelace"
                                            />
                                        </div>
                                        <h4>👩‍💻 Ada Lovelace - Primera Programadora</h4>
                                        <p>Crea el <strong>primer algoritmo</strong> destinado a ser procesado por una máquina.</p>
                                        <p className="timeline-highlight">🌟 La primera programadora de la historia</p>
                                    </div>
                                </motion.div>

                                {/* Alan Turing */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.25 }}
                                >
                                    <div className="timeline-year">1950</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/256px-Alan_Turing_Aged_16.jpg",
                                                "Alan Turing - Padre de la Inteligencia Artificial"
                                            )}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Alan_Turing_Aged_16.jpg/256px-Alan_Turing_Aged_16.jpg"
                                                alt="Alan Turing"
                                            />
                                        </div>
                                        <h4>🧠 Alan Turing - Test de Turing</h4>
                                        <p>Héroe de la Segunda Guerra Mundial que descifró códigos nazis. Propone el <strong>"Test de Turing"</strong> para medir si una máquina puede pensar.</p>
                                        <p className="timeline-highlight">❓ "¿Puede una máquina pensar?" - La pregunta que inició todo.</p>
                                    </div>
                                </motion.div>

                                {/* Conferencia de Dartmouth */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.3 }}
                                >
                                    <div className="timeline-year">1956</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/John_McCarthy_Stanford.jpg/256px-John_McCarthy_Stanford.jpg",
                                                "John McCarthy - Fundador de la Conferencia de Dartmouth"
                                            )}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/49/John_McCarthy_Stanford.jpg/256px-John_McCarthy_Stanford.jpg"
                                                alt="John McCarthy - Conferencia de Dartmouth"
                                            />
                                        </div>
                                        <h4>🎓 Conferencia de Dartmouth</h4>
                                        <p>Nace oficialmente el término <strong>"Inteligencia Artificial"</strong>. John McCarthy, Marvin Minsky y otros visionarios se reúnen con un objetivo: crear máquinas que piensen como humanos.</p>
                                        <p className="timeline-highlight">🎯 El nacimiento oficial de la IA como campo de estudio.</p>
                                    </div>
                                </motion.div>

                                {/* Invierno de la IA */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.32 }}
                                >
                                    <div className="timeline-year" style={{ whiteSpace: 'nowrap' }}>1974-1980</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://i.pinimg.com/originals/20/a7/de/20a7deb9f571a103494b5451f49ec392.gif",
                                                "Invierno de la IA - Período de desilusión (1974-1980)"
                                            )}
                                        >
                                            <img
                                                src="https://i.pinimg.com/originals/20/a7/de/20a7deb9f571a103494b5451f49ec392.gif"
                                                alt="Invierno de la IA"
                                            />
                                        </div>
                                        <h4>❄️ El Invierno de la IA</h4>
                                        <p>Período de <strong>desilusión y recortes de financiamiento</strong>. Las promesas no cumplidas llevan a la comunidad científica a perder fe en la IA. Un recordatorio de que el progreso no es lineal.</p>
                                        <p className="timeline-highlight">🥶 La IA casi muere... pero sobrevivió.</p>
                                    </div>
                                </motion.div>

                                {/* IBM Deep Blue */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.35 }}
                                >
                                    <div className="timeline-year">1997</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://media.gettyimages.com/id/1240227320/es/foto/world-chess-champion-garry-kasparov-looks-at-the-chessboard-before-his-next-move-in-the-early.jpg?s=1024x1024&w=gi&k=20&c=rObRl1knE8f_4VO2h_3nc_WzMsUkG8L0n-lvSE8LpFI=",
                                                "IBM Deep Blue vs Garry Kasparov - 1997"
                                            )}
                                        >
                                            <img
                                                src="https://media.gettyimages.com/id/1240227320/es/foto/world-chess-champion-garry-kasparov-looks-at-the-chessboard-before-his-next-move-in-the-early.jpg?s=1024x1024&w=gi&k=20&c=rObRl1knE8f_4VO2h_3nc_WzMsUkG8L0n-lvSE8LpFI="
                                                alt="IBM Deep Blue vs Kasparov"
                                            />
                                        </div>
                                        <h4>♟️ IBM Deep Blue vs Kasparov</h4>
                                        <p>La supercomputadora de IBM <strong>Deep Blue</strong> derrota al campeón mundial de ajedrez Garry Kasparov. Primera vez que una máquina vence a un humano en ajedrez.</p>
                                        <p className="timeline-highlight">🏆 La IA demuestra que puede superar a los humanos en tareas complejas.</p>
                                    </div>
                                </motion.div>

                                {/* IBM Watson */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.4 }}
                                >
                                    <div className="timeline-year">2011</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://i.makeagif.com/media/5-09-2023/7RWkcy.gif",
                                                "IBM Watson ganando Jeopardy! - 2011"
                                            )}
                                        >
                                            <img
                                                src="https://i.makeagif.com/media/5-09-2023/7RWkcy.gif"
                                                alt="IBM Watson en Jeopardy"
                                            />
                                        </div>
                                        <h4>🎮 IBM Watson - Jeopardy!</h4>
                                        <p><strong>Watson</strong> de IBM gana el concurso Jeopardy! contra campeones humanos. Demuestra comprensión del lenguaje natural y razonamiento complejo.</p>
                                    </div>
                                </motion.div>

                                {/* Redes Neuronales - Google */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.45 }}
                                >
                                    <div className="timeline-year">2012</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://media.licdn.com/dms/image/v2/D4D12AQEhXbZ8JAVmyQ/article-cover_image-shrink_720_1280/B4DZdtVlCAGgAI-/0/1749886065216?e=2147483647&v=beta&t=m4vpCWobf9Z28PIz5XUnfZgLD8r1RbwZYKgBtxgWZ7E",
                                                "Redes Neuronales - Revolución del Deep Learning (2012)"
                                            )}
                                        >
                                            <img
                                                src="https://media.licdn.com/dms/image/v2/D4D12AQEhXbZ8JAVmyQ/article-cover_image-shrink_720_1280/B4DZdtVlCAGgAI-/0/1749886065216?e=2147483647&v=beta&t=m4vpCWobf9Z28PIz5XUnfZgLD8r1RbwZYKgBtxgWZ7E"
                                                alt="Redes Neuronales"
                                            />
                                        </div>
                                        <h4>🧬 Revolución de las Redes Neuronales</h4>
                                        <p>Google y otros gigantes tecnológicos empiezan a desarrollar <strong>redes neuronales profundas</strong>. El deep learning cambia el juego completamente.</p>
                                        <p className="timeline-highlight">🔬 Las máquinas empiezan a "aprender" de verdad.</p>
                                    </div>
                                </motion.div>

                                {/* AlphaGo */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.48 }}
                                >
                                    <div className="timeline-year">2016</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://i.makeagif.com/media/5-09-2017/qNfoPW.gif",
                                                "AlphaGo vs Lee Sedol - DeepMind (2016)"
                                            )}
                                        >
                                            <img
                                                src="https://i.makeagif.com/media/5-09-2017/qNfoPW.gif"
                                                alt="AlphaGo vs Lee Sedol"
                                            />
                                        </div>
                                        <h4>🎯 AlphaGo - DeepMind</h4>
                                        <p><strong>AlphaGo</strong> de Google DeepMind derrota a Lee Sedol, campeón mundial de Go. El Go es infinitamente más complejo que el ajedrez, con más posiciones que átomos en el universo.</p>
                                        <p className="timeline-highlight">🤯 La IA domina el juego más complejo jamás creado.</p>
                                    </div>
                                </motion.div>

                                {/* Google BERT */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.5 }}
                                >
                                    <div className="timeline-year">2018</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Zg_632sMkom7YkSXr5jb3aonse44M7_MCg&s",
                                                "Google BERT - Comprensión del lenguaje natural (2018)"
                                            )}
                                        >
                                            <img
                                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT0Zg_632sMkom7YkSXr5jb3aonse44M7_MCg&s"
                                                alt="Google BERT"
                                            />
                                        </div>
                                        <h4>🔤 Google BERT</h4>
                                        <p>Google lanza <strong>BERT</strong>, revolucionando la comprensión del lenguaje natural. Las búsquedas de Google se vuelven mucho más inteligentes.</p>
                                    </div>
                                </motion.div>

                                {/* ChatGPT */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.55 }}
                                >
                                    <div className="timeline-year">2022</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png",
                                                "ChatGPT - Revolución de la IA Generativa (2022)"
                                            )}
                                        >
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/commons/thumb/0/04/ChatGPT_logo.svg/512px-ChatGPT_logo.svg.png"
                                                alt="ChatGPT"
                                            />
                                        </div>
                                        <h4>🚀 ChatGPT - Revolución Generativa</h4>
                                        <p><strong>OpenAI</strong> lanza ChatGPT y cambia todo. La IA generativa se vuelve accesible para todos. 100 millones de usuarios en 2 meses.</p>
                                        <p className="timeline-highlight">💥 El momento que cambió el mundo para siempre.</p>
                                    </div>
                                </motion.div>

                                {/* La Guerra de las IAs */}
                                <motion.div
                                    className="timeline-item"
                                    initial={{ opacity: 0, x: -50 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: 0.6 }}
                                >
                                    <div className="timeline-year" style={{ whiteSpace: 'nowrap' }}>2023-2025</div>
                                    <div className="timeline-content">
                                        <div
                                            className="timeline-image"
                                            onClick={() => handleImageClick(
                                                "https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg",
                                                "La Guerra de las IAs - OpenAI, Google, Anthropic, Meta, DeepSeek (2023-2025)"
                                            )}
                                        >
                                            <img
                                                src="https://cdn.vox-cdn.com/thumbor/Pkmq1nm3skO0-j693JTMd7RL0Zk=/0x0:2012x1341/1200x800/filters:focal(0x0:2012x1341)/cdn.vox-cdn.com/uploads/chorus_image/image/47070706/google2.0.0.jpg"
                                                alt="Guerra de las IAs"
                                            />
                                        </div>
                                        <h4>⚔️ La Guerra de los Gigantes</h4>
                                        <p>Comienza la <strong>batalla por la supremacía de la IA</strong>:</p>
                                        <ul className="timeline-list">
                                            <li><strong>🟢 OpenAI (ChatGPT)</strong> - Líder en IA conversacional</li>
                                            <li><strong>🔵 Google (Gemini, BARD)</strong> - El gigante de las búsquedas contraataca</li>
                                            <li><strong>🟣 Anthropic (Claude)</strong> - IA más segura y ética</li>
                                            <li><strong>🔴 Meta (Llama)</strong> - IA de código abierto</li>
                                            <li><strong>🟠 DeepSeek</strong> - La sorpresa china que sacudió el mercado</li>
                                        </ul>
                                        <p className="timeline-highlight">🌍 La carrera por la IA más poderosa está en su punto más álgido.</p>
                                    </div>
                                </motion.div>
                            </div>

                            <motion.div
                                className="highlight-box"
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: 0.7 }}
                            >
                                <p className="highlight-text">
                                    🎯 <strong>De Aristóteles a ChatGPT:</strong> 2000 años de evolución del pensamiento lógico hasta las máquinas que crean contenido. La IA no es nueva, pero <strong>nunca había sido tan poderosa</strong>.
                                </p>
                            </motion.div>
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

            {/* Modal de Imagen Expandida */}
            <AnimatePresence>
                {expandedImage && (
                    <motion.div
                        className="image-modal-overlay"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={closeExpandedImage}
                    >
                        <motion.div
                            className="image-modal-content"
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.8, opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 300 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button className="image-modal-close" onClick={closeExpandedImage}>
                                ✕
                            </button>
                            <img
                                src={expandedImage.src}
                                alt={expandedImage.alt}
                                className="image-modal-img"
                            />
                            <p className="image-modal-caption">{expandedImage.alt}</p>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default AIExplanation;