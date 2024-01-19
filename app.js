const div = document.querySelector('div'); // Получение дом-элементов
const err = document.getElementById('err'); 
const input = document.querySelector('input');
const themeSelect = document.getElementById('themeSelect');
const txt = document.getElementById('result');
let lasttheme = 'default'; // Последняя выбранная тема
let nextPageUrl; // URL для получения данных следующей страницы 
input.oninput = getUrlFromName; // Получение URL-адреса с учетом введенного значения
window.addEventListener('scroll', addNextPage) // Добавление картинок след страницы при прокрутке
themeSelect.addEventListener('change',onThemeSelectHandler); // Установка выбранной темы 
document.onmouseover= function(e){
  if (e.target.tagName!='IMG') return;
    e.target.classList.add('size');
    e.target.nextSibling.classList.add('highlight');
}
document.onmouseout=function(e) {// Обработчики для изменения изменения размера и цвета имени
  if (e.target.tagName!='IMG') return;
    e.target.classList.remove('size');
    e.target.nextSibling.classList.remove('highlight');
} 
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
}
function onThemeSelectHandler(e) {
  const selectedtheme = themeSelect.value;
  const isConfirmed = confirm(`Вы действительно хотите изменить тему:${selectedtheme}`);
  if (!isConfirmed) {
    themeSelect.value= lasttheme;
    return;
  }
  setTheme(selectedtheme);
  lasttheme = selectedtheme;
}
function setTheme (color) {
  const selectedthemeObj = themes[color];
  Object.entries(selectedthemeObj).forEach(([key,value]) => {
    document.documentElement.style.setProperty(key,value);
  })
} 
function createHTMLforImg(link,character) { // cоздание дом-узла для вставки картинки и имени
  let img_div = document.createElement('div');
    img_div.classList.add('img_div');
  let img = document.createElement('img');
    img.classList.add('img');
      img.src = link;
  let nametxt = document.createElement('span');
    nametxt.classList.add('name');
      nametxt.textContent=character;
  img_div.appendChild(img);
  div.appendChild(img_div);
  img_div.appendChild(nametxt);
}
async function getImgFromRequest(url) { // Обработка ответа от сервера и добавление картинок на страницу
try {
  let res = await fetch(url);
  let response = await res.json();
  nextPageUrl = response.info.next;
    response.results.map(({image,name}) => createHTMLforImg(image,name))
    }
catch {
  err.textContent='Такого имени не существует';
  err.classList.add('catch');
  div.innerHTML='';    
      }
}
function getUrlFromName() { // Получение URL-адреса с учетом введенного значения и выполнение запроса к серверу
  let value = input.value;
  div.innerHTML='';
  err.innerHTML='';
  const url = `https://rickandmortyapi.com/api/character?name=${value}`;
    if (value.length<3) return;
      getImgFromRequest(url);
}
function addNextPage () { // Отрисовка картинок со следующей страницы
  let windowSize = document.documentElement.getBoundingClientRect().bottom;
    if ((windowSize<document.documentElement.clientHeight+1)&&nextPageUrl)
      getImgFromRequest(nextPageUrl);
}