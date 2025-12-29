import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './StoryCarousel.css';

const StoryCarouselDaniel = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const storiesDaniel = [
        {
            year: "2012",
            title: "Salí de la U… y no me sentía preparado",
            emoji: "🎓😶‍🌫️",
            video: "/historiaDaniel/ufroSalida.mp4"
        },
        {
            year: "2012",
            title: "Mi primer choque con la realidad",
            emoji: "🏢💥",
            video: "/historiaDaniel/everis.mp4"
        },
        {
            year: "2013 - 2020",
            title: "Estabilidad… y zona de confort",
            emoji: "🛠️📊⏳",
            video: "/historiaDaniel/aguasAraucania.mp4"
        },
        {
            year: "2021",
            title: "Un día me miré al espejo",
            emoji: "🪞🔥",
            video: "/historiaDaniel/quiebre.mp4"
        },
        {
            year: "2022",
            title: "Volví a estudiar de verdad",
            emoji: "📚🧠",
            video: "/historiaDaniel/estudioBackend.mp4"
        },
        {
            year: "2023",
            title: "Trabajar con gigantes",
            emoji: "🏦💼🚀",
            video: "/historiaDaniel/citibank.mp4"
        },
        {
            year: "2023",
            title: "Volvimos a estudiar. Juntos.",
            emoji: "📚👫💻",
            video: "/historiaDaniel/estudioIA.mp4"
        },
        {
            year: "2023",
            title: "Cami se convirtió en CamiDevAI",
            emoji: "🎥📚💙",
            video: "/historiaDaniel/camiDevAI.mp4"
        },
        {
            year: "2023",
            title: "Creamos informatik-ai",
            emoji: "🎥📚💙",
            video: "/historiaDaniel/informatik-ai.mp4"
        },
        {
            year: "2024",
            title: "Nos dimos cuenta de que no estábamos solos",
            emoji: "🔥🤝🌱",
            video: "/historiaDaniel/ecosistemaIA.mp4"
        },
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % storiesDaniel.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + storiesDaniel.length) % storiesDaniel.length);
    };

    const goToSlide = (index) => {
        setCurrentSlide(index);
    };

    return (
        <section className="story-section section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-center mb-lg">
                        🎯 La Historia de <span className="gradient-text">Daniel</span>
                    </h2>
                    <p className="story-intro text-center">
                        De ingeniero en zona de confort a desarrollador en constante evolución.
                    </p>
                </motion.div>

                <div className="carousel-container">
                    {/* Navigation Arrows */}
                    <button
                        className="carousel-arrow carousel-arrow-left"
                        onClick={prevSlide}
                        aria-label="Anterior"
                    >
                        <FaChevronLeft />
                    </button>

                    {/* Carousel Content */}
                    <div className="carousel-content">
                        <motion.div
                            key={currentSlide}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="story-card"
                        >
                            {storiesDaniel[currentSlide].video ? (
                                <video
                                    src={storiesDaniel[currentSlide].video}
                                    className="story-video"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <div className="story-emoji">{storiesDaniel[currentSlide].emoji}</div>
                            )}
                            <div className="story-year">{storiesDaniel[currentSlide].year}</div>
                            <h3 className="story-title">{storiesDaniel[currentSlide].title}</h3>
                            <p className="story-description">{storiesDaniel[currentSlide].description}</p>

                            {/* Comic-style decoration */}
                            <div className="comic-border"></div>
                        </motion.div>
                    </div>

                    <button
                        className="carousel-arrow carousel-arrow-right"
                        onClick={nextSlide}
                        aria-label="Siguiente"
                    >
                        <FaChevronRight />
                    </button>
                </div>

                {/* Navigation Dots */}
                <div className="carousel-dots">
                    {storiesDaniel.map((_, index) => (
                        <button
                            key={index}
                            className={`dot ${index === currentSlide ? 'dot-active' : ''}`}
                            onClick={() => goToSlide(index)}
                            aria-label={`Ir a slide ${index + 1}`}
                        />
                    ))}
                </div>

                {/* Progress Indicator */}
                <div className="carousel-progress">
                    <span className="progress-current">{currentSlide + 1}</span>
                    <span className="progress-separator">/</span>
                    <span className="progress-total">{storiesDaniel.length}</span>
                </div>
            </div>
        </section>
    );
};

export default StoryCarouselDaniel;

