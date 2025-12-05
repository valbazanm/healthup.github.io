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
                            <label for="login-email">Email</label>
                            <input id="login-email" name="email" type="email" autocomplete="email" placeholder="correo@ejemplo.com">
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
        console.log('auth-modal.js - opening login modal');
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
            const emailEl = document.getElementById('login-email');
            const passwordEl = document.getElementById('login-password');
            const email = emailEl ? emailEl.value.trim() : '';
            const password = passwordEl ? passwordEl.value : '';

            console.log('auth-modal.js - login submit:', { emailProvided: !!email });

            // Validar login usando el módulo Auth
            if (!window.Auth || !window.Auth.login) {
                if (loginError) {
                    loginError.textContent = 'Módulo de autenticación no disponible.';
                    loginError.style.display = 'block';
                }
                return;
            }

            const result = window.Auth.login(email, password);
            console.log('auth-modal.js - Auth.login result:', result);

            if (result && result.success) {
                // Establecer sesión con el username real del usuario
                const uname = result.user && result.user.username ? result.user.username : email;
                const setRes = window.Auth.setSession(uname);
                console.log('auth-modal.js - setSession result:', setRes, 'session now:', window.Auth.getSession && window.Auth.getSession());
                // Mostrar mensaje de éxito
                if (loginError) loginError.style.display = 'none';
                alert('¡Bienvenido, ' + (result.user && result.user.username ? result.user.username : email) + '!');
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
