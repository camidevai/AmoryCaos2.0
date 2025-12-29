# 🚀 Configuración de Supabase para el Juego en Tiempo Real

## ⚠️ IMPORTANTE: Debes hacer esto ANTES de usar el juego en producción

El juego interactivo "IA: ¿Verdad o Mito?" usa Supabase para sincronizar los votos en tiempo real entre la pantalla del presentador y los celulares de la audiencia.

---

## 📋 Pasos de Configuración

### 1️⃣ Acceder al SQL Editor

1. Ve a tu proyecto de Supabase:
   ```
   https://supabase.com/dashboard/project/avqcfefaershlcffzotw
   ```

2. En el menú lateral izquierdo, haz clic en **"SQL Editor"**

3. Haz clic en el botón **"New query"**

---

### 2️⃣ Ejecutar el Script SQL

1. Abre el archivo `supabase-setup.sql` que está en la raíz del proyecto

2. Copia **TODO** el contenido del archivo

3. Pégalo en el editor SQL de Supabase

4. Haz clic en el botón **"Run"** (verde, esquina inferior derecha)

5. Deberías ver un mensaje de éxito: ✅ "Success. No rows returned"

---

### 3️⃣ Habilitar Realtime en la Tabla

1. En el menú lateral, ve a **"Database"** → **"Replication"**

2. Busca la tabla `game_state` en la lista de tablas

3. Activa el **toggle/switch** al lado de `game_state` para habilitar Realtime

4. Deberías ver que el toggle queda en verde/activado

---

### 4️⃣ Verificar la Configuración

1. Ve a **"Table Editor"** en el menú lateral

2. Selecciona la tabla `game_state`

3. Deberías ver una fila con:
   - **id**: `game-session-1`
   - **current_question**: `0`
   - **votes**: `{"true": 0, "false": 0}`
   - **game_state**: `waiting`
   - **updated_at**: (fecha actual)

---

## ✅ ¡Configuración Completa!

Ahora el juego está listo para funcionar en tiempo real. Cuando:

- 🎤 **Los presentadores** inicien una pregunta en la pantalla grande
- 📱 **La audiencia** escanee el QR y vote desde sus celulares
- 📊 **Los votos** se sincronizarán automáticamente en tiempo real
- 🔄 **Todos** verán los mismos resultados al mismo tiempo

---

## 🧪 Probar la Configuración

1. Abre la página en dos ventanas diferentes:
   - Ventana 1: `https://amor-codigo-y-caos.netlify.app/` (modo presentador)
   - Ventana 2: `https://amor-codigo-y-caos.netlify.app/?mode=vote` (modo votación)

2. En la ventana 1, haz clic en una pregunta para iniciarla

3. En la ventana 2, deberías ver la pregunta aparecer automáticamente

4. Vota en la ventana 2

5. Los votos deberían aparecer en tiempo real en la ventana 1

---

## 🆘 Solución de Problemas

### ❌ Error: "relation 'game_state' does not exist"
- **Solución**: No ejecutaste el SQL correctamente. Vuelve al paso 2️⃣

### ❌ Los votos no se sincronizan
- **Solución**: No habilitaste Realtime. Vuelve al paso 3️⃣

### ❌ Error: "permission denied"
- **Solución**: Las políticas RLS no se crearon. Ejecuta el SQL completo del paso 2️⃣

---

## 📞 Contacto

Si tienes problemas con la configuración, revisa:
1. Que copiaste TODO el contenido de `supabase-setup.sql`
2. Que el SQL se ejecutó sin errores
3. Que habilitaste Realtime en la tabla `game_state`

¡Buena suerte con la charla! 🎉

