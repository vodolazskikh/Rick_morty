const MIN_SYMBOLS = 3; // Минимальное количество символов при вводе
const div = document.querySelector('div'); // Получение дом-элементов
const err = document.getElementById('err'); 
const input = document.querySelector('input');
const themeSelect = document.getElementById('themeSelect');
let lastTheme = 'default'; // Последняя выбранная тема
let nextPageUrl; // URL для получения данных следующей страницы 


const debounce = (fn,ms) => { // Задержка запроса на 500 мс при вводе данных пользователем
    let timeout;
    return function() {
        const fnCall = ()=> {fn.apply(this,arguments);};
        clearTimeout(timeout);
        timeout = setTimeout(fnCall,ms);
    };
};
const getDatafromRequest = debounce(getUrlFromName,500); // Получение данных ответа с учетом задержки


input.oninput = getDatafromRequest; // Получение URL-адреса с учетом введенного значения
window.addEventListener('scroll', addNextPage); // Добавление картинок след страницы при прокрутке
themeSelect.addEventListener('change',onThemeSelectHandler); // Установка выбранной темы 
document.onmouseover= function(e){
    if (e.target.tagName!='IMG') return;
    e.target.classList.add('size');
    e.target.nextSibling.classList.add('highlight');
};
document.onmouseout=function(e) {// Обработчики для изменения изменения размера и цвета имени
    if (e.target.tagName!='IMG') return;
    e.target.classList.remove('size');
    e.target.nextSibling.classList.remove('highlight');
}; 
window.addEventListener('scroll', addNextPage); // Добавление персонажей со след страниц при прокрутке


const themes = { // CSS-свойства для изменения темы
    default: {
        '--base-color':'#ced4da',
        '--shadow': '6px 3px 3px #8e8989',
        '--border': '#faebd7',
        '--name': '#c1ca5c95'
    },
    light: {
        '--base-color':'#e0f365e7',
        '--shadow': '6px 3px 3px #495057',
        '--border': '#90580e',
        '--name': '#f2cd68d8'
    },
    dark: {
        '--base-color':'#5f9ea0',
        '--shadow':'6px 3px 3px #104610',
        '--border':'#060202c8',
        '--name':'#e0e0dc95'
    }
};
function onThemeSelectHandler() {
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(`Вы действительно хотите изменить тему:${selectedTheme}`);
    if (!isConfirmed) {
        themeSelect.value= lastTheme;
        return;
    }
    setTheme(selectedTheme);
    lastTheme = selectedTheme;
}
function setTheme (color) {
    const selectedThemeObj = themes[color];
    Object.entries(selectedThemeObj).forEach(([key,value]) => {
        document.documentElement.style.setProperty(key,value);
    });
} 


function createHTMLforCharacter(link,character) { // cоздание дом-узла для вставки картинки и имени
    const img_div = document.createElement('div');
    img_div.classList.add('img_div');
    const img = document.createElement('img');
    img.classList.add('img');
    img.src = link;
    const nameTxt = document.createElement('span');
    nameTxt.classList.add('name');
    nameTxt.textContent=character;
    img_div.appendChild(img);
    div.appendChild(img_div);
    img_div.appendChild(nameTxt);
}
async function getCharacterFromRequest(url) { // Обработка ответа от сервера и добавление картинок на страницу
    try {
        const res = await fetch(url);
        const response = await res.json();
        nextPageUrl = response.info.next;
        response.results.map(({image,name}) => createHTMLforCharacter(image,name));
    }
    catch {
        err.textContent='Такого имени не существует';
        err.classList.add('catch');
        div.innerHTML='';    
    }
}
function getUrlFromName() { // Получение URL-адреса с учетом введенного значения и выполнение запроса к серверу
    const value = input.value;
    div.innerHTML='';
    err.innerHTML='';
    const url = `https://rickandmortyapi.com/api/character?name=${value}`;
    if (value.length<MIN_SYMBOLS) return;
    getCharacterFromRequest(url);
}
function addNextPage () { // Отрисовка картинок со следующей страницы
    const windowSize = document.documentElement.getBoundingClientRect().bottom;
    if ((windowSize<document.documentElement.clientHeight+1)&&nextPageUrl)
        getCharacterFromRequest(nextPageUrl);
    
}