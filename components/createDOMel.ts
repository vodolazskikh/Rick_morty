const div: Element = document.querySelector('div')!; // Получение дом-элементов

function createHTMLforCharacter(link: string, character: string) {
  // cоздание дом-узла для вставки картинки и имени
  const img_div = document.createElement('div');
  img_div.classList.add('img_div');
  const img = document.createElement('img');
  img.classList.add('img');
  img.src = link;
  const nameTxt = document.createElement('span');
  nameTxt.classList.add('name');
  nameTxt.textContent = character;
  img_div.appendChild(img);
  div.appendChild(img_div);
  img_div.appendChild(nameTxt);
}

export {createHTMLforCharacter,div}