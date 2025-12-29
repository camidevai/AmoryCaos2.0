-- Create a PostgreSQL function for atomic vote increment
-- This prevents race conditions when multiple users vote simultaneously

CREATE OR REPLACE FUNCTION increment_vote(
    game_id TEXT,
    vote_key TEXT,
    increment_by INTEGER DEFAULT 1
)
RETURNS void
LANGUAGE plpgsql
AS $$
BEGIN
    -- Update the votes JSONB field atomically
    UPDATE game_state
    SET 
        votes = jsonb_set(
            votes,
            ARRAY[vote_key],
            to_jsonb(COALESCE((votes->vote_key)::int, 0) + increment_by)
        ),
        updated_at = NOW()
    WHERE id = game_id;
END;
$$;

-- Grant execute permission to public (since we're using RLS)
GRANT EXECUTE ON FUNCTION increment_vote(TEXT, TEXT, INTEGER) TO public;

