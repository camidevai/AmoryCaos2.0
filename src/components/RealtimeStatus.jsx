import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaWifi, FaExclamationTriangle } from 'react-icons/fa';
import './RealtimeStatus.css';

const RealtimeStatus = ({ gameState }) => {
    const [isConnected, setIsConnected] = useState(true);
    const [lastUpdate, setLastUpdate] = useState(Date.now());
    const [showWarning, setShowWarning] = useState(false);

    useEffect(() => {
        // Update last update time when gameState changes
        setLastUpdate(Date.now());
        setIsConnected(true);
        setShowWarning(false);
    }, [gameState]);

    useEffect(() => {
        // Check if we haven't received updates in a while
        const interval = setInterval(() => {
            const timeSinceUpdate = Date.now() - lastUpdate;
            if (timeSinceUpdate > 30000) { // 30 seconds
                setShowWarning(true);
            }
        }, 5000);

        return () => clearInterval(interval);
    }, [lastUpdate]);

    return (
        <AnimatePresence>
            {showWarning && (
                <motion.div
                    className="realtime-status realtime-warning"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                >
                    <FaExclamationTriangle />
                    <span>Conexión lenta - Refresca la página si no ves actualizaciones</span>
                </motion.div>
            )}
            
            {!showWarning && (
                <motion.div
                    className="realtime-status realtime-connected"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <FaWifi />
                    <span>Conectado en tiempo real</span>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default RealtimeStatus;

