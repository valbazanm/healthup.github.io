document.addEventListener('DOMContentLoaded', () => {
    // Si no existe el modal en la página, lo agregamos
    if (!document.getElementById('authModal')) {
        const modalHtml = `
        <div id="authModal" class="modal-bg" style="display:none;">
            <div class="modal-box">
                <button class="modal-close" id="closeModalBtn" aria-label="Cerrar">&times;</button>
                <div id="loginFormBox">
                    <h2>Iniciar sesión</h2>
                    <form class="auth-form" autocomplete="off">
                        <div class="form-row">
                            <label for="login-username">Usuario</label>
                            <input id="login-username" name="username" type="text" autocomplete="username" placeholder="Usuario">
                        </div>
                        <div class="form-row">
                            <label for="login-password">Contraseña</label>
                            <input id="login-password" name="password" type="password" autocomplete="current-password" placeholder="Contraseña">
                        </div>
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
    const loginBtns = document.querySelectorAll('#loginBtn');
    const closeModalBtn = document.getElementById('closeModalBtn');
    const loginBox = document.getElementById('loginFormBox');
    const loginForm = modal ? modal.querySelector('.auth-form') : null;

    loginBtns.forEach(btn => {
        btn.addEventListener('click', e => {
            e.preventDefault();
            modal.style.display = 'flex';
            loginBox.style.display = 'block';
            document.body.style.overflow = 'hidden';
        });
    });
    if (closeModalBtn) {
        closeModalBtn.addEventListener('click', () => {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        });
    }
    if (modal) {
        modal.addEventListener('click', e => {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = '';
            }
        });
    }
    document.addEventListener('keydown', e => {
        if (e.key === "Escape" && modal && modal.style.display === 'flex') {
            modal.style.display = 'none';
            document.body.style.overflow = '';
        }
    });

    // Validar login contra localStorage
    if (loginForm) {
        loginForm.onsubmit = function(e) {
            e.preventDefault();
            const username = loginForm.querySelector('#login-username').value.trim();
            const password = loginForm.querySelector('#login-password').value;
            let users = JSON.parse(localStorage.getItem('fitlife_users') || '[]');
            const user = users.find(u => u.username === username && u.password === password);
            if (user) {
                alert('¡Bienvenido, ' + username + '!');
                modal.style.display = 'none';
                document.body.style.overflow = '';
                // Aquí podrías guardar el usuario logueado en localStorage/sessionStorage
                localStorage.setItem('fitlife_logged', username);
            } else {
                alert('Usuario o contraseña incorrectos.');
            }
        };
    }
});
