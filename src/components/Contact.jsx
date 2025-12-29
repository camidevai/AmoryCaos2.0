import { motion } from 'framer-motion';
import { useRef, useState, forwardRef, useImperativeHandle } from 'react';
import emailjs from '@emailjs/browser';
import { FaEnvelope, FaPaperPlane, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import './Contact.css';

const Contact = forwardRef((props, ref) => {
  const form = useRef();
  const messageTextarea = useRef();
  const [status, setStatus] = useState({ type: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Expose methods to parent components
  useImperativeHandle(ref, () => ({
    scrollToForm: () => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Focus on message field after scroll
        setTimeout(() => {
          if (messageTextarea.current) {
            messageTextarea.current.focus();
          }
        }, 1000);
      }
    },
    fillMessage: (message) => {
      if (messageTextarea.current) {
        messageTextarea.current.value = message;
        messageTextarea.current.focus();
      }
    },
    scrollAndFill: (message) => {
      const contactSection = document.getElementById('contact');
      if (contactSection) {
        contactSection.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
        // Fill message and focus after scroll
        setTimeout(() => {
          if (messageTextarea.current) {
            messageTextarea.current.value = message;
            messageTextarea.current.focus();
            // Position cursor at the end
            messageTextarea.current.setSelectionRange(message.length, message.length);
          }
        }, 1000);
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
        setTimeout(() => setStatus({ type: '', message: '' }), 5000);
      });
  };

  return (
    <section id="contact" className="contact-section section">
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-lg"
        >
          <FaEnvelope className="contact-icon" />
          <h2 className="text-center mb-md">
            💬 <span className="gradient-text">Trabajemos Juntos</span>
          </h2>
          <p className="section-subtitle">
            ¿Listo para llevar esta charla a tu empresa, universidad o evento? ¡Contáctanos hoy!
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="contact-form-wrapper"
        >
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
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="contact-footer"
        >
          <p>También puedes contactarnos directamente en:</p>
          <a
            href="mailto:camidevai@gmail.com"
            className="contact-email"
          >
            camidevai@gmail.com
          </a>
        </motion.div>
      </div>
    </section>
  );
});

Contact.displayName = 'Contact';

export default Contact;


