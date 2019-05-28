import * as utils from '../utils';

describe('Utils', () => {
  describe('isEmpty', () => {
    test('fails if not an array', () => {
      expect(utils.isEmpty('' as any)).toBe(true);
    });
    test('fails on empty array', () => {
      expect(utils.isEmpty([])).toBe(true);
    });
    test('succeeds on non-empty arrays', () => {
      expect(utils.isEmpty([''])).toBe(false);
    });
  });

  describe('getThemes', () => {
    const dark = { name: 'dark', label: 'Dark', className: '-dark' };
    const light = { name: 'light', label: 'Light', className: '-light' };
    const globalThemes = [dark, light];
    test('returns null if "globalThemes" is empty', () => {
      const result = utils.getThemes({ globalThemes: [] });
      expect(result).toBe(null);
    });

    test('returns null if "themes" is falsy', () => {
      const result = utils.getThemes({ globalThemes, themes: null });
      expect(result).toBe(null);
    });

    test('returns the whole globalThemes object if "themes" is true', () => {
      const result = utils.getThemes({ globalThemes, themes: true });
      expect(result).toBe(globalThemes);
    });

    test('filters by theme name', () => {
      const result = utils.getThemes({ globalThemes, themes: ['dark'] });
      expect(result).toEqual([dark]);
    });

    test('returns non-string themes', () => {
      const demoTheme = { name: 'demo', label: 'Demo', className: '-demo' };
      const result = utils.getThemes({
        globalThemes,
        themes: [demoTheme, 'dark'],
      });
      expect(result).toEqual([demoTheme, dark]);
    });

    test('filters themes not defined in globalThemes', () => {
      const result = utils.getThemes({
        globalThemes,
        themes: ['alt'],
      });
      expect(result).toEqual([]);
    });
  });
});
