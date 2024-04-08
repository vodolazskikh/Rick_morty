type Theme = 'default' | 'light'| 'dark';

interface ThemeParams {
        '--base-color': string;
        '--shadow': string;
        '--border': string;
        '--name': string;
}

interface CharacterData {
  image: string;
  name: string;
}

export {Theme,ThemeParams,CharacterData}