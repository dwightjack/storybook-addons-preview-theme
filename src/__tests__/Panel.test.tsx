import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import * as components from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { Panel } from '../components/Panel';
import * as utils from '../utils';

jest.mock('../utils', () => {
  return {
    getThemes: jest.fn(),
  };
});

jest.mock('@storybook/components', () => {
  const Placeholder = jest.fn(() => <div />);
  const Form = ({ children }) => <form>{children}</form>;
  Form.Field = ({ children }) => <div>{children}</div>;
  Form.Select = ({ children, ...props }) => {
    return <input className="select" {...props} />;
  };
  return { Form, Placeholder };
});

describe('<Panel />', () => {
  let api;
  let channel;
  beforeEach(() => {
    channel = { emit: jest.fn() };
    api = {
      getCurrentStoryData: jest.fn(() => ({})),
      on: jest.fn(),
      off: jest.fn(),
    };
  });
  test('returns nothing if the panel is not active', () => {
    const { container } = render(
      <Panel api={api} channel={channel} active={false} />,
    );
    expect(container.childElementCount).toBe(0);
  });

  test('returns nothing if there are no story data', () => {
    api.getCurrentStoryData.mockImplementation(() => null);
    const { container } = render(
      <Panel api={api} channel={channel} active={true} />,
    );
    expect(container.childElementCount).toBe(0);
  });

  test('default snapshot', () => {
    render(<Panel api={api} channel={channel} active={true} />);
    expect(components.Placeholder).toHaveBeenCalled();

    components.Placeholder.mockClear();

    (utils.getThemes as any).mockImplementation(() => []);
    render(<Panel api={api} channel={channel} active={true} />);
    expect(components.Placeholder).toHaveBeenCalled();
  });

  test('default snapshot', () => {
    (utils.getThemes as any).mockImplementation(() => [{ name: 'dark' }]);
    const { container } = render(
      <Panel api={api} channel={channel} active={true} />,
    );
    expect(container.firstElementChild).toMatchSnapshot();
  });

  describe('Events and effects', () => {
    let result;
    let container;
    beforeEach(() => {
      (utils.getThemes as any).mockImplementation(() => [
        { name: 'dark', label: 'Dark', className: '-dark' },
      ]);
      result = render(<Panel api={api} channel={channel} active={true} />);
      ({ container } = result);
      channel.emit.mockClear();
    });

    test('change event handler', () => {
      fireEvent.change(container.querySelector('input.select'), {
        target: { value: 'dark' },
      });
      expect(
        container.querySelector('input.select').getAttribute('value'),
      ).toBe('dark');
    });

    test('emits "preview-theme:change"', () => {
      fireEvent.change(container.querySelector('input.select'), {
        target: { value: 'dark' },
      });
      expect(channel.emit).toHaveBeenCalledWith('preview-theme:change', 'dark');
    });

    test('attaches a listener to "STORY_CHANGED"', () => {
      expect(api.on).toHaveBeenCalledWith(STORY_CHANGED, expect.any(Function));
    });

    test('calls off with "STORY_CHANGED" on unmount ', () => {
      result.unmount();
      expect(api.off).toHaveBeenCalledWith(STORY_CHANGED, expect.any(Function));
    });
  });
});
