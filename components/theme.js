const themeSelect = document.getElementById('themeSelect');
let lastTheme = 'default'; // Последняя выбранная тема
const themes = {
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
    const selectedTheme = themeSelect.value;
    const isConfirmed = confirm(
        `Вы действительно хотите изменить тему:${selectedTheme}`,
    );
    if (!isConfirmed) {
        themeSelect.value = lastTheme;
        return;
    }
    setTheme(selectedTheme);
    lastTheme = selectedTheme;
}


function setTheme(color) {
    const selectedThemeObj = themes[color];
    Object.entries(selectedThemeObj).forEach(([key, value]) => {
        document.documentElement.style.setProperty(key, value);
    });
}

export {onThemeSelectHandler};