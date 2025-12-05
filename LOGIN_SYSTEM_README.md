# Sistema de Autenticación con localStorage - HealthUp

## 📋 Descripción

Este proyecto usa **localStorage** del navegador para simular un sistema de autenticación. Perfecto para presentaciones académicas y pruebas sin necesidad de un servidor backend.

## 🔐 Cómo funciona

### 1. **Módulo de Autenticación (`js/auth.js`)**
Es el corazón del sistema. Proporciona funciones para:
- Registrar nuevos usuarios
- Validar login
- Gestionar sesiones
- Verificar si el usuario está logueado

### 2. **Usuarios pre-cargados**
Al cargar la página por primera vez, se inicializan dos cuentas de ejemplo automáticamente:

| Usuario | Email | Contraseña |
|---------|-------|-----------|
| **guest** | guest@healthup.com | **guest123** |
| **admin** | admin@healthup.com | **admin123** |

### 3. **Flujo de Login**
1. El usuario ingresa usuario y contraseña en el modal de login
2. Se valida contra los datos guardados en `localStorage`
3. Si es correcto, se establece una sesión en `localStorage`
4. El menú de usuario se actualiza automáticamente
5. El usuario puede navegar por todas las páginas manteniendo la sesión

### 4. **Flujo de Registro**
1. El usuario completa el formulario en `register.html`
2. Se validan los datos (usuario mínimo 3 caracteres, contraseña mínimo 4)
3. Se crea el usuario en `localStorage`
4. Se hace login automáticamente
5. Se redirige a `index.html`

### 5. **Cierre de Sesión**
1. El usuario hace click en "Cerrar sesión" en el menú
2. Se elimina la sesión de `localStorage`
3. Se recarga la página mostrando el botón de login

## 🗂️ Estructura de Almacenamiento

Los datos se guardan en `localStorage` con estas claves:

```javascript
// Usuarios registrados
localStorage.getItem('healthup_users')
// [
//   { username, email, password, createdAt },
//   ...
// ]

// Sesión actual
localStorage.getItem('healthup_session')
// { username, email, loginTime }

// Compatibilidad (mantener para código legado)
localStorage.getItem('fitlife_logged')
// username
```

## 📱 Páginas con Autenticación

Las siguientes páginas incluyen:
- **Modal de Login**: Permite iniciar sesión o registrarse
- **Menú de Usuario**: Muestra el avatar y opciones si está logueado
- **Botón de Login**: Muestra si no está autenticado

### Páginas actualizadas:
- `index.html`
- `register.html`
- `profile.html`

## 🚀 Cómo usar para la presentación en la facultad

### 1. **Prueba sin registrarse**
Abre `index.html` y haz click en "Iniciar sesión / Registrarse". Prueba con una cuenta pre-cargada:
```
Usuario: guest
Contraseña: guest123
```

### 2. **Registra tu propia cuenta**
- Haz click en "Registrate aquí"
- Completa el formulario
- ¡Listo! Tu cuenta se crea automáticamente

### 3. **Navega como usuario logueado**
Una vez logueado, verás tu avatar en la esquina superior derecha. Puedes:
- Ver tu perfil en `profile.html`
- Acceder a planes de comidas
- Usar la calculadora de grasa corporal
- Navegar todas las secciones protegidas

### 4. **Cierra la sesión**
Click en tu avatar > "Cerrar sesión"

## 📝 Archivos JavaScript principales

| Archivo | Propósito |
|---------|-----------|
| `js/auth.js` | Módulo de autenticación (funciones clave) |
| `js/auth-modal.js` | Modal de login y validación |
| `js/register.js` | Formulario de registro |
| `js/main.js` | Funciones generales |
| `js/nav.js` | Navegación responsiva |

## ⚙️ Características

✅ **Sin servidor necesario** - Todo funciona en el navegador
✅ **Persistencia** - Los datos se guardan en localStorage
✅ **Validación** - Campos requeridos y validaciones básicas
✅ **Interfaz amigable** - Modal elegante y responsive
✅ **Menú de usuario** - Avatar dinámico con opciones
✅ **Compatible** - Funciona en todos los navegadores modernos

## 🔒 Notas de Seguridad

⚠️ **IMPORTANTE**: Este sistema es para **simulación educativa** únicamente.

- Las contraseñas se guardan en **texto plano** en localStorage
- En producción, deberías usar un servidor backend con hashing
- El localStorage no es seguro para datos sensibles
- No usar en aplicaciones reales con datos confidenciales

## 🐛 Troubleshooting

**"No puedo iniciar sesión"**
- Asegúrate que `js/auth.js` esté cargado primero
- Revisa la consola del navegador (F12) para errores

**"Se borró mi cuenta cuando actualicé la página"**
- Los datos se guardan en `localStorage`. Si lo limpias, se pierden
- Usa "Limpiar solo cookies" si necesitas limpiar otros datos

**"Mi avatar no aparece"**
- Recarga la página (F5)
- Revisa que estés logueado (busca `healthup_session` en localStorage)

## 📚 API del módulo Auth

```javascript
// Registrar usuario
Auth.register(username, email, password)
// Retorna: { success: bool, errors?: [], user?: {} }

// Validar login
Auth.login(username, password)
// Retorna: { success: bool, error?: string, user?: {} }

// Establecer sesión (hacer login)
Auth.setSession(username)
// Retorna: { success: bool, session?: {} }

// Obtener sesión actual
Auth.getSession()
// Retorna: { username, email, loginTime } o null

// Verificar si está logueado
Auth.isLoggedIn()
// Retorna: bool

// Obtener usuario actual
Auth.getCurrentUser()
// Retorna: { username, email, ... } o null

// Cerrar sesión (logout)
Auth.logout()
// Retorna: { success: bool }
```

## 🎯 Próximos pasos

Para mejorar este sistema en el futuro:
1. Agregar un servidor backend (Node.js, Python, etc.)
2. Implementar hash seguro de contraseñas
3. Agregar tokens JWT para sesiones más seguras
4. Agregar recuperación de contraseña
5. Implementar autenticación social (Google, GitHub)

---

**¡Listo para presentar en la facultad!** 🎓
