import * as React from 'react';
import { render, fireEvent } from 'react-testing-library';
import { Select } from '../components/Select';

jest.mock('@storybook/components', () => ({
  Form: {
    Select: ({ children, ...props }) => <select {...props}>{children}</select>,
  },
}));

describe('<Select/>', () => {
  test('matches minimal snapshot', () => {
    const { container } = render(<Select onChange={() => {}} />);
    expect(container.firstChild).toMatchSnapshot();
  });

  test('matches snapshot', () => {
    const options = [{ name: 'dark', label: 'Dark', className: '-dark' }];
    const { container } = render(
      <Select options={options} onChange={() => {}} value="dark" />,
    );
    expect(container.firstChild).toMatchSnapshot();
  });

  test('attaches onChange prop to the select element', () => {
    const spy = jest.fn();
    const { container } = render(<Select onChange={spy} />);
    fireEvent.change(container.firstElementChild);
    expect(spy).toHaveBeenCalled();
  });
});
