import { Theme, ThemeProp, ThemeConfig } from './types';

export const isEmpty = (arr: any[]): boolean =>
  !(Array.isArray(arr) && arr.length > 0);

export const getThemes = ({
  globalThemes = [],
  themes,
}: ThemeConfig): Theme[] => {
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
