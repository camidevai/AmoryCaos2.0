import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaBug, FaTimes, FaCheckCircle, FaTimesCircle, FaSpinner } from 'react-icons/fa';
import { supabase } from '../lib/supabase';
import './RealtimeDiagnosticPanel.css';

const RealtimeDiagnosticPanel = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [isRunning, setIsRunning] = useState(false);
    const [results, setResults] = useState(null);

    const runDiagnostics = async () => {
        setIsRunning(true);
        const diagnosticResults = {
            connection: { status: 'pending', message: '' },
            tableAccess: { status: 'pending', message: '' },
            subscription: { status: 'pending', message: '' },
            realtimeUpdates: { status: 'pending', message: '' }
        };

        setResults({ ...diagnosticResults });

        // Test 1: Connection
        try {
            const { data, error } = await supabase
                .from('game_state')
                .select('*')
                .limit(1);
            
            if (error) {
                diagnosticResults.connection = { 
                    status: 'error', 
                    message: `Error: ${error.message}` 
                };
            } else {
                diagnosticResults.connection = { 
                    status: 'success', 
                    message: 'Conexión establecida correctamente' 
                };
            }
        } catch (err) {
            diagnosticResults.connection = { 
                status: 'error', 
                message: `Excepción: ${err.message}` 
            };
        }
        setResults({ ...diagnosticResults });

        // Test 2: Table Access
        try {
            const testId = 'diagnostic-test-' + Date.now();
            const { error: insertError } = await supabase
                .from('game_state')
                .insert({
                    id: testId,
                    current_question: 0,
                    votes: { true: 0, false: 0 },
                    game_state: 'waiting'
                });

            if (insertError) {
                diagnosticResults.tableAccess = { 
                    status: 'error', 
                    message: `No se puede escribir: ${insertError.message}` 
                };
            } else {
                diagnosticResults.tableAccess = { 
                    status: 'success', 
                    message: 'Lectura/escritura funcionan correctamente' 
                };
                await supabase.from('game_state').delete().eq('id', testId);
            }
        } catch (err) {
            diagnosticResults.tableAccess = { 
                status: 'error', 
                message: `Error de acceso: ${err.message}` 
            };
        }
        setResults({ ...diagnosticResults });

        // Test 3: Realtime Subscription
        const channel = supabase
            .channel('diagnostic-test')
            .on('postgres_changes',
                { event: '*', schema: 'public', table: 'game_state' },
                (payload) => {
                    console.log('✅ Realtime update received in diagnostic:', payload);
                    diagnosticResults.realtimeUpdates = {
                        status: 'success',
                        message: '¡Realtime funciona! Actualización recibida'
                    };
                    setResults({ ...diagnosticResults });
                }
            )
            .subscribe((status, err) => {
                if (status === 'SUBSCRIBED') {
                    diagnosticResults.subscription = {
                        status: 'success',
                        message: 'Suscripción establecida correctamente'
                    };
                    setResults({ ...diagnosticResults });

                    // Trigger an update to test
                    setTimeout(async () => {
                        await supabase
                            .from('game_state')
                            .upsert({
                                id: 'game-session-1',
                                current_question: 0,
                                votes: { true: Math.floor(Math.random() * 100), false: 0 },
                                game_state: 'waiting',
                                updated_at: new Date().toISOString()
                            });

                        // Wait for update
                        setTimeout(() => {
                            if (diagnosticResults.realtimeUpdates.status === 'pending') {
                                diagnosticResults.realtimeUpdates = {
                                    status: 'error',
                                    message: '❌ Realtime NO está habilitado en la tabla game_state'
                                };
                                setResults({ ...diagnosticResults });
                            }
                            channel.unsubscribe();
                            setIsRunning(false);
                        }, 3000);
                    }, 1000);
                } else if (status === 'CHANNEL_ERROR') {
                    diagnosticResults.subscription = {
                        status: 'error',
                        message: `Error de canal: ${err}`
                    };
                    setResults({ ...diagnosticResults });
                    setIsRunning(false);
                }
            });
    };

    const getStatusIcon = (status) => {
        if (status === 'success') return <FaCheckCircle className="status-icon success" />;
        if (status === 'error') return <FaTimesCircle className="status-icon error" />;
        return <FaSpinner className="status-icon pending spin" />;
    };

    return (
        <>
            <button 
                className="diagnostic-trigger"
                onClick={() => setIsOpen(true)}
                title="Diagnóstico de Realtime"
            >
                <FaBug />
            </button>

            <AnimatePresence>
                {isOpen && (
                    <motion.div
                        className="diagnostic-backdrop"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={() => setIsOpen(false)}
                    >
                        <motion.div
                            className="diagnostic-panel"
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="diagnostic-header">
                                <h3>🔍 Diagnóstico de Realtime</h3>
                                <button onClick={() => setIsOpen(false)}>
                                    <FaTimes />
                                </button>
                            </div>

                            <div className="diagnostic-body">
                                {!results && (
                                    <div className="diagnostic-intro">
                                        <p>Este diagnóstico verificará:</p>
                                        <ul>
                                            <li>✓ Conexión a Supabase</li>
                                            <li>✓ Acceso a la tabla game_state</li>
                                            <li>✓ Suscripción de Realtime</li>
                                            <li>✓ Recepción de actualizaciones</li>
                                        </ul>
                                    </div>
                                )}

                                {results && (
                                    <div className="diagnostic-results">
                                        <div className="diagnostic-test">
                                            {getStatusIcon(results.connection.status)}
                                            <div>
                                                <strong>Conexión a Supabase</strong>
                                                <p>{results.connection.message}</p>
                                            </div>
                                        </div>

                                        <div className="diagnostic-test">
                                            {getStatusIcon(results.tableAccess.status)}
                                            <div>
                                                <strong>Acceso a tabla game_state</strong>
                                                <p>{results.tableAccess.message}</p>
                                            </div>
                                        </div>

                                        <div className="diagnostic-test">
                                            {getStatusIcon(results.subscription.status)}
                                            <div>
                                                <strong>Suscripción Realtime</strong>
                                                <p>{results.subscription.message}</p>
                                            </div>
                                        </div>

                                        <div className="diagnostic-test">
                                            {getStatusIcon(results.realtimeUpdates.status)}
                                            <div>
                                                <strong>Actualizaciones en Tiempo Real</strong>
                                                <p>{results.realtimeUpdates.message}</p>
                                            </div>
                                        </div>

                                        {results.realtimeUpdates.status === 'error' && (
                                            <div className="diagnostic-solution">
                                                <h4>📝 Solución:</h4>
                                                <ol>
                                                    <li>Ve a Supabase Dashboard</li>
                                                    <li>Database → Replication</li>
                                                    <li>Habilita Realtime para "game_state"</li>
                                                    <li>Guarda y vuelve a probar</li>
                                                </ol>
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>

                            <div className="diagnostic-footer">
                                <button 
                                    className="btn btn-primary"
                                    onClick={runDiagnostics}
                                    disabled={isRunning}
                                >
                                    {isRunning ? 'Ejecutando...' : 'Ejecutar Diagnóstico'}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </>
    );
};

export default RealtimeDiagnosticPanel;

