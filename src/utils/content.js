import { getNetworkConnection } from './device-details';

export const getEffectiveVideoUrl = urls => {
  let videoUrl = urls?.low;
  const networkConnection = getNetworkConnection();
  if (networkConnection === 'fast' && urls?.fast) {
    videoUrl = urls.fast;
  } else if (networkConnection === 'medium' && urls?.medium) {
    videoUrl = urls.medium;
  }
  return videoUrl;
};
