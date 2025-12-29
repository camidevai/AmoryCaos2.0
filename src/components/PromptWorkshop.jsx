import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';
import { FaCheckCircle, FaLightbulb, FaCopy, FaMagic, FaCheck } from 'react-icons/fa';
import './PromptWorkshop.css';

const PromptWorkshop = () => {
    const [formData, setFormData] = useState({
        role: '',
        objective: '',
        format: '',
        constraints: '',
        example: ''
    });

    const [generatedPrompt, setGeneratedPrompt] = useState('');
    const [copied, setCopied] = useState(false);

    const checklist = [
        { id: 1, text: "Define quién debe ser la IA", field: "role" },
        { id: 2, text: "Define qué quieres lograr", field: "objective" },
        { id: 3, text: "Agrega contexto real", field: "constraints" },
        { id: 4, text: "Pide un formato claro", field: "format" },
        { id: 5, text: "Valida paso a paso", field: "example" }
    ];

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const generatePrompt = () => {
        const parts = [];

        if (formData.role) parts.push(`Actúa como ${formData.role}.`);
        if (formData.objective) parts.push(`Tu objetivo principal es: ${formData.objective}.`);
        if (formData.constraints) parts.push(`Contexto adicional y restricciones: ${formData.constraints}.`);
        if (formData.format) parts.push(`Proporciona la respuesta en el siguiente formato: ${formData.format}.`);
        if (formData.example) parts.push(`Aquí tienes un ejemplo de lo que espero: ${formData.example}.`);

        const prompt = parts.join('\n\n');
        setGeneratedPrompt(prompt || 'Por favor, completa al menos un campo para generar tu prompt.');
    };

    const copyToClipboard = () => {
        if (!generatedPrompt) return;
        navigator.clipboard.writeText(generatedPrompt);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };

    const isFieldFilled = (field) => {
        return formData[field] && formData[field].trim() !== '';
    };

    return (
        <section className="section workshop-section" id="taller">
            <div className="container">
                <motion.div
                    className="workshop-header"
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                >
                    <h2 className="text-center">
                        <span className="gradient-text">🛠 Taller Interactivo</span>
                    </h2>
                    <p className="section-subtitle text-center">
                        ¡Haz que la IA trabaje contigo! Aprende a crear prompts efectivos.
                    </p>
                </motion.div>

                <div className="workshop-grid">
                    {/* Columna Izquierda - Checklist */}
                    <motion.div
                        className="workshop-sidebar"
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <div className="card glass-card">
                            <h3 className="card-title">
                                <FaLightbulb className="icon-pulse" /> 5 Pasos Clave
                            </h3>
                            <ul className="workshop-checklist">
                                {checklist.map((item, index) => (
                                    <motion.li
                                        key={item.id}
                                        className={`checklist-item ${isFieldFilled(item.field) ? 'is-completed' : ''}`}
                                        initial={{ opacity: 0, x: -20 }}
                                        whileInView={{ opacity: 1, x: 0 }}
                                        viewport={{ once: true }}
                                        transition={{ delay: 0.3 + index * 0.1 }}
                                    >
                                        <div className="check-wrapper">
                                            {isFieldFilled(item.field) ? <FaCheck /> : <FaCheckCircle />}
                                        </div>
                                        <span>{item.text}</span>
                                    </motion.li>
                                ))}
                            </ul>

                            <div className="tip-box">
                                <p>💡 <strong>Tip:</strong> Los prompts más claros y con contexto dan mejores respuestas.</p>
                            </div>
                        </div>
                    </motion.div>

                    {/* Columna Derecha - Formulario */}
                    <motion.div
                        className="workshop-main"
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6, delay: 0.4 }}
                    >
                        <div className="card builder-card">
                            <h3 className="card-title">🧠 Prompt Builder</h3>
                            <div className="builder-form">
                                <div className="form-group">
                                    <label>Yo soy:</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: un estudiante de marketing digital"
                                        value={formData.role}
                                        onChange={(e) => handleInputChange('role', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Objetivo:</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: crear una estrategia de contenido"
                                        value={formData.objective}
                                        onChange={(e) => handleInputChange('objective', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Formato de salida:</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: lista numerada con 5 pasos"
                                        value={formData.format}
                                        onChange={(e) => handleInputChange('format', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Restricciones:</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: enfocado en Instagram, presupuesto bajo"
                                        value={formData.constraints}
                                        onChange={(e) => handleInputChange('constraints', e.target.value)}
                                    />
                                </div>

                                <div className="form-group">
                                    <label>Ejemplo esperado:</label>
                                    <input
                                        type="text"
                                        placeholder="Ej: similar a campañas de marcas sustentables"
                                        value={formData.example}
                                        onChange={(e) => handleInputChange('example', e.target.value)}
                                    />
                                </div>

                                <button
                                    className="btn btn-primary btn-generate"
                                    onClick={generatePrompt}
                                    disabled={!Object.values(formData).some(v => v.trim() !== '')}
                                >
                                    <FaMagic /> Generar prompt sugerido
                                </button>
                            </div>

                            {/* Resultado Dinámico */}
                            <AnimatePresence>
                                {generatedPrompt && (
                                    <motion.div
                                        className="generated-result"
                                        initial={{ opacity: 0, height: 0, marginTop: 0 }}
                                        animate={{ opacity: 1, height: 'auto', marginTop: 32 }}
                                        exit={{ opacity: 0, height: 0, marginTop: 0 }}
                                        transition={{ duration: 0.5, ease: "circOut" }}
                                    >
                                        <div className="result-header">
                                            <h4>Tu prompt generado:</h4>
                                            <button
                                                className={`btn-copy ${copied ? 'copied' : ''}`}
                                                onClick={copyToClipboard}
                                            >
                                                {copied ? <><FaCheck /> ¡Copiado!</> : <><FaCopy /> Copiar</>}
                                            </button>
                                        </div>
                                        <div className="result-content">
                                            <pre>{generatedPrompt}</pre>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default PromptWorkshop;

