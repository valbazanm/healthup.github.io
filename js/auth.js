/**
 * Sistema de Autenticación con localStorage
 * Maneja registro, login y sesiones de usuario
 */

// Configuración de almacenamiento
const AUTH_STORAGE = {
    USERS_KEY: 'healthup_users',
    SESSION_KEY: 'healthup_session',
    DEFAULT_USERS: [
        { username: 'guest', email: 'guest@healthup.com', password: 'guest123', plan: 'gratis' },
        { username: 'admin', email: 'admin@healthup.com', password: 'admin123', plan: 'gratis' }
    ]
};

// Inicializar usuarios pre-cargados si no existen
function initializeDefaultUsers() {
    const users = localStorage.getItem(AUTH_STORAGE.USERS_KEY);
    if (!users) {
        localStorage.setItem(AUTH_STORAGE.USERS_KEY, JSON.stringify(AUTH_STORAGE.DEFAULT_USERS));
        console.log('✓ Usuarios pre-cargados inicializados');
    }
}
// backward compatibility alias
// compatibility alias (older code/tests may call initializeDemoUsers)
const initializeDemoUsers = initializeDefaultUsers;
// new alias for clearer naming
const initializePreloadedUsers = initializeDefaultUsers;

// Obtener todos los usuarios registrados
function getAllUsers() {
    const users = localStorage.getItem(AUTH_STORAGE.USERS_KEY);
    return users ? JSON.parse(users) : [];
}

// Guardar usuarios en localStorage
function saveUsers(users) {
    localStorage.setItem(AUTH_STORAGE.USERS_KEY, JSON.stringify(users));
}

// Obtener usuario por username
function getUserByUsername(username) {
    const users = getAllUsers();
    return users.find(u => u.username.toLowerCase() === username.toLowerCase());
}

// Registrar nuevo usuario
function registerUser(username, email, password) {
    // Validaciones
    const errors = [];
    
    if (!username || username.trim().length < 3) {
        errors.push('El usuario debe tener al menos 3 caracteres');
    }
    
    if (!email || !email.includes('@')) {
        errors.push('Email inválido');
    }
    
    if (!password || password.length < 4) {
        errors.push('La contraseña debe tener al menos 4 caracteres');
    }
    
    // Verificar si el usuario ya existe
    if (getUserByUsername(username)) {
        errors.push('Este usuario ya está registrado');
    }
    
    if (errors.length > 0) {
        return { success: false, errors };
    }
    
    // Crear nuevo usuario
    const users = getAllUsers();
    const newUser = {
        username: username.trim(),
        email: email.trim(),
        password: password, // En producción, esto debería estar hasheado
        createdAt: new Date().toISOString()
    };
    
    users.push(newUser);
    saveUsers(users);
    
    return { success: true, user: newUser };
}

// Validar login
function validateLogin(username, password) {
    const user = getUserByUsername(username);
    
    if (!user || user.password !== password) {
        return { success: false, error: 'Usuario o contraseña incorrectos' };
    }
    
    return { success: true, user };
}

// Establecer sesión (hacer login)
function setSession(username) {
    const user = getUserByUsername(username);
    if (!user) {
        return { success: false, error: 'Usuario no encontrado' };
    }
    
    const session = {
        username: user.username,
        email: user.email,
        loginTime: new Date().toISOString(),
        plan: user.plan || 'gratis'
    };
    
    localStorage.setItem(AUTH_STORAGE.SESSION_KEY, JSON.stringify(session));
    // Compatibilidad con código anterior
    localStorage.setItem('fitlife_logged', username);
    
    return { success: true, session };
}

// Obtener sesión actual
function getSession() {
    const session = localStorage.getItem(AUTH_STORAGE.SESSION_KEY);
    return session ? JSON.parse(session) : null;
}

// Verificar si el usuario está logueado
function isLoggedIn() {
    return getSession() !== null;
}

// Cerrar sesión (logout)
function logout() {
    localStorage.removeItem(AUTH_STORAGE.SESSION_KEY);
    localStorage.removeItem('fitlife_logged');
    return { success: true };
}

// Obtener usuario logueado actual
function getCurrentUser() {
    const session = getSession();
    if (!session) return null;
    return getUserByUsername(session.username);
}

// Inicializar al cargar la página
// Cambiar contraseña de un usuario
function changePassword(username, oldPassword, newPassword) {
    // Validar contraseña actual
    const loginResult = validateLogin(username, oldPassword);
    if (!loginResult.success) {
        return { success: false, error: 'La contraseña actual es incorrecta' };
    }
    
    // Validar nueva contraseña
    if (!newPassword || newPassword.length < 4) {
        return { success: false, error: 'La nueva contraseña debe tener al menos 4 caracteres' };
    }
    
    if (oldPassword === newPassword) {
        return { success: false, error: 'La nueva contraseña debe ser diferente a la actual' };
    }
    
    // Cambiar la contraseña
    const users = getAllUsers();
    const userIndex = users.findIndex(u => u.username.toLowerCase() === username.toLowerCase());
    
    if (userIndex === -1) {
        return { success: false, error: 'Usuario no encontrado' };
    }
    
    users[userIndex].password = newPassword;
    saveUsers(users);
    
    return { success: true, message: 'Contraseña cambiada correctamente' };
}

// Cambiar plan de usuario (gratis -> pago)
function setUserPlan(username, plan) {
    const users = getAllUsers();
    const idx = users.findIndex(u => u.username && u.username.toLowerCase() === username.toLowerCase());
    if (idx === -1) return { success: false, error: 'Usuario no encontrado' };
    users[idx].plan = plan;
    saveUsers(users);
    // Si existe sesión activa del usuario, actualizarla también
    const session = getSession();
    if (session && session.username && session.username.toLowerCase() === username.toLowerCase()) {
        // Re-establecer sesión para incluir nuevo plan
        setSession(username);
    }
    return { success: true, user: users[idx] };
}

document.addEventListener('DOMContentLoaded', () => {
    initializeDefaultUsers();
});

// Exportar funciones (para uso en otros scripts)
if (typeof window !== 'undefined') {
    window.Auth = {
        register: registerUser,
        login: validateLogin,
        setSession,
        getSession,
        isLoggedIn,
        logout,
        getCurrentUser,
        getAllUsers,
        changePassword,
        setUserPlan,
        // IA profile management
        getAIProfiles,
        getAIProfile,
        saveAIProfile,
        deleteAIProfile,
        initDefaultUsers: initializeDefaultUsers,
        // alias for compatibility (will be removed in future)
        initDemoUsers: initializeDefaultUsers,
        initPreloadedUsers: initializePreloadedUsers
    };
}

// ----- IA profile storage helpers -----
function getAIProfiles() {
    const raw = localStorage.getItem('healthup_ai_profiles');
    return raw ? JSON.parse(raw) : {};
}

function getAIProfile(username) {
    if (!username) return null;
    const profiles = getAIProfiles();
    return profiles[username] || null;
}

function saveAIProfile(username, data) {
    if (!username) return { success: false, error: 'Usuario requerido' };
    const profiles = getAIProfiles();
    profiles[username] = Object.assign({}, profiles[username] || {}, data);
    localStorage.setItem('healthup_ai_profiles', JSON.stringify(profiles));
    return { success: true, profile: profiles[username] };
}

function deleteAIProfile(username) {
    if (!username) return { success: false, error: 'Usuario requerido' };
    const profiles = getAIProfiles();
    if (profiles[username]) delete profiles[username];
    localStorage.setItem('healthup_ai_profiles', JSON.stringify(profiles));
    return { success: true };
}
