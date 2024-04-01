const MIN_SYMBOLS: number = 3; // Минимальное количество символов при вводе
const div: Element = document.querySelector('div')!; // Получение дом-элементов
const err: Element = document.getElementById('err')!;
const input: HTMLInputElement = document.querySelector('input')!;
let nextPageUrl: string; // URL для получения данных следующей страницы
const themeSelect: Element = document.getElementById('themeSelect')!;
let lastTheme: string = 'default'; // Последняя выбранная тема

const themes: object = {
    // CSS-свойства для изменения темы
    default: {
        '--base-color': '#ced4da',
        '--shadow': '6px 3px 3px #8e8989',
        '--border': '#faebd7',
        '--name': '#c1ca5c95',
    },
    light: {
        '--base-color': '#e0f365e7',
        '--shadow': '6px 3px 3px #495057',
        '--border': '#90580e',
        '--name': '#f2cd68d8',
    },
    dark: {
        '--base-color': '#5f9ea0',
        '--shadow': '6px 3px 3px #104610',
        '--border': '#060202c8',
        '--name': '#e0e0dc95',
    },
};

function onThemeSelectHandler(): void {
    let inputValue: string = (<HTMLInputElement>themeSelect).value;
    const isConfirmed = confirm(
        `Вы действительно хотите изменить тему:${inputValue}`,
    );
    if (!isConfirmed) {
        inputValue = lastTheme;
        return;
    }
    setTheme(inputValue);
    lastTheme = inputValue;
}

function setTheme(color: object): void {
    const selectedThemeObj: object = themes[color];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
}

const debounce = (fn: any, ms: number) => {
    // Задержка запроса на 500 мс при вводе данных пользователем
    let timeout: number;
    return function () {
        const fnCall = function() {
            fn.apply(this,arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
};
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
async function getCharacterFromRequest(url: string) {
    // Обработка ответа от сервера и добавление картинок на страницу
    try {
        interface Data {
            image: string;
            name: string;
        }
        const res = await fetch(url);
        const response = await res.json();
        nextPageUrl = response.info.next;
        response.results.map(({ image, name }: Data) =>
            createHTMLforCharacter(image, name),
        );
    } catch (err: any) {
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
