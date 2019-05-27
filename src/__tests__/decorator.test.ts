import * as addons from '@storybook/addons';

jest.mock('@storybook/addons');

describe('Addon Decorator', () => {
  let on;
  let withTheme;
  beforeEach(() => {
    on = jest.fn();
    (addons.makeDecorator as any).mockImplementation((v: any) => v);
    (addons.default.getChannel as any).mockImplementation(() => ({ on }));
    withTheme = require('../decorator');
  });
  test('decorator props', () => {
    expect(withTheme.name).toBe('withTheme');
  });
});
