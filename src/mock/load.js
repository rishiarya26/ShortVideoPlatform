import { isMockMode } from '../config';

function loadMockServerOnce() {
  let initializeMockServer = true;
  const channel = {};
  channel.waitOn = new Promise((resolve, reject) => {
    channel.resolve = resolve;
    channel.reject = reject;
  });
  return async () => {
    if (isMockMode() && initializeMockServer) {
      const { default: mockServer } = await import('.');
      mockServer('development', channel.resolve);
      initializeMockServer = false;
    } else {
      channel.resolve();
    }
    return channel.waitOn;
  };
}

export const loadMockServer = loadMockServerOnce();
