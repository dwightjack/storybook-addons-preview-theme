import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import * as components from '@storybook/components';
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
  Form.Select = ({ children, ...props }) => (
    <select {...props}>{children}</select>
  );
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

  test('change event handler', () => {
    (utils.getThemes as any).mockImplementation(() => [{ name: 'dark' }]);
    const { container } = render(
      <Panel api={api} channel={channel} active={true} />,
    );

    fireEvent.change(container.querySelector('select'), {
      target: { value: 'demo' },
    });
    expect(container.querySelector('select').value).toBe('demo');
  });
});
