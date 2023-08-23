const nav = document.querySelector('#nav');
const appNames = ['todo', 'typing', 'slide-puzzle', 'memory-card', 'life'];

// 5つのエレメントを追加する
appNames.forEach(appName => {
    const menu = document.createElement('a');
    menu.classList.add('nav-menu');
    menu.textContent = appName.toUpperCase(); // .toUpperCase() = 大文字で表示

    nav.appendChild(menu);
})
