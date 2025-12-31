/**
 * SISTEMA DE VOTACIÓN SIMPLE - DESDE CERO
 * Sin Supabase, sin complejidad, solo funcionalidad básica
 */

class SimpleGameService {
    constructor() {
        // Estado del juego
        this.currentQuestion = 0;
        this.votes = { true: 0, false: 0 };
        this.gameState = 'waiting'; // waiting, voting, results
        
        // Listeners para notificar cambios
        this.listeners = [];
        
        // Simular persistencia con localStorage
        this.storageKey = 'game_state';
        
        // Cargar estado guardado
        this.loadFromStorage();
        
        console.log('✅ SimpleGameService initialized');
    }

    // Cargar estado desde localStorage
    loadFromStorage() {
        try {
            const saved = localStorage.getItem(this.storageKey);
            if (saved) {
                const state = JSON.parse(saved);
                this.currentQuestion = state.currentQuestion || 0;
                this.votes = state.votes || { true: 0, false: 0 };
                this.gameState = state.gameState || 'waiting';
                console.log('📂 Loaded state from storage:', state);
            }
        } catch (error) {
            console.error('Error loading state:', error);
        }
    }

    // Guardar estado en localStorage
    saveToStorage() {
        try {
            const state = {
                currentQuestion: this.currentQuestion,
                votes: this.votes,
                gameState: this.gameState,
                timestamp: Date.now()
            };
            localStorage.setItem(this.storageKey, JSON.stringify(state));
            console.log('💾 Saved state to storage:', state);
        } catch (error) {
            console.error('Error saving state:', error);
        }
    }

    // Obtener estado actual
    getState() {
        return {
            currentQuestion: this.currentQuestion,
            votes: { ...this.votes },
            gameState: this.gameState,
            totalVotes: this.votes.true + this.votes.false
        };
    }

    // Suscribirse a cambios
    subscribe(callback) {
        this.listeners.push(callback);
        console.log('👂 New listener subscribed. Total listeners:', this.listeners.length);
        
        // Retornar función para desuscribirse
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
            console.log('👋 Listener unsubscribed. Total listeners:', this.listeners.length);
        };
    }

    // Notificar a todos los listeners
    notify() {
        const state = this.getState();
        console.log('📢 Notifying listeners:', state);
        this.listeners.forEach(callback => {
            try {
                callback(state);
            } catch (error) {
                console.error('Error in listener callback:', error);
            }
        });
    }

    // Iniciar una pregunta
    startQuestion(questionIndex) {
        console.log('🎮 Starting question:', questionIndex);
        
        this.currentQuestion = questionIndex;
        this.votes = { true: 0, false: 0 };
        this.gameState = 'voting';
        
        this.saveToStorage();
        this.notify();
        
        console.log('✅ Question started:', this.getState());
    }

    // Votar
    vote(answer) {
        console.log('🗳️ Vote received:', answer);
        
        // Verificar que estamos en fase de votación
        if (this.gameState !== 'voting') {
            console.log('❌ Cannot vote: game state is', this.gameState);
            return false;
        }

        // Verificar si ya votó (localStorage)
        const voteKey = `voted_q${this.currentQuestion}`;
        if (localStorage.getItem(voteKey)) {
            console.log('❌ User already voted for question', this.currentQuestion);
            return false;
        }

        // Registrar voto
        const key = answer.toString();
        this.votes[key] = this.votes[key] + 1;
        
        // Marcar como votado
        localStorage.setItem(voteKey, 'true');
        
        // Guardar y notificar
        this.saveToStorage();
        this.notify();
        
        console.log('✅ Vote registered:', this.getState());
        return true;
    }

    // Mostrar resultados
    showResults() {
        console.log('🏆 Showing results');
        
        this.gameState = 'results';
        
        this.saveToStorage();
        this.notify();
        
        console.log('✅ Results shown:', this.getState());
    }

    // Resetear juego
    reset() {
        console.log('🔄 Resetting game');
        
        this.currentQuestion = 0;
        this.votes = { true: 0, false: 0 };
        this.gameState = 'waiting';
        
        this.saveToStorage();
        this.notify();
        
        console.log('✅ Game reset');
    }

    // Obtener porcentajes
    getPercentages() {
        const total = this.votes.true + this.votes.false;
        if (total === 0) return { true: 0, false: 0 };

        return {
            true: Math.round((this.votes.true / total) * 100),
            false: Math.round((this.votes.false / total) * 100)
        };
    }
}

// Exportar instancia única (singleton)
const gameService = new SimpleGameService();
export default gameService;

