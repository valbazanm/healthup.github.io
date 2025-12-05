// This file manages the navigation between different pages, ensuring smooth transitions and functionality for the navigation buttons.

document.addEventListener('DOMContentLoaded', function() {
    const navLinks = document.querySelectorAll('nav a');

    navLinks.forEach(link => {
        link.addEventListener('click', function(event) {
            event.preventDefault();
            const targetPage = this.getAttribute('href');

            // Load the target page content
            fetch(targetPage)
                .then(response => {
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    return response.text();
                })
                .then(html => {
                    document.open();
                    document.write(html);
                    document.close();
                })
                .catch(error => {
                    console.error('There was a problem with the fetch operation:', error);
                });
        });
    });
    // Render auth area in header (if components/header.html is used)
    function renderHeaderAuth() {
        const authArea = document.getElementById('authArea');
        if (!authArea) return;
        const user = window.Auth && window.Auth.getCurrentUser ? window.Auth.getCurrentUser() : null;
        console.log('renderHeaderAuth - detected user:', user);

        if (user) {
            // Si hay usuario logueado, mostrar avatar y opciones de cuenta
            authArea.innerHTML = `
                <div class="user-menu">
                    <button class="user-avatar" id="userAvatarBtn" aria-label="Perfil">
                        <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=181f1a&color=7bed9f&rounded=true&size=40" alt="Avatar" />
                    </button>
                    <div class="user-dropdown" id="userDropdown" style="display:none;">
                        <div class="user-info">
                            <img src="https://ui-avatars.com/api/?name=${encodeURIComponent(user.username)}&background=181f1a&color=7bed9f&rounded=true&size=56" alt="Avatar" />
                            <div>
                                <div class="user-name">${user.username}</div>
                                <div class="user-email">${user.email || ''}</div>
                            </div>
                        </div>
                        <a href="profile.html" class="user-profile-link">Ver perfil</a>
                        <button id="logoutBtn" class="user-logout">Cerrar sesión</button>
                    </div>
                </div>
            `;
            const avatarBtn = document.getElementById('userAvatarBtn');
            const dropdown = document.getElementById('userDropdown');
            if (avatarBtn && dropdown) {
                avatarBtn.onclick = function(e) {
                    e.stopPropagation();
                    dropdown.style.display = dropdown.style.display === 'block' ? 'none' : 'block';
                };
                document.body.addEventListener('click', function() {
                    dropdown.style.display = 'none';
                });
            }
            const logout = document.getElementById('logoutBtn');
            if (logout) logout.onclick = function() { if (window.Auth && window.Auth.logout) window.Auth.logout(); location.reload(); };
        } else {
            // Si no hay usuario, mostrar botón de login
            authArea.innerHTML = `<a href="#" class="btn login-btn" id="loginBtn">Iniciar sesión / Registrarse</a>`;
            setTimeout(() => {
                const loginBtn = document.getElementById('loginBtn');
                if (loginBtn) {
                    loginBtn.onclick = function(e) {
                        e.preventDefault();
                        const modal = document.getElementById('authModal');
                        if (modal) {
                            modal.style.display = 'flex';
                            document.body.style.overflow = 'hidden';
                        }
                    };
                }
            }, 50);
        }
    }

    // Inicializar área de auth al cargar
    // Algunos páginas pueden cargar auth.js después, por eso llamamos varias veces
    try { renderHeaderAuth(); } catch (e) { /* ignore */ }
    setTimeout(() => { try { renderHeaderAuth(); } catch (e) {} }, 150);
    window.addEventListener('storage', renderHeaderAuth);

    // Asegurar que el botón IA aparezca en el nav si el usuario es premium
    function ensureIAButton() {
        const nav = document.querySelector('.main-nav ul');
        if (!nav) return;
        const user = window.Auth && window.Auth.getCurrentUser ? window.Auth.getCurrentUser() : null;
        const existing = nav.querySelector('a[href="ai.html"]') || nav.querySelector('a[href="ai-dashboard.html"]');
        if (user && user.plan === 'pago') {
            if (!existing) {
                const li = document.createElement('li');
                li.innerHTML = '<a href="ai.html">IA</a>';
                nav.appendChild(li);
            }
        } else {
            if (existing) {
                existing.parentElement.remove();
            }
        }
    }

    try { ensureIAButton(); } catch (e) {}
    setTimeout(ensureIAButton, 200);
    window.addEventListener('storage', ensureIAButton);
    
    // Normalizar items del nav en todas las páginas y ocultar la calculadora para premium
    function ensureStandardNav() {
        const nav = document.querySelector('.main-nav ul');
        if (!nav) return;
        const user = window.Auth && window.Auth.getCurrentUser ? window.Auth.getCurrentUser() : null;

        // Define los items estándar (calc solo si usuario no es premium)
        const items = [
            { href: 'about.html', label: 'Sobre Nosotros' },
            { href: 'meal-plans.html', label: 'Planes' },
            // bodyfat (calculadora) solo para usuarios gratuitos o no logueados
            { href: 'bodyfat.html', label: 'Calculadora de grasa', privateFor: 'free-only' },
            { href: 'contact.html', label: 'Contacto' }
        ];

        // Build a map of existing links to avoid duplicates
        const existing = {};
        nav.querySelectorAll('a').forEach(a => { existing[a.getAttribute('href')] = a; });

        // Ensure items exist in order
        items.forEach(item => {
            if (item.href === 'bodyfat.html' && user && user.plan === 'pago') {
                // If user is premium, remove bodyfat link if present
                const present = nav.querySelector('a[href="bodyfat.html"]');
                if (present) present.parentElement.remove();
                return;
            }

            if (!existing[item.href]) {
                const li = document.createElement('li');
                li.innerHTML = `<a href="${item.href}">${item.label}</a>`;
                nav.appendChild(li);
            }
        });

        // After adding, also remove any duplicates / unexpected order fixes are not enforced here
    }

    try { ensureStandardNav(); } catch (e) {}
    setTimeout(ensureStandardNav, 220);
    window.addEventListener('storage', ensureStandardNav);
});

// Sticky header hide/show on scroll
let lastScroll = 0;
const header = document.querySelector('.site-header');
window.addEventListener('scroll', () => {
    const curr = window.scrollY;
    if (curr > lastScroll && curr > 60) {
        header.classList.add('hide');
    } else {
        header.classList.remove('hide');
    }
    lastScroll = curr;
});

// Responsive nav toggle
const nav = document.querySelector('.main-nav');
const navToggle = document.querySelector('.nav-toggle');
if (navToggle) {
    navToggle.addEventListener('click', () => {
        nav.classList.toggle('open');
    });
    // Close menu on link click (mobile)
    nav.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => nav.classList.remove('open'));
    });
}