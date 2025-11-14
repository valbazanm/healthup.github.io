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