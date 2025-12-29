# 🔧 Instrucciones para Configurar Supabase

## ⚠️ IMPORTANTE: Ejecutar Script SQL

Para que el sistema de votación funcione correctamente, **DEBES ejecutar el siguiente script SQL en Supabase**:

### 📝 Pasos:

1. **Abre Supabase Dashboard**: https://supabase.com/dashboard
2. **Ve a tu proyecto**: `avqcfefaershlcffzotw`
3. **Abre el SQL Editor**: En el menú lateral, haz clic en "SQL Editor"
4. **Crea una nueva query**: Haz clic en "New query"
5. **Copia y pega** el contenido del archivo `supabase-increment-vote.sql`
6. **Ejecuta el script**: Haz clic en "Run" o presiona `Ctrl + Enter`

### 📄 Script a ejecutar:

```sql
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
```

### ✅ Verificación:

Después de ejecutar el script, deberías ver el mensaje:
```
Success. No rows returned
```

Esto significa que la función se creó correctamente.

---

## 🎯 ¿Qué hace este script?

Este script crea una **función PostgreSQL** que permite incrementar los votos de forma **atómica**, evitando que múltiples usuarios votando al mismo tiempo sobrescriban los votos de otros.

### Problema que resuelve:

**Sin la función:**
- Usuario 1 vota "Verdadero" → Lee votos: {true: 0, false: 0} → Guarda: {true: 1, false: 0}
- Usuario 2 vota "Falso" al mismo tiempo → Lee votos: {true: 0, false: 0} → Guarda: {true: 0, false: 1}
- **Resultado**: Solo se cuenta el último voto (se pierde el voto del Usuario 1)

**Con la función:**
- Usuario 1 vota "Verdadero" → Incrementa atómicamente → {true: 1, false: 0}
- Usuario 2 vota "Falso" → Incrementa atómicamente → {true: 1, false: 1}
- **Resultado**: Ambos votos se cuentan correctamente ✅

---

## 🚀 Cambios Implementados

### ✅ Problema 1: Prevención de votos duplicados
- **Solución**: Sistema de localStorage que guarda qué preguntas ya fueron votadas
- **Comportamiento**: Si el usuario ya votó, se muestra un mensaje de confirmación
- **Feedback visual**: Mensaje "✅ ¡Tu voto ha sido registrado!"

### ✅ Problema 2: Conteo correcto de votos
- **Solución**: Función SQL `increment_vote()` para incremento atómico
- **Comportamiento**: Los votos se suman correctamente sin sobrescribirse
- **Fallback**: Si la función RPC falla, recarga el estado y usa incremento manual

### ✅ Problema 3: Sincronización en tiempo real
- **Solución**: Ya estaba implementada correctamente con Supabase Realtime
- **Comportamiento**: Todos los clientes ven los cambios automáticamente
- **Verificación**: Cuando el presentador hace clic en "Mostrar Respuesta", todos ven los resultados

---

## 🧪 Cómo Probar

### 1. Probar prevención de votos duplicados:
1. Abre la app en modo votación: `http://localhost:5173/?mode=vote`
2. Inicia una pregunta desde el modo presentador
3. Vota una vez → Deberías ver "✅ ¡Tu voto ha sido registrado!"
4. Intenta votar de nuevo → Deberías ver el mensaje de confirmación (no botones)

### 2. Probar conteo correcto de votos:
1. Abre 3 pestañas en modo votación
2. Vota "Verdadero" en 2 pestañas
3. Vota "Falso" en 1 pestaña
4. Verifica en el presentador: Debería mostrar 2 votos verdadero, 1 voto falso

### 3. Probar sincronización en tiempo real:
1. Abre el presentador en una pestaña
2. Abre el modo votación en otra pestaña
3. Haz clic en "Mostrar Respuesta" en el presentador
4. Verifica que la pestaña de votación muestre automáticamente los resultados

---

## 📞 Soporte

Si tienes problemas:
1. Verifica que ejecutaste el script SQL en Supabase
2. Revisa la consola del navegador (F12) para ver errores
3. Verifica que la conexión a Supabase esté activa

