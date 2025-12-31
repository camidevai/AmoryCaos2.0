import { supabase } from '../lib/supabase';

// Real-time game service with Supabase
class GameService {
    constructor() {
        this.currentQuestion = 0;
        this.votes = { true: 0, false: 0 };
        this.gameState = 'waiting'; // waiting, voting, results
        this.listeners = [];
        this.gameId = 'game-session-1'; // Single game session
        this.initialized = false;
        this.subscription = null;
    }

    // Initialize Supabase connection
    async init() {
        if (this.initialized) return;

        try {
            // Load current game state from Supabase
            await this.loadGameState();

            // Subscribe to real-time changes with better error handling
            this.subscription = supabase
                .channel('game-changes', {
                    config: {
                        broadcast: { self: false },
                        presence: { key: '' }
                    }
                })
                .on('postgres_changes',
                    {
                        event: '*',
                        schema: 'public',
                        table: 'game_state',
                        filter: `id=eq.${this.gameId}`
                    },
                    (payload) => {
                        console.log('🔄 Realtime update received:', payload);
                        console.log('📊 New data:', payload.new);
                        this.handleRealtimeUpdate(payload.new);
                    }
                )
                .subscribe((status, err) => {
                    if (status === 'SUBSCRIBED') {
                        console.log('✅ Realtime subscription active');
                    }
                    if (status === 'CHANNEL_ERROR') {
                        console.error('❌ Realtime subscription error:', err);
                    }
                    if (status === 'TIMED_OUT') {
                        console.error('⏱️ Realtime subscription timed out');
                    }
                    console.log('📡 Subscription status:', status);
                });

            this.initialized = true;
            console.log('✅ GameService initialized with Supabase');
            console.log('🎮 Game ID:', this.gameId);
        } catch (error) {
            console.error('❌ Error initializing GameService:', error);
        }
    }

    // Load game state from Supabase
    async loadGameState() {
        const { data, error } = await supabase
            .from('game_state')
            .select('*')
            .eq('id', this.gameId)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 = not found
            console.error('Error loading game state:', error);
            return;
        }

        if (data) {
            this.currentQuestion = data.current_question;
            this.votes = data.votes || { true: 0, false: 0 };
            this.gameState = data.game_state;
            this.notify();
        }
    }

    // Handle real-time updates from Supabase
    handleRealtimeUpdate(newData) {
        if (!newData) {
            console.warn('⚠️ Received empty realtime update');
            return;
        }

        console.log('🔄 Updating local state from realtime:');
        console.log('  - Question:', newData.current_question);
        console.log('  - Votes:', newData.votes);
        console.log('  - Phase:', newData.game_state);

        const oldState = this.gameState;
        const oldVotes = this.votes.true + this.votes.false;

        this.currentQuestion = newData.current_question;
        this.votes = newData.votes || { true: 0, false: 0 };
        this.gameState = newData.game_state;

        const newVotes = this.votes.true + this.votes.false;

        // Log significant changes
        if (oldState !== this.gameState) {
            console.log(`🎯 Phase changed: ${oldState} → ${this.gameState}`);
        }
        if (oldVotes !== newVotes) {
            console.log(`📊 Votes updated: ${oldVotes} → ${newVotes}`);
        }

        this.notify();
    }

    // Save game state to Supabase
    async saveGameState() {
        console.log('💾 Saving game state to Supabase:', {
            question: this.currentQuestion,
            votes: this.votes,
            phase: this.gameState
        });

        const { data, error } = await supabase
            .from('game_state')
            .upsert({
                id: this.gameId,
                current_question: this.currentQuestion,
                votes: this.votes,
                game_state: this.gameState,
                updated_at: new Date().toISOString()
            })
            .select();

        if (error) {
            console.error('❌ Error saving game state:', error);
        } else {
            console.log('✅ Game state saved successfully:', data);
        }
    }

    // Subscribe to changes
    subscribe(callback) {
        this.listeners.push(callback);
        return () => {
            this.listeners = this.listeners.filter(cb => cb !== callback);
        };
    }

    // Notify all listeners
    notify() {
        this.listeners.forEach(callback => callback(this.getState()));
    }

    // Get current state
    getState() {
        return {
            currentQuestion: this.currentQuestion,
            votes: this.votes,
            gameState: this.gameState,
            totalVotes: (this.votes.true || 0) + (this.votes.false || 0)
        };
    }

    // Start a new question
    async startQuestion(questionIndex) {
        this.currentQuestion = questionIndex;
        this.votes = { true: 0, false: 0 };
        this.gameState = 'voting';
        await this.saveGameState();
        this.notify();
    }

    // Submit a vote with duplicate prevention
    async vote(answer) {
        if (this.gameState !== 'voting') return false;

        // Check if user already voted for this question
        const voteKey = `voted_q${this.currentQuestion}`;
        const hasVoted = localStorage.getItem(voteKey);

        if (hasVoted) {
            console.log('User already voted for this question');
            return false;
        }

        // Use Supabase RPC for atomic increment to prevent race conditions
        const key = answer.toString();
        const { data, error } = await supabase.rpc('increment_vote', {
            game_id: this.gameId,
            vote_key: key,
            increment_by: 1
        });

        if (error) {
            console.error('Error voting:', error);
            // Fallback to manual increment if RPC fails
            await this.loadGameState(); // Reload to get latest state
            this.votes[key] = (this.votes[key] || 0) + 1;
            await this.saveGameState();
        }

        // Mark this question as voted
        localStorage.setItem(voteKey, 'true');

        // Reload state to get updated votes
        await this.loadGameState();
        this.notify();
        return true;
    }

    // Show results
    async showResults() {
        console.log('🏆 Showing results - transitioning to results phase');
        this.gameState = 'results';
        await this.saveGameState();
        this.notify();
        console.log('✅ Results phase activated - all clients should update');
    }

    // Reset game
    async reset() {
        this.currentQuestion = 0;
        this.votes = { true: 0, false: 0 };
        this.gameState = 'waiting';
        await this.saveGameState();
        this.notify();
    }

    // Get vote percentage
    getPercentages() {
        const total = this.getState().totalVotes;
        if (total === 0) return { true: 0, false: 0 };

        return {
            true: Math.round((this.votes.true || 0) / total * 100),
            false: Math.round((this.votes.false || 0) / total * 100)
        };
    }

    // Cleanup
    cleanup() {
        if (this.subscription) {
            supabase.removeChannel(this.subscription);
        }
    }
}

// Singleton instance
const gameService = new GameService();

export default gameService;

