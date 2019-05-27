export interface Theme {
  name: string;
  label: string;
  className: string;
}

export type ThemeProp = Theme | string;

export interface ThemeConfig {
  globalThemes: Theme[];
  themes: ThemeProp[] | boolean;
  [key: string]: any;
}
