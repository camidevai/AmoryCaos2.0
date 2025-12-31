import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { FaCheckCircle, FaTimesCircle, FaPlay, FaTrophy, FaQrcode } from 'react-icons/fa';
import { QRCodeSVG } from 'qrcode.react';
import gameService from '../services/gameService';
import RealtimeStatus from './RealtimeStatus';
import './AIExplanation.css';

const AIExplanation = () => {
    const [gameState, setGameState] = useState(gameService.getState());
    const [showQR, setShowQR] = useState(false);
    const [gameStarted, setGameStarted] = useState(false);
    const [hasVoted, setHasVoted] = useState(false);

    // Check if we're in vote mode (audience view)
    const isVoteMode = new URLSearchParams(window.location.search).get('mode') === 'vote';

    // Use currentQuestion from gameState (synced with Supabase)
    const currentQuestionIndex = gameState.currentQuestion;

    // Questions for the game
    const questions = [
        {
            question: "La IA puede sentir emociones reales como los humanos",
            answer: false,
            explanation: "❌ FALSO: La IA no tiene conciencia ni emociones reales. Solo simula respuestas basadas en patrones de datos."
        },
        {
            question: "La IA aprende de patrones en grandes cantidades de datos",
            answer: true,
            explanation: "✅ VERDADERO: La IA analiza millones de ejemplos para identificar patrones y hacer predicciones."
        },
        {
            question: "La IA puede crear contenido completamente original sin datos previos",
            answer: false,
            explanation: "❌ FALSO: La IA necesita datos de entrenamiento. No puede crear desde cero sin referencias previas."
        },
        {
            question: "La IA puede automatizar tareas repetitivas y ahorrar tiempo",
            answer: true,
            explanation: "✅ VERDADERO: Una de las mejores aplicaciones de la IA es automatizar procesos repetitivos."
        },
        {
            question: "La IA puede reemplazar completamente el juicio humano en decisiones importantes",
            answer: false,
            explanation: "❌ FALSO: La IA es una herramienta de apoyo. Las decisiones importantes requieren criterio humano."
        },
        {
            question: "ChatGPT y otras IAs pueden generar código funcional",
            answer: true,
            explanation: "✅ VERDADERO: Las IAs modernas pueden generar código, pero siempre debe ser revisado por humanos."
        }
    ];

    useEffect(() => {
        // Initialize game service with Supabase
        gameService.init();

        // Subscribe to game state changes
        const unsubscribe = gameService.subscribe((newState) => {
            console.log('🔄 Component received state update:', newState);
            setGameState(newState);
        });

        return () => {
            unsubscribe();
            // Don't cleanup Supabase connection here as other components might use it
        };
    }, []);

    // Check if user has voted for current question
    useEffect(() => {
        const voteKey = `voted_q${gameState.currentQuestion}`;
        const voted = localStorage.getItem(voteKey);
        setHasVoted(!!voted);
    }, [gameState.currentQuestion]);

    const handleInitGame = () => {
        setGameStarted(true);
        setShowQR(true);
        // Automatically start with the first question
        gameService.startQuestion(0);
    };

    const handleStartQuestion = (index) => {
        gameService.startQuestion(index);
        setShowQR(true);
    };

    const handleShowResults = () => {
        gameService.showResults();
    };

    const handleNextQuestion = () => {
        if (currentQuestionIndex < questions.length - 1) {
            gameService.startQuestion(currentQuestionIndex + 1);
        }
    };

    const handleVote = async (answer) => {
        const success = await gameService.vote(answer);
        if (success) {
            setHasVoted(true);
            // Show feedback
            alert(answer ? '¡Votaste VERDADERO! ✅' : '¡Votaste FALSO! ❌');
        } else {
            // User already voted
            alert('⚠️ Ya votaste en esta pregunta');
        }
    };

    const percentages = gameService.getPercentages();
    const currentQuestion = questions[currentQuestionIndex];

    // VOTE MODE - What audience sees on their phones
    if (isVoteMode) {
        return (
            <section className="ai-explanation-section section vote-mode">
                <RealtimeStatus gameState={gameState} />
                <div className="container">
                    <motion.div
                        className="vote-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <h2 className="vote-title">🎮 IA: ¿Verdad o Mito?</h2>

                        {gameState.gameState === 'waiting' && (
                            <div className="waiting-message">
                                <p>⏳ Esperando que comience la siguiente pregunta...</p>
                            </div>
                        )}

                        {gameState.gameState === 'voting' && currentQuestion && (
                            <div className="voting-active">
                                <div className="question-number">
                                    Pregunta {currentQuestionIndex + 1} de {questions.length}
                                </div>
                                <h3 className="question-text">{currentQuestion.question}</h3>

                                {hasVoted ? (
                                    <div className="vote-confirmed">
                                        <p className="vote-confirmed-message">
                                            ✅ ¡Tu voto ha sido registrado!
                                        </p>
                                        <p className="vote-confirmed-subtitle">
                                            Espera a que el presentador muestre los resultados
                                        </p>
                                        <div className="vote-count">
                                            {gameState.totalVotes} votos recibidos
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        <div className="vote-buttons">
                                            <motion.button
                                                className="vote-btn vote-btn-true"
                                                onClick={() => handleVote(true)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaCheckCircle /> VERDADERO
                                            </motion.button>
                                            <motion.button
                                                className="vote-btn vote-btn-false"
                                                onClick={() => handleVote(false)}
                                                whileHover={{ scale: 1.05 }}
                                                whileTap={{ scale: 0.95 }}
                                            >
                                                <FaTimesCircle /> FALSO
                                            </motion.button>
                                        </div>

                                        <div className="vote-count">
                                            {gameState.totalVotes} votos recibidos
                                        </div>
                                    </>
                                )}
                            </div>
                        )}

                        {gameState.gameState === 'results' && currentQuestion && (
                            <div className="results-view">
                                <h3 className="question-text">{currentQuestion.question}</h3>

                                {hasVoted ? (
                                    <>
                                        <div className="answer-reveal">
                                            {currentQuestion.explanation}
                                        </div>
                                        <div className="vote-stats">
                                            <div className="stat-bar">
                                                <div className="stat-label">✅ Verdadero: {percentages.true}%</div>
                                                <div className="stat-bar-fill" style={{ width: `${percentages.true}%` }}></div>
                                            </div>
                                            <div className="stat-bar">
                                                <div className="stat-label">❌ Falso: {percentages.false}%</div>
                                                <div className="stat-bar-fill stat-bar-false" style={{ width: `${percentages.false}%` }}></div>
                                            </div>
                                        </div>
                                    </>
                                ) : (
                                    <div className="too-late-message">
                                        <p className="too-late-icon">⏰</p>
                                        <p className="too-late-text">
                                            ¡Llegaste un poco tarde!
                                        </p>
                                        <p className="too-late-subtitle">
                                            Esta pregunta ya fue respondida. Espera a la siguiente pregunta para participar.
                                        </p>
                                        <div className="answer-reveal">
                                            {currentQuestion.explanation}
                                        </div>
                                    </div>
                                )}
                            </div>
                        )}
                    </motion.div>
                </div>
            </section>
        );
    }

    // PRESENTER MODE - What you see on the big screen
    return (
        <section className="ai-explanation-section section presenter-mode">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-center mb-md">
                        🎮 <span className="gradient-text">IA: ¿Verdad o Mito?</span>
                    </h2>
                    <p className="section-subtitle text-center">
                        Juego interactivo en tiempo real - ¡Que la audiencia vote! 📱
                    </p>
                </motion.div>

                {/* Initial State - Show "Iniciar Juego" button */}
                {!gameStarted && gameState.gameState === 'waiting' && (
                    <motion.div
                        className="init-game-container"
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                    >
                        <div className="init-game-content">
                            <motion.button
                                className="btn-init-game"
                                onClick={handleInitGame}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                            >
                                <FaPlay /> Iniciar Juego
                            </motion.button>
                        </div>
                    </motion.div>
                )}

                {/* QR Code Section */}
                <AnimatePresence>
                    {showQR && (
                        <motion.div
                            className="qr-section"
                            initial={{ opacity: 0, y: -20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                        >
                            <div className="qr-container">
                                <QRCodeSVG
                                    value={`${window.location.origin}${window.location.pathname}?mode=vote`}
                                    size={200}
                                    level="H"
                                    includeMargin={true}
                                />
                                <p className="qr-instruction">
                                    <FaQrcode /> Escanea para votar
                                </p>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Game Control Panel */}
                <div className="game-panel">
                    {gameStarted && gameState.gameState === 'waiting' && (
                        <div className="question-selector">
                            <h3>Selecciona una pregunta:</h3>
                            <div className="questions-grid">
                                {questions.map((q, index) => (
                                    <motion.button
                                        key={index}
                                        className="question-card"
                                        onClick={() => handleStartQuestion(index)}
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                    >
                                        <div className="question-number-badge">#{index + 1}</div>
                                        <p>{q.question}</p>
                                    </motion.button>
                                ))}
                            </div>
                        </div>
                    )}

                    {gameState.gameState === 'voting' && currentQuestion && (
                        <div className="voting-display">
                            <div className="current-question-display">
                                <div className="question-badge">
                                    Pregunta {currentQuestionIndex + 1}/{questions.length}
                                </div>
                                <h3 className="big-question">{currentQuestion.question}</h3>
                            </div>

                            <div className="live-results">
                                <h4>📊 Votos en vivo: {gameState.totalVotes}</h4>
                                <p className="vote-instruction">Los resultados se mostrarán al presionar "Mostrar Respuesta"</p>
                            </div>

                            <button className="btn btn-primary btn-large" onClick={handleShowResults}>
                                <FaTrophy /> Mostrar Respuesta
                            </button>
                        </div>
                    )}

                    {gameState.gameState === 'results' && currentQuestion && (
                        <div className="results-display">
                            <h3 className="big-question">{currentQuestion.question}</h3>

                            <motion.div
                                className="answer-box"
                                initial={{ scale: 0.8, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                transition={{ type: "spring", duration: 0.6 }}
                            >
                                {currentQuestion.explanation}
                            </motion.div>

                            <div className="final-stats">
                                <div className="stat-item">
                                    <span className="stat-value">{percentages.true}%</span>
                                    <span className="stat-label">Votaron Verdadero</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">{percentages.false}%</span>
                                    <span className="stat-label">Votaron Falso</span>
                                </div>
                                <div className="stat-item">
                                    <span className="stat-value">{gameState.totalVotes}</span>
                                    <span className="stat-label">Total de Votos</span>
                                </div>
                            </div>

                            <div className="control-buttons">
                                {currentQuestionIndex < questions.length - 1 ? (
                                    <button className="btn btn-primary btn-large" onClick={handleNextQuestion}>
                                        <FaPlay /> Siguiente Pregunta
                                    </button>
                                ) : (
                                    <button className="btn btn-secondary btn-large" onClick={() => gameService.reset()}>
                                        🎮 Reiniciar Juego
                                    </button>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </section>
    );
};

export default AIExplanation;
