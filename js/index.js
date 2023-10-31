
import * as Weather from './apps/weather.js';
import * as Todo from './apps/todo.js';

eruda.init();
Todo.init();
Weather.init();

const nav = document.querySelector('#nav');
const cover = document.querySelector('#cover');

const appNames = ['todo', 'typing', 'slide-puzzle', 'memory-card', 'life'];
appNames.forEach(appName => {
    const menu = document.createElement('a');   // 5つの'a'エレメントを追加する

    menu.classList.add('nav-menu');             // すべての要素に.nav-menuクラスを追加
    menu.textContent = appName.toUpperCase(); // .toUpperCase() = 大文字で表示

    menu.addEventListener('click', e => {      // クリックされた時

        // console.log(e);     // target: を見てみる
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
        navMenus.forEach(navMenu => {
            navMenu.classList.remove('active');
        })
        e.target.classList.add('active');
        //menu.classList.add('active'); // と同じ
    })
    nav.appendChild(menu);
})
