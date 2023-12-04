function renderCharacters (data) { // Получение массива ссылок на картинки и имена
const info = {};
const images = data.results.map(item=> item.image);
const names = data.results.map(item=> item.name);
info.names = names;
info.images = images;
return info;
}
async function getCharacters() { // Получение ответа на запрос с учетом введенного значения
value = input.value;
const url = `https://rickandmortyapi.com/api/character?name=${value}`;
let res = await fetch(url);
let response = await res.json();
return response;
}
const div = document.querySelector('div'); //дом-элементы
const input = document.querySelector('input');
const txt = document.getElementById('result')
input.oninput = onsubmithandler
function onsubmithandler() {
  txt.textContent='';
  getCharacters()
  .then(renderCharacters)
  .then(getInfo)
  .catch(()=> {
    document.createElement('span')
    let err = document.querySelector('span')
    err.textContent='Такого имени не существует'
    err.classList.add('catch')
    div.innerHTML=''
  })
}
function getInfo({images,names}) { // Получение и обработка запросов на получение картинок и имен
  let links = images.map(image=>fetch(image));
  Promise.all(links).then(res=> {
    div.innerHTML='';
    res.forEach(link => {
      const a = res.indexOf(link)
      createImg(link,names,a);
    })
  });
  };
function createImg(link,characters,i) { // cоздание дом-узла для вставки картинки и имени
  let img_div = document.createElement('div')
  img_div.classList.add('img_div')
  let img = document.createElement('img');
  img.classList.add('img');
  img.src = link.url;
  let nametxt = document.createElement('div');
  nametxt.classList.add('name');
  nametxt.textContent=characters[i];
  img_div.appendChild(img);
  div.appendChild(img_div);
  img_div.appendChild(nametxt);
}
const themes = {
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
let lasttheme = 'default';
const themeSelect = document.getElementById('themeSelect');
themeSelect.addEventListener('change',onThemeSelectHandler);
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