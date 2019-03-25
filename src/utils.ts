import { Theme, ThemeProp } from './types';

export const isEmpty = (arr: any[]): boolean =>
  !(Array.isArray(arr) && arr.length > 0);

export const getThemes = ({
  globalThemes = [],
  themes,
}: {
  globalThemes: Theme[];
  themes: ThemeProp[] | boolean;
  [key: string]: any;
}): Theme[] => {
  if (isEmpty(globalThemes) && !themes) {
    return [];
  }
  if (themes === true) {
    return isEmpty(globalThemes) ? [] : globalThemes;
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
