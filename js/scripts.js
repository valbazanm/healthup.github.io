// General utility script for HealthUp
// Kept intentionally small to avoid 404 on hosting platforms
console.log('js/scripts.js loaded');

// Provide a safe noop for pages that expect some helpers
window.HealthUp = window.HealthUp || {};

// Ensure Auth is initialized when available
document.addEventListener('DOMContentLoaded', function() {
    if (window.Auth && window.Auth.initPreloadedUsers) {
        try { window.Auth.initPreloadedUsers(); } catch (e) { /* ignore */ }
    }
});
