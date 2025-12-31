-- ============================================
-- SUPABASE REALTIME SETUP COMPLETO
-- ============================================
-- Ejecuta este script en Supabase SQL Editor
-- para configurar todo lo necesario para Realtime
-- ============================================

-- 1. Crear la tabla game_state si no existe
CREATE TABLE IF NOT EXISTS game_state (
    id TEXT PRIMARY KEY,
    current_question INTEGER DEFAULT 0,
    votes JSONB DEFAULT '{"true": 0, "false": 0}'::jsonb,
    game_state TEXT DEFAULT 'waiting',
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 2. Insertar registro inicial si no existe
INSERT INTO game_state (id, current_question, votes, game_state)
VALUES ('game-session-1', 0, '{"true": 0, "false": 0}'::jsonb, 'waiting')
ON CONFLICT (id) DO NOTHING;

-- 3. Habilitar Row Level Security (RLS)
ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

-- 4. Eliminar políticas existentes (si las hay)
DROP POLICY IF EXISTS "Allow public read access" ON game_state;
DROP POLICY IF EXISTS "Allow public write access" ON game_state;
DROP POLICY IF EXISTS "Allow public update access" ON game_state;
DROP POLICY IF EXISTS "Allow public delete access" ON game_state;

-- 5. Crear políticas RLS para acceso público
-- Permitir lectura a todos
CREATE POLICY "Allow public read access"
ON game_state FOR SELECT
TO public
USING (true);

-- Permitir inserción a todos
CREATE POLICY "Allow public write access"
ON game_state FOR INSERT
TO public
WITH CHECK (true);

-- Permitir actualización a todos
CREATE POLICY "Allow public update access"
ON game_state FOR UPDATE
TO public
USING (true);

-- Permitir eliminación a todos (opcional, para reset)
CREATE POLICY "Allow public delete access"
ON game_state FOR DELETE
TO public
USING (true);

-- 6. Crear función para incremento atómico de votos
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

-- 7. Dar permisos de ejecución a la función
GRANT EXECUTE ON FUNCTION increment_vote(TEXT, TEXT, INTEGER) TO public;
GRANT EXECUTE ON FUNCTION increment_vote(TEXT, TEXT, INTEGER) TO anon;
GRANT EXECUTE ON FUNCTION increment_vote(TEXT, TEXT, INTEGER) TO authenticated;

-- 8. Crear índices para mejor performance
CREATE INDEX IF NOT EXISTS idx_game_state_id ON game_state(id);
CREATE INDEX IF NOT EXISTS idx_game_state_updated_at ON game_state(updated_at);

-- ============================================
-- VERIFICACIÓN
-- ============================================

-- Verificar que la tabla existe
SELECT 'Table exists: ' || EXISTS (
    SELECT FROM information_schema.tables 
    WHERE table_name = 'game_state'
)::text;

-- Verificar que RLS está habilitado
SELECT 'RLS enabled: ' || relrowsecurity::text
FROM pg_class
WHERE relname = 'game_state';

-- Verificar políticas
SELECT 'Policies count: ' || COUNT(*)::text
FROM pg_policies
WHERE tablename = 'game_state';

-- Verificar función
SELECT 'Function exists: ' || EXISTS (
    SELECT FROM information_schema.routines 
    WHERE routine_name = 'increment_vote'
)::text;

-- Verificar datos iniciales
SELECT 'Initial data: ' || COUNT(*)::text
FROM game_state
WHERE id = 'game-session-1';

-- ============================================
-- IMPORTANTE: HABILITAR REALTIME
-- ============================================
-- Después de ejecutar este script:
-- 1. Ve a Database → Replication en Supabase Dashboard
-- 2. Busca la tabla 'game_state'
-- 3. Habilita el toggle de Realtime
-- 4. Guarda los cambios
-- ============================================

-- Mostrar estado actual del juego
SELECT 
    id,
    current_question,
    votes,
    game_state,
    updated_at
FROM game_state
WHERE id = 'game-session-1';

