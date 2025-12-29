# 🔧 Solución para el Problema de Votos en Supabase

## 📋 Problema Identificado

Los votos no se están contabilizando porque hay un problema con la configuración de Supabase.

### Causa Principal:
La clave de Supabase en `src/lib/supabase.js` parece incorrecta:
- **Actual**: `sb_publishable_6RkYpetmpWtSCSKOZ1kr9g_vlhbVmfE`
- **Debería ser**: Una clave anon/public que empiece con `eyJ...` (formato JWT)

---

## ✅ Pasos para Solucionar

### 1. Obtener las Credenciales Correctas de Supabase

1. Ve a tu proyecto de Supabase: https://supabase.com/dashboard/project/avqcfefaershlcffzotw
2. En el menú lateral, ve a **Settings** → **API**
3. Copia las siguientes credenciales:
   - **Project URL**: Debería ser `https://avqcfefaershlcffzotw.supabase.co`
   - **anon/public key**: Debería empezar con `eyJ...` (es un token JWT largo)

### 2. Actualizar el Archivo de Configuración

Edita el archivo `src/lib/supabase.js` con las credenciales correctas:

```javascript
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://avqcfefaershlcffzotw.supabase.co';
const supabaseAnonKey = 'TU_CLAVE_ANON_AQUI'; // Reemplaza con la clave correcta

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
    realtime: {
        params: {
            eventsPerSecond: 10
        }
    }
});
```

### 3. Ejecutar los Scripts SQL en Supabase

1. Ve a **SQL Editor** en tu proyecto de Supabase
2. Ejecuta el contenido del archivo `supabase-setup.sql`:
   - Esto creará la tabla `game_state`
   - Configurará las políticas de seguridad (RLS)
   - Insertará el estado inicial del juego

3. Ejecuta el contenido del archivo `supabase-increment-vote.sql`:
   - Esto creará la función `increment_vote` para incrementos atómicos
   - Previene condiciones de carrera cuando múltiples usuarios votan simultáneamente

### 4. Habilitar Realtime para la Tabla

1. Ve a **Database** → **Replication** en Supabase
2. Busca la tabla `game_state`
3. Asegúrate de que esté **habilitada** para Realtime
4. Si no está habilitada, actívala

### 5. Verificar la Conexión

Puedes usar el archivo `test-supabase-connection.js` para verificar que todo funcione:

```bash
node test-supabase-connection.js
```

---

## 🎯 Verificación Final

Una vez completados los pasos anteriores:

1. Reinicia el servidor de desarrollo:
   ```bash
   npm run dev
   ```

2. Abre la aplicación en el navegador
3. Inicia el juego desde el modo presentador
4. Abre el modo votación en otro dispositivo/pestaña (escanea el QR o agrega `?mode=vote` a la URL)
5. Vota y verifica que:
   - El contador de votos se actualice en tiempo real
   - Los votos se reflejen en ambas pantallas (presentador y votante)
   - Los porcentajes se calculen correctamente

---

## 📝 Notas Adicionales

- La función `increment_vote` usa operaciones atómicas para evitar pérdida de votos
- El sistema usa `localStorage` para prevenir votos duplicados del mismo dispositivo
- El botón de reiniciar (🔄) limpia tanto el estado en Supabase como el localStorage

---

## 🆘 Si Sigues Teniendo Problemas

1. Verifica en la consola del navegador (F12) si hay errores de Supabase
2. Revisa que las políticas RLS estén configuradas correctamente
3. Asegúrate de que la tabla `game_state` tenga el registro inicial con id `game-session-1`
4. Verifica que la función `increment_vote` esté creada correctamente en Supabase

---

**Última actualización**: 2025-12-29

