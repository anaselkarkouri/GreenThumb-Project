// Le thème est géré uniquement par dark-mode.js.
document.addEventListener('DOMContentLoaded', () => {
    const menu = document.querySelector('.menu-toggle');
    const links = document.querySelector('.nav-links');
    if (menu && links) {
        menu.addEventListener('click', () => { links.classList.toggle('active'); menu.setAttribute('aria-expanded', String(links.classList.contains('active'))); });
        document.addEventListener('click', e => {
            if (!links.contains(e.target) && !menu.contains(e.target)) links.classList.remove('active');
        });
    }
});
