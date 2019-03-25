import addons from '@storybook/addons';
import { createElement as h } from 'react';
import { Panel } from './components/Panel';

addons.register(`storybook-addon-preview-theme`, (api) => {
  const channel = addons.getChannel();
  addons.addPanel(`storybook-addon-preview-theme`, {
    title: 'Themes',
    render: ({ active, key }) =>
      h(Panel, {
        key,
        api,
        channel,
        active,
      }),
  });
});
