import { motion, AnimatePresence } from 'framer-motion';
import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaExclamationCircle, FaTimes } from 'react-icons/fa';
import './Contact.css';

const Contact = forwardRef(({ isOpen, onClose }, ref) => {
  const form = useRef();
  const messageTextarea = useRef();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    openModal: () => {
      // Modal will be controlled by parent
    },
    fillMessage: (message) => {
      if (messageTextarea.current) {
        messageTextarea.current.value = message;
        messageTextarea.current.focus();
      }
    }
  }));

  const sendEmail = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: '', message: '' });

    emailjs
      .sendForm(
        'service_36njoej',
        'template_8cnaynh',
        form.current,
        'ZVGJx9uctE_WXjEPB'
      )
      .then(
        () => {
          setStatus({
            type: 'success',
            message: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto ✅'
          });
          form.current.reset();
          setTimeout(() => {
            onClose();
            setStatus({ type: '', message: '' });
          }, 2000);
        },
        (error) => {
          setStatus({
            type: 'error',
            message: 'Error al enviar el mensaje. Por favor, intenta de nuevo ❌'
          });
          console.error('Error:', error.text);
        }
      )
      .finally(() => {
        setIsSubmitting(false);
      });
  };

  if (!isOpen) return null;

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="contact-modal-backdrop" onClick={onClose}>
          <motion.div
            className="contact-modal-content"
            onClick={(e) => e.stopPropagation()}
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ duration: 0.3 }}
          >
            <div className="contact-modal-header">
              <div className="contact-modal-title">
                <FaEnvelope className="contact-icon-small" />
                <h2>💬 <span className="gradient-text">Trabajemos Juntos</span></h2>
              </div>
              <button onClick={onClose} className="contact-modal-close">
                <FaTimes />
              </button>
            </div>

            <div className="contact-modal-body">
              <p className="contact-modal-subtitle">
                ¿Listo para llevar esta charla a tu empresa, universidad o evento? ¡Contáctanos hoy!
              </p>

              <form ref={form} onSubmit={sendEmail} className="contact-form">
                <div className="form-row">
                  <div className="form-group">
                    <label className="form-label">Nombre del Cliente</label>
                    <input
                      type="text"
                      name="from_name"
                      required
                      className="form-input"
                      placeholder="Tu nombre"
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Correo Electrónico</label>
                    <input
                      type="email"
                      name="reply_to"
                      required
                      className="form-input"
                      placeholder="tu@email.com"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Empresa/Nombre del Proyecto</label>
                  <input
                    type="text"
                    name="brand_name"
                    required
                    className="form-input"
                    placeholder="Nombre de tu empresa o proyecto"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">Descripción del Proyecto</label>
                  <textarea
                    ref={messageTextarea}
                    name="message"
                    rows="6"
                    required
                    className="form-textarea"
                    placeholder="Cuéntanos sobre tu proyecto, objetivos y cualquier detalle relevante..."
                  ></textarea>
                </div>

                {status.message && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={`status-message status-${status.type}`}
                  >
                    {status.type === 'success' ? (
                      <FaCheckCircle className="status-icon" />
                    ) : (
                      <FaExclamationCircle className="status-icon" />
                    )}
                    <span>{status.message}</span>
                  </motion.div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="btn btn-primary btn-cta btn-submit"
                >
                  {isSubmitting ? (
                    <>
                      <div className="spinner"></div>
                      Enviando...
                    </>
                  ) : (
                    <>
                      Enviar Mensaje
                      <FaPaperPlane />
                    </>
                  )}
                </button>
              </form>

              <div className="contact-modal-footer">
                <p>También puedes contactarnos directamente en:</p>
                <a
                  href="mailto:camidevai@gmail.com"
                  className="contact-email"
                >
                  camidevai@gmail.com
                </a>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
});

Contact.displayName = 'Contact';

export default Contact;


