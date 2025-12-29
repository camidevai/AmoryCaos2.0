# 🎮 Juego Interactivo: IA ¿Verdad o Mito?

## 🔧 Configuración Inicial en Supabase (SOLO UNA VEZ)

### Pasos para configurar la base de datos:

1. **Ir al SQL Editor de Supabase:**
   - Ve a: https://supabase.com/dashboard/project/avqcfefaershlcffzotw
   - Haz clic en **"SQL Editor"** en el menú lateral
   - Haz clic en **"New query"**

2. **Ejecutar el SQL:**
   - Abre el archivo `supabase-setup.sql` de este proyecto
   - Copia TODO el contenido
   - Pégalo en el editor SQL de Supabase
   - Haz clic en **"Run"** (botón verde)

3. **Habilitar Realtime:**
   - Ve a **"Database"** → **"Replication"** en el menú lateral
   - Busca la tabla `game_state` en la lista
   - Activa el toggle para habilitar Realtime

✅ **¡Listo!** Ahora el juego funcionará en tiempo real con sincronización entre todos los dispositivos.

---

## 📋 Cómo usar el juego en la charla

### Para los Presentadores (Cami & Dani):

1. **Abrir la página principal** en la pantalla grande
   - URL: `https://amor-codigo-y-caos.netlify.app/`
   - Navegar hasta la sección "IA: ¿Verdad o Mito?"

2. **Seleccionar una pregunta**
   - Verán una grilla con 6 preguntas
   - Hacer clic en la pregunta que quieran usar
   - Aparecerá un **QR Code** automáticamente

3. **La audiencia escanea el QR**
   - El QR lleva a la misma página pero en modo votación
   - La audiencia verá la pregunta y dos botones grandes: VERDADERO / FALSO

4. **Ver votos en tiempo real**
   - En la pantalla grande verán barras que se actualizan en vivo
   - Muestra el porcentaje y cantidad de votos

5. **Revelar la respuesta**
   - Hacer clic en "Mostrar Respuesta"
   - Se mostrará la explicación correcta
   - Tanto en la pantalla grande como en los celulares de la audiencia

6. **Siguiente pregunta**
   - Hacer clic en "Siguiente Pregunta"
   - O volver a seleccionar otra pregunta manualmente

### Para la Audiencia:

1. **Escanear el QR Code** que aparece en la pantalla
2. **Votar** haciendo clic en VERDADERO o FALSO
3. **Ver el resultado** cuando los presentadores lo revelen

## 🎯 Preguntas incluidas:

1. La IA puede sentir emociones reales como los humanos (FALSO)
2. La IA aprende de patrones en grandes cantidades de datos (VERDADERO)
3. La IA puede crear contenido completamente original sin datos previos (FALSO)
4. La IA puede automatizar tareas repetitivas y ahorrar tiempo (VERDADERO)
5. La IA puede reemplazar completamente el juicio humano en decisiones importantes (FALSO)
6. ChatGPT y otras IAs pueden generar código funcional (VERDADERO)

## 🔧 Modo de prueba local:

Para probar en desarrollo:
- **Modo Presentador**: `http://localhost:5173/`
- **Modo Votación**: `http://localhost:5173/?mode=vote`

## 💡 Tips para la charla:

- ✅ Dar tiempo suficiente para que todos escaneen el QR
- ✅ Anunciar cuando se cierra la votación antes de revelar
- ✅ Comentar los resultados y generar discusión
- ✅ Usar las explicaciones como punto de partida para profundizar

## 🚀 Características:

- ✨ Votación en tiempo real
- 📱 Responsive (funciona perfecto en celulares)
- 🎨 Animaciones suaves y atractivas
- 📊 Visualización de resultados en vivo
- 🔄 Sincronización automática entre pantallas

