import { Theme,ThemeParams } from "./types";

const themeSelect: Element = document.getElementById('themeSelect')!;
let lastTheme: Theme; // Последняя выбранная тема
const themes: Record<Theme,ThemeParams> = {
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
  let inputValue = (<HTMLInputElement>themeSelect).value as Theme;
  const isConfirmed = confirm(
      `Вы действительно хотите изменить тему:${inputValue}`,
  );
  if (!isConfirmed) {
      (<HTMLInputElement>themeSelect).value = lastTheme;
      return;
  }
  setTheme(inputValue);
  lastTheme = inputValue;
}

function setTheme(color:Theme): void {
  const selectedThemeObj: ThemeParams = themes[color];
  Object.entries(selectedThemeObj).forEach(([key, value]) => {
      document.documentElement.style.setProperty(key, value);
  });
}

export {onThemeSelectHandler,themeSelect}