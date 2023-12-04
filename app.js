function Renderimages (data) { // Получение массива ссылок на картинки
 const images = data.results.map(item=> {
return item.image})
console.log(data)
return images;
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
  .then(Renderimages)
  .then(getImages)
  .catch(()=> {
    txt.textContent = 'Такого имени не существует';
    div.innerHTML=''
  })
}
function getImages(images) { // Получение и обработка запросов на получение картинок
  let links = images.map(image=>fetch(image));
  Promise.all(links).then(res=> {
    div.innerHTML='';
    res.forEach(Template)
  });
  }
function Template (item) { // cоздание дом-узла для вставки картинки
  let img = document.createElement('img');
  img.classList.add('img');
  img.src = (item.url);
  div.appendChild(img);
}