/**
 * Manejo del formulario de registro
 */

document.addEventListener('DOMContentLoaded', () => {
    const registerForm = document.getElementById('registerForm');
    
    if (registerForm) {
        registerForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const username = document.getElementById('reg-username').value.trim();
            const email = document.getElementById('reg-email').value.trim();
            const password = document.getElementById('reg-password').value;
            
            // Intentar registrar el usuario
            const result = window.Auth.register(username, email, password);
            console.log('register.js - register result:', result);
            
            if (result.success) {
                console.log('register.js - calling setSession for', username);
                alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');

                // Hacer login automáticamente
                const sessionResult = window.Auth.setSession(username);
                console.log('register.js - setSession result:', sessionResult, 'current session:', window.Auth.getSession && window.Auth.getSession());

                // Redirigir a index.html
                setTimeout(() => {
                    window.location.href = 'index.html';
                }, 500);
            } else {
                // Mostrar errores
                const errorMessages = result.errors.join('\n');
                alert('Error en el registro:\n' + errorMessages);
            }
        });
    }
});
