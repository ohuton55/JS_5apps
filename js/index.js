import * as Todo from './modules/todo.js';

eruda.init();
console.log('Hello World!');
Todo.hello();

const nav = document.querySelector('#nav');
const cover = document.querySelector('#cover');
const appNames = ['todo', 'typing', 'slide-puzzle', 'memory-card', 'life'];


appNames.forEach(appName => {
    const menu = document.createElement('a');   // 5つの'a'エレメントを追加する

    menu.classList.add('nav-menu');             // すべての要素に.nav-menuクラスを追加
    menu.textContent = appName.toUpperCase(); // .toUpperCase() = 大文字表示

    menu.addEventListener('click', e => {      // クリックされた時

        console.log(e);     // target: を見てみる
        // 要素を1つずつ切り離して表示したいので、先にRemoveする
        cover.classList.remove('active');    
        const appEls = document.querySelectorAll('.app');
        appEls.forEach(appEl => {
            appEl.classList.remove('active');
        })
        const appEl = document.getElementById(appName);
        appEl.classList.add('active');   // 目的のアクティブクラスを追加する

        // クリックされた要素をアクティブにする    
        const navMenus = document.querySelectorAll('.nav-menu');
        navMenues.forEach(navMenu => {
            navMenu.classList.remove('active');
        })
        // e.target.classList.add('active');  と同じ
        menu.classList.add('active'); 
    })
    nav.appendChild(menu);
})
