const nav = document.querySelector('#nav');
const appNames = ['todo', 'typing', 'slide-puzzle', 'memory-card', 'life'];

const menu = document.createElement('a');
menu.classList.add('nav-menu');
menu.textContent = appNames[0];

nav.appendChild(menu);