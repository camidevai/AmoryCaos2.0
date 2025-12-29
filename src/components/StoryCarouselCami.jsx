import { motion } from 'framer-motion';
import { useState } from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import './StoryCarousel.css';

const StoryCarouselCami = () => {
    const [currentSlide, setCurrentSlide] = useState(0);

    const storiesCami = [
        {
            year: "2013",
            title: "¿Hace cuánto no vas al dentista?",
            emoji: "🗂️🧢🗣️",
            video: "/historiaJorgeyCami/captandoClientes.mp4"
        },
        {
            year: "2013",
            title: "Mi cartelito salvador",
            emoji: "📣🪧✨",
            video: "/historiaJorgeyCami/cartelito.mp4"
        },
        {
            year: "2013",
            title: "Y un día… llegó Jorge",
            emoji: "🌸💬🍽️",
            video: "/historiaJorgeyCami/primerEncuentro.mp4"
        },
        {
            year: "2017 - 2021",
            title: "De promotora a jefa de sucursal",
            emoji: "📞📋🧠💼",
            video: "/historiaJorgeyCami/jefaSucursal.mp4"
        },
        {
            year: "2016",
            title: "¿Y si pudiera estudiar informática?",
            emoji: "💡🧢💻👶",
            video: "/historiaJorgeyCami/decisionEstudio.mp4"
        },
        {
            year: "2018",
            title: "Noches de café, código y cariño",
            emoji: "☕👨‍👩‍👧‍👦💻🌙",
            video: "/historiaJorgeyCami/nochesDeEstudio.mp4"
        },
        {
            year: "2021",
            title: "Mi primera vez en el mundo tech real",
            emoji: "💼💻☕📚",
            video: "/historiaJorgeyCami/practicaEntityData.mp4"
        },
        {
            year: "2022",
            title: "Cuando Java me dio miedo",
            emoji: "📚🧠😰💻",
            video: "/historiaJorgeyCami/desafioJava.mp4"
        },
        {
            year: "2022",
            title: "Me grababa para explicarme lo que estaba aprendiendo",
            emoji: "🎥📱👩‍💻💬",
            video: "/historiaJorgeyCami/primerosVideos.mp4"
        },
        {
            year: "2022",
            title: "¡Guau! Tengo 10.000 seguidores",
            emoji: "📈🎤📚❤️",
            video: "/historiaJorgeyCami/seguidores10k.mp4"
        },
        {
            year: "2022",
            title: "Lavando loza, descubrí la Inteligencia Artificial",
            emoji: "🍽️🎧🤯🤖",
            video: "/historiaJorgeyCami/descubrimientoIA.mp4"
        },
        {
            year: "2023",
            title: "Mi primer GPT... y mis rrss explotaron",
            emoji: "🧠📱🤖🚀",
            video: "/historiaJorgeyCami/primerGPT.mp4"
        }
    ];

    const nextSlide = () => {
        setCurrentSlide((prev) => (prev + 1) % storiesCami.length);
    };

    const prevSlide = () => {
        setCurrentSlide((prev) => (prev - 1 + storiesCami.length) % storiesCami.length);
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
                        📖 La Historia de <span className="gradient-text">Cami</span>
                    </h2>
                    <p className="story-intro text-center">
                        De promotora a creadora de contenido tech. Un viaje de transformación.
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
                            {storiesCami[currentSlide].video ? (
                                <video
                                    src={storiesCami[currentSlide].video}
                                    className="story-video"
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                />
                            ) : (
                                <div className="story-emoji">{storiesCami[currentSlide].emoji}</div>
                            )}
                            <div className="story-year">{storiesCami[currentSlide].year}</div>
                            <h3 className="story-title">{storiesCami[currentSlide].title}</h3>
                            <p className="story-description">{storiesCami[currentSlide].description}</p>

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
                    {storiesCami.map((_, index) => (
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
                    <span className="progress-total">{storiesCami.length}</span>
                </div>
            </div>
        </section>
    );
};

export default StoryCarouselCami;

