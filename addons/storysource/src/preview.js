import addons from '@storybook/addons';
import { EVENT_ID } from './events';

function getLocation(context, locationsMap) {
  return locationsMap[`${context.kind}@${context.story}`] || locationsMap[`@${context.story}`];
}

function setStorySource(context, source, locationsMap) {
  const currentLocation = getLocation(context, locationsMap);

  if (!currentLocation) {
    return;
  }

  const channel = addons.getChannel();

  channel.emit(EVENT_ID, {
    source,
    currentLocation,
    locationsMap,
  });
}

export function withStorySource(source, locationsMap = {}) {
  return (story, context) => {
    setStorySource(context, source, locationsMap);
    return story();
  };
}
