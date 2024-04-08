
import { CharacterData } from './components/types';
import { debounce } from './components/debounce';
import { themeSelect, onThemeSelectHandler } from './components/themes';
import { createHTMLforCharacter,div } from './components/createDOMel';


const MIN_SYMBOLS: number = 3; // Минимальное количество символов при вводе
const err: Element = document.getElementById('err')!;
const input: HTMLInputElement = document.querySelector('input')!;
let nextPageUrl: string; // URL для получения данных следующей страницы


const getDatafromRequest = debounce(getUrlFromName, 500); // Получение данных ответа с учетом задержки
input.oninput = getDatafromRequest; // Получение URL-адреса с учетом введенного значения
window.addEventListener('scroll', addNextPage); // Добавление картинок след страницы при прокрутке
themeSelect.addEventListener('change', onThemeSelectHandler); // Установка выбранной темы
document.onmouseover = function (e: MouseEvent) {
    const elem = e.target as HTMLElement;
    if (elem.tagName != 'IMG') return;
    elem.classList.add('size');
    elem.classList.add('highlight');
};
document.onmouseout = function (e: MouseEvent) {
    // Обработчики для изменения изменения размера и цвета имени
    const elem = e.target as HTMLElement;
    if (elem.tagName != 'IMG') return;
    elem.classList.remove('size');
    elem.classList.remove('highlight');
};
window.addEventListener('scroll', addNextPage); // Добавление персонажей со след страниц при прокрутке

async function getCharacterFromRequest(url: string) {
    // Обработка ответа от сервера и добавление картинок на страницу
    try {
        const res = await fetch(url);
        const response = await res.json();
        nextPageUrl = response.info.next;
        response.results.map(({ image, name }: CharacterData) =>
            createHTMLforCharacter(image, name),
        );
    } catch {
        err.textContent = 'Такого имени не существует';
        err.classList.add('catch');
        div.innerHTML = '';
    }
}
function getUrlFromName() {
    // Получение URL-адреса с учетом введенного значения и выполнение запроса к серверу
    const value = input.value;
    div.innerHTML = '';
    err.innerHTML = '';
    const url = `https://rickandmortyapi.com/api/character?name=${value}`;
    if (value.length < MIN_SYMBOLS) return;
    getCharacterFromRequest(url);
}
function addNextPage() {
    // Отрисовка картинок со следующей страницы
    const windowSize = document.documentElement.getBoundingClientRect().bottom;
    if (windowSize < document.documentElement.clientHeight + 1 && nextPageUrl)
        getCharacterFromRequest(nextPageUrl);
}
