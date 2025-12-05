document.addEventListener('DOMContentLoaded', () => {
    // Si no existe el modal en la página, lo agregamos
    if (!document.getElementById('authModal')) {
        const modalHtml = `
        <div id="authModal" class="modal-bg" style="display:none;">
            <div class="modal-box">
                <button class="modal-close" id="closeModalBtn" aria-label="Cerrar">&times;</button>
                <div id="loginFormBox">
                    <h2>Iniciar sesión</h2>
                    <div id="loginError" style="color:#ff6b6b;margin-bottom:12px;display:none;"></div>
                    <form class="auth-form" id="loginForm" autocomplete="off">
                        <div class="form-row">
                            <label for="login-username">Usuario</label>
                            <input id="login-username" name="username" type="text" autocomplete="username" placeholder="Usuario">
                        </div>
                        <div class="form-row">
                            <label for="login-password">Contraseña</label>
                            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Contraseña">
                        </div>
                        <!-- credential hint removed for professional simulation -->
                        <div class="form-row">
                            <button type="submit" class="button primary" style="width:100%;">Ingresar</button>
                        </div>
                    </form>
                    <div class="modal-switch">
                        ¿No tienes cuenta? <a href="register.html" id="showRegister">Registrate aquí</a>
                    </div>
                </div>
            </div>
        </div>
        `;
        document.body.insertAdjacentHTML('beforeend', modalHtml);
    }

    const modal = document.getElementById('authModal');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginError = document.getElementById('loginError');

    // Abrir modal con click en botón de login (delegated - funciona aunque el botón se inyecte después)
    document.addEventListener('click', function (e) {
        const target = e.target.closest && e.target.closest('#loginBtn, .login-btn');
        if (!target) return;
        e.preventDefault();
        if (!modal) return;
        modal.style.display = 'flex';
        document.body.style.overflow = 'hidden';
        if (loginError) loginError.style.display = 'none';
        // Re-bind the login form handler each time modal opens to ensure it is attached
        bindLoginForm();
    });

    // Cerrar modal
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            if (modal) modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }

    // Cerrar modal al hacer click fuera
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }

    // Cerrar modal con ESC
    document.addEventListener('keydown', e => {
        if (e.key === "Escape" && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Bind login form submit handler (safe to call multiple times)
    function bindLoginForm() {
        const loginForm = document.getElementById('loginForm');
        if (!loginForm) return;
        // Remove existing handler by cloning
        const newForm = loginForm.cloneNode(true);
        loginForm.parentNode.replaceChild(newForm, loginForm);

        newForm.addEventListener('submit', function(e) {
            e.preventDefault();
            const usernameEl = document.getElementById('login-username');
            const passwordEl = document.getElementById('login-password');
            const username = usernameEl ? usernameEl.value.trim() : '';
            const password = passwordEl ? passwordEl.value : '';

            // Validar login usando el módulo Auth
            if (!window.Auth || !window.Auth.login) {
                if (loginError) {
                    loginError.textContent = 'Módulo de autenticación no disponible.';
                    loginError.style.display = 'block';
                }
                return;
            }

            const result = window.Auth.login(username, password);

            if (result && result.success) {
                // Establecer sesión
                window.Auth.setSession(username);
                // Mostrar mensaje de éxito
                if (loginError) loginError.style.display = 'none';
                alert('¡Bienvenido, ' + username + '!');
                // Cerrar modal
                if (modal) modal.style.display = 'none';
                document.body.style.overflow = '';
                // Recargar para actualizar el menú de usuario
                setTimeout(() => { location.reload(); }, 300);
            } else {
                if (loginError) {
                    loginError.textContent = (result && result.error) ? result.error : 'Error de autenticación';
                    loginError.style.display = 'block';
                }
            }
        });
    }
});
