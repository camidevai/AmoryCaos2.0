# 🔄 Guía de Troubleshooting - Supabase Realtime

## 🎯 Problema: Los participantes no ven actualizaciones en tiempo real

### Síntomas:
1. ❌ Al hacer clic en "Mostrar Respuesta", los participantes no ven los resultados automáticamente
2. ❌ El contador "📊 Votos en vivo" no se actualiza cuando otros votan
3. ❌ Los participantes tienen que refrescar manualmente la página

---

## ✅ Solución Paso a Paso

### **Paso 1: Verificar la Clave de Supabase**

La clave actual en `src/lib/supabase.js` es **INCORRECTA**:
```javascript
const supabaseAnonKey = 'sb_publishable_6RkYpetmpWtSCSKOZ1kr9g_vlhbVmfE';
```

**Esta NO es una clave JWT válida de Supabase.**

#### Cómo obtener la clave correcta:

1. Ve a tu proyecto en Supabase: https://supabase.com/dashboard
2. Selecciona tu proyecto
3. Ve a **Settings** (⚙️) → **API**
4. Copia la clave **`anon` / `public`** que empieza con `eyJ...`
5. Reemplaza en `src/lib/supabase.js`:

```javascript
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...'; // Tu clave real
```

---

### **Paso 2: Habilitar Realtime en la Tabla**

1. Ve a Supabase Dashboard → **Database** → **Replication**
2. Busca la tabla `game_state`
3. **Habilita** la opción de Realtime para esta tabla
4. Asegúrate de que esté marcada con un ✅

---

### **Paso 3: Verificar Row Level Security (RLS)**

La tabla `game_state` debe tener políticas que permitan:
- ✅ **SELECT** (lectura) para todos
- ✅ **INSERT/UPDATE** (escritura) para todos

#### SQL para configurar RLS:

```sql
-- Habilitar RLS
ALTER TABLE game_state ENABLE ROW LEVEL SECURITY;

-- Permitir lectura a todos
CREATE POLICY "Allow public read access"
ON game_state FOR SELECT
TO public
USING (true);

-- Permitir escritura a todos
CREATE POLICY "Allow public write access"
ON game_state FOR INSERT
TO public
WITH CHECK (true);

CREATE POLICY "Allow public update access"
ON game_state FOR UPDATE
TO public
USING (true);
```

---

### **Paso 4: Verificar la Función `increment_vote`**

Asegúrate de que la función SQL existe:

```sql
-- Verificar si existe
SELECT routine_name 
FROM information_schema.routines 
WHERE routine_name = 'increment_vote';
```

Si no existe, ejecuta el archivo `supabase-increment-vote.sql`.

---

## 🧪 Cómo Probar que Realtime Funciona

### Test 1: Verificar Suscripción

1. Abre la consola del navegador (F12)
2. Busca estos mensajes:
   ```
   ✅ GameService initialized with Supabase
   📡 Subscription status: SUBSCRIBED
   ✅ Realtime subscription active
   ```

3. Si ves `CHANNEL_ERROR` o `TIMED_OUT`, hay un problema con la configuración.

### Test 2: Probar Actualización de Fase

1. Abre **2 pestañas**:
   - Pestaña A: Modo presentador (`http://localhost:5173`)
   - Pestaña B: Modo votación (`http://localhost:5173/?mode=vote`)

2. En Pestaña A (presentador):
   - Inicia una pregunta
   - Haz clic en "Mostrar Respuesta"

3. En Pestaña B (votación):
   - **Deberías ver** la transición a resultados **automáticamente**
   - Busca en consola: `🎯 Phase changed: voting → results`

### Test 3: Probar Contador de Votos

1. Abre **3 pestañas** en modo votación
2. Vota en cada pestaña
3. En el presentador, verifica que el contador se actualice
4. Busca en consola: `📊 Votes updated: 0 → 1 → 2 → 3`

---

## 🔍 Debugging con Console Logs

El código ahora incluye logs detallados. Busca estos mensajes:

### Al inicializar:
```
✅ GameService initialized with Supabase
🎮 Game ID: game-session-1
📡 Subscription status: SUBSCRIBED
```

### Al guardar estado:
```
💾 Saving game state to Supabase: { question: 0, votes: {...}, phase: 'voting' }
✅ Game state saved successfully
```

### Al recibir actualización:
```
🔄 Realtime update received: { ... }
📊 New data: { current_question: 0, votes: {...}, game_state: 'results' }
🎯 Phase changed: voting → results
```

### Al mostrar resultados:
```
🏆 Showing results - transitioning to results phase
✅ Results phase activated - all clients should update
```

---

## ❌ Errores Comunes

### Error: "Invalid API key"
- **Causa**: La clave de Supabase es incorrecta
- **Solución**: Sigue el Paso 1 para obtener la clave correcta

### Error: "Realtime is not enabled"
- **Causa**: Realtime no está habilitado en la tabla
- **Solución**: Sigue el Paso 2

### Error: "Row Level Security policy violation"
- **Causa**: Las políticas RLS bloquean el acceso
- **Solución**: Sigue el Paso 3

### Los votos no se incrementan:
- **Causa**: La función `increment_vote` no existe
- **Solución**: Ejecuta `supabase-increment-vote.sql`

---

## 📞 Checklist Final

Antes de presentar, verifica:

- [ ] Clave de Supabase correcta (empieza con `eyJ...`)
- [ ] Realtime habilitado en tabla `game_state`
- [ ] Políticas RLS configuradas
- [ ] Función `increment_vote` creada
- [ ] Console muestra "SUBSCRIBED"
- [ ] Test de 2 pestañas funciona
- [ ] Contador de votos se actualiza en tiempo real

---

## 🚀 Próximos Pasos

Una vez que todo funcione:
1. Los participantes verán resultados automáticamente
2. El contador de votos se actualizará en vivo
3. No será necesario refrescar la página
4. La experiencia será fluida y sincronizada

¡Buena suerte con tu presentación! 🎤

