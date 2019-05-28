import * as React from 'react';
import { render } from 'react-testing-library';
import { PanelWrapper } from '../components/PanelWrapper';

describe('<PanelWrapper />', () => {
  test('matches snapshot', () => {
    const { container } = render(<PanelWrapper />);
    expect(container.firstElementChild).toMatchSnapshot();
  });
});
