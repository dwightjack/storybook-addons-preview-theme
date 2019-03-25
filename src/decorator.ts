import addons, {
  makeDecorator,
  StoryGetter,
  StoryContext,
} from '@storybook/addons';

export const withTheme = makeDecorator({
  name: 'withTheme',
  parameterName: 'themes',
  skipIfNoParametersOrOptions: true,
  wrapper(getStory: StoryGetter, context: StoryContext, { parameters }) {
    if (parameters === false) {
      return getStory(context);
    }

    const channel = addons.getChannel();
    let themeClass: string;

    channel.on('preview-theme:change', (selected) => {
      if (selected !== 'none') {
        document.body.classList.add(selected);
      } else if (selected === 'none' && themeClass) {
        document.body.classList.remove(themeClass);
      }
      themeClass = selected;
    });

    return getStory(context);
  },
});
