🎓 GUÍA RÁPIDA - Sistema Completo de HealthUp

═══════════════════════════════════════════════════════════════════════════════

📋 ESTADO ACTUAL DEL PROYECTO:
───────────────────────────────────────────────────────────────────────────────

✅ Sistema de Login completamente funcional en localStorage
✅ Página de perfil creada y funcionando
✅ Navegación corregida y organizada
✅ Todas las páginas con autenticación integrada
✅ Usuarios de demostración pre-cargados
✅ Sistema 100% listo para presentación en facultad

═══════════════════════════════════════════════════════════════════════════════

🚀 CÓMO USAR PARA LA PRESENTACIÓN:
───────────────────────────────────────────────────────────────────────────────

OPCIÓN 1: Login con usuario pre-cargado (RECOMENDADO)
  1. Abre index.html
  2. Haz click en "Iniciar sesión / Registrarse" (arriba a la derecha)
  3. Usa estas credenciales:
     Usuario: demo
     Contraseña: demo123
  4. ✅ ¡Estás logueado!
  5. Haz click en tu avatar (arriba a la derecha)
  6. Haz click en "Ver perfil" → Ve tu perfil completo

OPCIÓN 2: Registrar una nueva cuenta
  1. Haz click en "Iniciar sesión / Registrarse"
  2. Haz click en "Registrate aquí"
  3. Completa el formulario:
     - Usuario: cualquier nombre (mínimo 3 caracteres)
     - Email: tu email
     - Contraseña: cualquier contraseña (mínimo 4 caracteres)
  4. Haz click en "Registrarse"
  5. ✅ Tu cuenta se crea automáticamente
  6. ✅ Login automático y va a index.html
  7. Tu avatar aparece en la esquina superior derecha

═══════════════════════════════════════════════════════════════════════════════

📍 PÁGINAS DEL SITIO:
───────────────────────────────────────────────────────────────────────────────

PÁGINAS PRINCIPALES:
  • index.html            - Inicio (con hero y descripción)
  • about.html            - Sobre Nosotros
  • contact.html          - Contacto
  • meal-plans.html       - Planes de comidas
  • bodyfat.html          - Calculadora de grasa corporal
  • workout-plans.html    - Planes de entrenamiento
  • progress-tracker.html - Seguimiento de progreso
  • choose-plan.html      - Selección de plan

PÁGINAS DE AUTENTICACIÓN:
  • register.html         - Registro de usuarios
  • profile.html          - Perfil del usuario logueado
  • test-auth.html        - Testing del sistema

═══════════════════════════════════════════════════════════════════════════════

🔐 CARACTERÍSTICAS IMPLEMENTADAS:
───────────────────────────────────────────────────────────────────────────────

✅ AUTENTICACIÓN:
   • Login con validación
   • Registro con validación
   • Sesiones persistentes
   • Logout funcional
   • Usuarios de demostración pre-cargados

✅ INTERFAZ DE USUARIO:
   • Modal de login elegante
   • Avatar dinámico con iniciales
   • Menú dropdown de usuario
   • Página de perfil profesional
   • Mensajes de error claros

✅ NAVEGACIÓN:
   • Menú principal en todas las páginas
   • Links correctos organizados
   • "Sobre Nosotros" → about.html
   • "Ver perfil" → profile.html
   • Consistencia en todas las páginas

✅ ALMACENAMIENTO:
   • localStorage para usuarios
   • localStorage para sesión
   • Persistencia de datos
   • Sin necesidad de servidor

═══════════════════════════════════════════════════════════════════════════════

🧪 CÓMO TESTEAR EL SISTEMA:
───────────────────────────────────────────────────────────────────────────────

Opción 1: Testing visual (PARA LA PRESENTACIÓN)
  1. Abre index.html
  2. Prueba login con "demo" / "demo123"
  3. Navega a diferentes páginas
  4. Haz click en tu avatar
  5. Haz click en "Ver perfil"
  6. Verifica que tu perfil se muestra correctamente
  7. Prueba logout
  8. Verifica que se limpió la sesión

