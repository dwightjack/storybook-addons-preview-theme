import * as addons from '@storybook/addons';

jest.mock('@storybook/addons');

describe('Addon Decorator', () => {
  let withTheme: any;
  let onSpy: any;
  const context = {};
  beforeEach(() => {
    onSpy = jest.fn();
    (addons.makeDecorator as any).mockImplementation((v: any) => v);
    (addons.default.getChannel as any).mockImplementation(() => ({
      on: onSpy,
    }));
    ({ withTheme } = require('../decorator'));
  });
  test('returns a decorator', () => {
    expect(addons.makeDecorator).toHaveBeenCalled();
  });
  test('decorator props', () => {
    expect(withTheme).toEqual({
      name: 'withTheme',
      parameterName: 'themes',
      skipIfNoParametersOrOptions: true,
      wrapper: expect.any(Function),
    });
  });

  describe('wrapper function', () => {
    let spy: any;
    let wrapper: any;

    beforeEach(() => {
      spy = jest.fn(() => true);
      ({ wrapper } = withTheme);
      (addons.default.getChannel as any).mockClear();
    });

    test('returns the result of first argument function', () => {
      expect(wrapper(spy, context, { parameters: false })).toBe(true);
      expect(spy).toHaveBeenCalledWith(context);

      spy.mockClear();

      expect(wrapper(spy, context, { parameters: true })).toBe(true);
      expect(spy).toHaveBeenCalledWith(context);
    });

    test('early return if parameters is "false"', () => {
      wrapper(spy, context, { parameters: false });
      expect(addons.default.getChannel).not.toHaveBeenCalled();
    });

    test('adds an event listener for "preview-theme:change" to channels', () => {
      wrapper(spy, context, { parameters: true });
      expect(addons.default.getChannel).toHaveBeenCalled();
      expect(onSpy).toHaveBeenCalledWith(
        'preview-theme:change',
        expect.any(Function),
      );
    });
  });

  describe('listener', () => {
    let listener: any;
    let parameters: any;
    beforeEach(() => {
      parameters = {};

      onSpy.mockImplementation((str: string, fn: any) => {
        listener = fn;
      });
      withTheme.wrapper((): void => {}, context, { parameters });

      document.body.className = '';
    });

    test('if first argument is string sets the dom', () => {
      listener('DEMO');
      expect(document.body.className).toBe('DEMO');
    });

    test('always removes the previous class value preserving unrelated classes', () => {
      document.body.className = 'static';
      listener('DEMO');
      listener('NEW');
      expect(document.body.className).toBe('static NEW');
    });

    test('does NOT add the "none" class string', () => {
      listener('none');
      expect(document.body.className).not.toMatch('none');
    });
  });
});
