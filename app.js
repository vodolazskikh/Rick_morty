var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var MIN_SYMBOLS = 3; // Минимальное количество символов при вводе
var div = document.querySelector('div'); // Получение дом-элементов
var err = document.getElementById('err');
var input = document.querySelector('input');
var nextPageUrl; // URL для получения данных следующей страницы
var themeSelect = document.getElementById('themeSelect');
var lastTheme = 'default'; // Последняя выбранная тема
var themes = {
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
function onThemeSelectHandler() {
    var inputValue = themeSelect.value;
    var isConfirmed = confirm("\u0412\u044B \u0434\u0435\u0439\u0441\u0442\u0432\u0438\u0442\u0435\u043B\u044C\u043D\u043E \u0445\u043E\u0442\u0438\u0442\u0435 \u0438\u0437\u043C\u0435\u043D\u0438\u0442\u044C \u0442\u0435\u043C\u0443:".concat(inputValue));
    if (!isConfirmed) {
        inputValue = lastTheme;
        return;
    }
    setTheme(inputValue);
    lastTheme = inputValue;
}
function setTheme(color) {
    var selectedThemeObj = themes[color];
    Object.entries(selectedThemeObj).forEach(function (_a) {
        var key = _a[0], value = _a[1];
        document.documentElement.style.setProperty(key, value);
    });
}
var debounce = function (fn, ms) {
    // Задержка запроса на 500 мс при вводе данных пользователем
    var timeout;
    return function () {
        var fnCall = function () {
            fn.apply(this, arguments);
        };
        clearTimeout(timeout);
        timeout = setTimeout(fnCall, ms);
    };
};
var getDatafromRequest = debounce(getUrlFromName, 500); // Получение данных ответа с учетом задержки
input.oninput = getDatafromRequest; // Получение URL-адреса с учетом введенного значения
window.addEventListener('scroll', addNextPage); // Добавление картинок след страницы при прокрутке
themeSelect.addEventListener('change', onThemeSelectHandler); // Установка выбранной темы
document.onmouseover = function (e) {
    var elem = e.target;
    if (elem.tagName != 'IMG')
        return;
    elem.classList.add('size');
    elem.classList.add('highlight');
};
document.onmouseout = function (e) {
    // Обработчики для изменения изменения размера и цвета имени
    var elem = e.target;
    if (elem.tagName != 'IMG')
        return;
    elem.classList.remove('size');
    elem.classList.remove('highlight');
};
window.addEventListener('scroll', addNextPage); // Добавление персонажей со след страниц при прокрутке
function createHTMLforCharacter(link, character) {
    // cоздание дом-узла для вставки картинки и имени
    var img_div = document.createElement('div');
    img_div.classList.add('img_div');
    var img = document.createElement('img');
    img.classList.add('img');
    img.src = link;
    var nameTxt = document.createElement('span');
    nameTxt.classList.add('name');
    nameTxt.textContent = character;
    img_div.appendChild(img);
    div.appendChild(img_div);
    img_div.appendChild(nameTxt);
}
function getCharacterFromRequest(url) {
    return __awaiter(this, void 0, void 0, function () {
        var res, response, err_1;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 3, , 4]);
                    return [4 /*yield*/, fetch(url)];
                case 1:
                    res = _a.sent();
                    return [4 /*yield*/, res.json()];
                case 2:
                    response = _a.sent();
                    nextPageUrl = response.info.next;
                    response.results.map(function (_a) {
                        var image = _a.image, name = _a.name;
                        return createHTMLforCharacter(image, name);
                    });
                    return [3 /*break*/, 4];
                case 3:
                    err_1 = _a.sent();
                    err_1.textContent = 'Такого имени не существует';
                    err_1.classList.add('catch');
                    div.innerHTML = '';
                    return [3 /*break*/, 4];
                case 4: return [2 /*return*/];
            }
        });
    });
}
function getUrlFromName() {
    // Получение URL-адреса с учетом введенного значения и выполнение запроса к серверу
    var value = input.value;
    div.innerHTML = '';
    err.innerHTML = '';
    var url = "https://rickandmortyapi.com/api/character?name=".concat(value);
    if (value.length < MIN_SYMBOLS)
        return;
    getCharacterFromRequest(url);
}
function addNextPage() {
    // Отрисовка картинок со следующей страницы
    var windowSize = document.documentElement.getBoundingClientRect().bottom;
    if (windowSize < document.documentElement.clientHeight + 1 && nextPageUrl)
        getCharacterFromRequest(nextPageUrl);
}