Opción 2: Testing automatizado
  1. Abre test-auth.html
  2. Ejecuta los 7 tests disponibles
  3. Verifica que todos pasen ✅
  4. Inspecciona localStorage

═══════════════════════════════════════════════════════════════════════════════

💾 USUARIOS DE DEMOSTRACIÓN:
───────────────────────────────────────────────────────────────────────────────

Usuario 1:
  Username:  demo
  Email:     demo@healthup.com
  Password:  demo123

Usuario 2:
  Username:  admin
  Email:     admin@healthup.com
  Password:  admin123

Puedes crear nuevos usuarios registrándote en register.html

═══════════════════════════════════════════════════════════════════════════════

📝 ESTRUCTURA DE ARCHIVOS JS:
───────────────────────────────────────────────────────────────────────────────

js/
├── auth.js              - Módulo de autenticación (CORE)
├── auth-modal.js        - Modal de login
├── register.js          - Manejo de registro
├── main.js              - Funciones generales
├── nav.js               - Navegación responsiva
└── scripts.js           - Scripts adicionales

═══════════════════════════════════════════════════════════════════════════════

⚙️ CÓMO FUNCIONA INTERNAMENTE:
───────────────────────────────────────────────────────────────────────────────

1. Al cargar cualquier página:
   • Se carga auth.js primero
   • Se inicializan usuarios de demostración
   • Se obtiene la sesión actual
   • Se renderiza el menú de usuario o botón de login

2. Al hacer login:
   • Se valida usuario y contraseña en localStorage
   • Se crea una sesión en localStorage
   • Se recarga la página
   • El avatar aparece en la esquina superior derecha

3. Al navegar:
   • La sesión se mantiene (porque está en localStorage)
   • El avatar sigue visible en todas las páginas
   • Los datos del usuario están disponibles globalmente

4. Al logout:
   • Se elimina la sesión de localStorage
   • Se recarga la página
   • El avatar desaparece
   • El botón de login vuelve a aparecer

═══════════════════════════════════════════════════════════════════════════════

🎯 PARA LA PRESENTACIÓN EN FACULTAD:
───────────────────────────────────────────────────────────────────────────────

Puntos a demostrar:
✓ Login funcional
✓ Persistencia de sesión en múltiples páginas
✓ Perfil de usuario
✓ Registro de nuevos usuarios
✓ Logout
✓ Sistema funcional sin servidor backend

Ventajas a mencionar:
✓ Funciona 100% en el navegador
✓ Sin necesidad de servidor
✓ Sin base de datos compleja
✓ localStorage para almacenamiento persistente
✓ Código modular y reutilizable
✓ Fácil de extender

═══════════════════════════════════════════════════════════════════════════════

❓ PREGUNTAS FRECUENTES:
───────────────────────────────────────────────────────────────────────────────

P: ¿Cómo agrego un nuevo usuario?
R: Puedes crear uno usando la página register.html o usar los pre-cargados.

P: ¿Dónde se guardan los datos?
R: En localStorage del navegador. Al limpiar datos del navegador, se pierden.

P: ¿Puedo migrar esto a un servidor?
R: Sí, el módulo auth.js está diseñado para ser reutilizable.

P: ¿Es seguro guardar contraseñas en localStorage?
R: Para demostración educativa está bien. En producción se necesita hash.

P: ¿Qué pasa si el usuario deshabilita localStorage?
R: El sistema no funcionará. Es una limitación del navegador.

═══════════════════════════════════════════════════════════════════════════════

✨ ¡SISTEMA LISTO PARA PRESENTACIÓN!

Todo funciona correctamente. Solo abre index.html en el navegador y comienza
a navegar. ¡Buena suerte en tu presentación! 🎓

═══════════════════════════════════════════════════════════════════════════════
