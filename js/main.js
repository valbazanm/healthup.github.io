// main.js
document.addEventListener('DOMContentLoaded', () => {
    console.log('Welcome to the Meal and Workout Plans website!');

    // Inyecta componentes HTML (header/footer) si hay elementos con data-include
    includeHTML();
    // Add any additional JavaScript functionality here
});

/**
 * includeHTML: busca elementos con el atributo `data-include` y carga el HTML indicado.
 * Soporta inyectar scripts que haya dentro del HTML incluido.
 */
function includeHTML() {
    const nodes = document.querySelectorAll('[data-include]');
    nodes.forEach(el => {
        const src = el.getAttribute('data-include');
        if (!src) return;
        fetch(src)
            .then(resp => {
                if (!resp.ok) throw new Error('Failed to load ' + src);
                return resp.text();
            })
            .then(html => {
                el.innerHTML = html;

                // Ejecutar cualquier <script> dentro del HTML incluido
                const scripts = el.querySelectorAll('script');
                scripts.forEach(oldScript => {
                    const script = document.createElement('script');
                    // Si el script tiene src, cargalo
                    if (oldScript.src) {
                        script.src = oldScript.src;
                    } else {
                        script.textContent = oldScript.textContent;
                    }
                    document.body.appendChild(script);
                    // opcional: eliminar el script creado después de un tiempo
                });
            })
            .catch(err => {
                console.error('includeHTML error:', err);
            });
    });
}