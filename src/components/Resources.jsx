import { motion } from 'framer-motion';
import { FaRobot, FaInstagram, FaMicrophone } from 'react-icons/fa';
import './Resources.css';

const Resources = ({ onContactClick }) => {
    const resources = [
        {
            icon: <FaRobot />,
            title: "Agente Metaprompter",
            description: "GPT personalizado que te ayuda a crear prompts efectivos y optimizados.",
            cta: "Probar ahora",
            url: "https://chatgpt.com/g/g-673cd7b9d09c8191bea546e97047b58e-metaprompter",
            color: "primary"
        },
        {
            icon: <FaInstagram />,
            title: "Instagram @camidevai",
            description: "Sígueme en Instagram donde comparto muchos recursos, tips y contenido sobre IA.",
            cta: "Seguir en Instagram",
            url: "https://www.instagram.com/camidevai/",
            color: "warm"
        },
        {
            icon: <FaMicrophone />,
            title: "Solicita esta Charla",
            description: "¿Te gustaría que llevemos esta charla a tu empresa, universidad o evento? ¡Contáctanos!",
            cta: "Contactar con nosotros",
            isContact: true,
            color: "primary"
        }
    ];

    return (
        <section className="resources-section section">
            <div className="container">
                <motion.div
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.6 }}
                >
                    <h2 className="text-center mb-md">
                        📚 Recursos para <span className="gradient-text">seguir aprendiendo</span>
                    </h2>
                    <p className="resources-intro text-center">
                        Todo lo que necesitas para continuar tu viaje en el mundo de la Inteligencia Artificial.
                    </p>
                </motion.div>

                {/* Resources Grid */}
                <div className="resources-grid">
                    {resources.map((resource, index) => (
                        <motion.div
                            key={index}
                            className={`resource-card resource-card-${resource.color}`}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1, duration: 0.5 }}
                            whileHover={{ y: -10 }}
                        >
                            <div className="resource-icon-wrapper">
                                <div className="resource-icon">{resource.icon}</div>
                            </div>
                            <h3 className="resource-title">{resource.title}</h3>
                            <p className="resource-description">{resource.description}</p>
                            {resource.isContact ? (
                                <button
                                    onClick={onContactClick}
                                    className={`btn btn-resource btn-${resource.color}`}
                                >
                                    {resource.cta}
                                </button>
                            ) : (
                                <a
                                    href={resource.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={`btn btn-resource btn-${resource.color}`}
                                >
                                    {resource.cta}
                                </a>
                            )}
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Resources;
