import * as React from 'react';
import { useState, useEffect } from 'react';
import { Form, Placeholder } from '@storybook/components';
import { STORY_CHANGED } from '@storybook/core-events';
import { Select } from './Select';
import { PanelWrapper } from './PanelWrapper';
import { getThemes } from '../utils';

export interface PanelProp {
  api: any;
  active: boolean;
  channel: any;
}

export function Panel({
  api,
  active,
  channel,
}): React.FunctionComponentElement<PanelProp> {
  const [selected, setSelected] = useState('none');
  const data = api.getCurrentStoryData();

  useEffect(() => {
    const listener = (): void => {
      setSelected('none');
    };

    api.on(STORY_CHANGED, listener);

    return () => {
      api.off(STORY_CHANGED, listener);
    };
  }, []);

  useEffect(() => {
    channel.emit('preview-theme:change', selected);
  }, [selected]);

  if (!active || !data) {
    return null;
  }

  const themes = getThemes(data.parameters || {});

  if (!Array.isArray(themes) || themes.length === 0) {
    return (
      <Placeholder>Theme swatches not available for this story</Placeholder>
    );
  }

  return (
    <PanelWrapper>
      <Form>
        <Form.Field>
          <Select
            value={selected}
            onChange={({ target }) => setSelected(target.value)}
            options={themes}
          />
        </Form.Field>
      </Form>
    </PanelWrapper>
  );
}
