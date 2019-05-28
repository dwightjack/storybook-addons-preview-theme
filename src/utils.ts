import { Theme, ThemeProp, ThemeConfig } from './types';

export function isEmpty(arr: any[]): boolean {
  if (!Array.isArray(arr)) {
    return true;
  }
  return arr.length <= 0;
}

export const getThemes = ({
  globalThemes = [],
  themes,
}: ThemeConfig): Theme[] | null => {
  if (isEmpty(globalThemes) || !themes) {
    return null;
  }
  if (themes === true && !isEmpty(globalThemes)) {
    return globalThemes;
  }
  return (themes as ThemeProp[])
    .map((theme) => {
      if (typeof theme === 'string') {
        return globalThemes.find(({ name }) => name === theme);
      }
      return theme;
    })
    .filter((x) => x);
};
