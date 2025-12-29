-- Create game_state table for real-time voting
CREATE TABLE IF NOT EXISTS game_state (
    id TEXT PRIMARY KEY,
    current_question INTEGER DEFAULT 0,
    votes JSONB DEFAULT '{"true": 0, "false": 0}'::jsonb,
    game_state TEXT DEFAULT 'waiting',
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security (RLS)
ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Allow public read access" ON game_state;
DROP POLICY IF EXISTS "Allow public insert access" ON game_state;
DROP POLICY IF EXISTS "Allow public update access" ON game_state;

-- Create policy to allow anyone to read
CREATE POLICY "Allow public read access"
    ON game_state
    FOR SELECT
    TO public
    USING (true);

-- Create policy to allow anyone to insert/update
CREATE POLICY "Allow public insert access"
    ON game_state
    FOR INSERT
    TO public
    WITH CHECK (true);

CREATE POLICY "Allow public update access"
    ON game_state
    FOR UPDATE
    TO public
    USING (true);

-- Insert initial game state
INSERT INTO game_state (id, current_question, votes, game_state)
VALUES ('game-session-1', 0, '{"true": 0, "false": 0}'::jsonb, 'waiting')
ON CONFLICT (id) DO NOTHING;

-- Enable realtime for this table
-- Note: If you get an error that the table is already in the publication,
-- you can safely ignore it or manually remove it first from the Supabase UI

