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
            
            if (result.success) {
                alert('¡Cuenta creada exitosamente! Ahora puedes iniciar sesión.');
                
                // Hacer login automáticamente
                window.Auth.setSession(username);
                
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
