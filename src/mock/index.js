import { Server } from 'miragejs';
import { mockDataBase } from './seeds';
import { getListRequestHandler, deleteListRequestHandler } from './req-handlers/github';
import { getForYouFeed } from './req-handlers/feed';
import { getForYouEmbedFeed } from './req-handlers/embed';
import { getComments } from './req-handlers/social';
import { isMockMode } from '../config';

function mockServer(environment = 'development', callback) {
  console.log('running in mock mode');
  const server = new Server({
    environment,
    seeds(server) {
      server.db.loadData(mockDataBase);
      callback();
    },
    routes() {
      // git
      this.get('https://api.github.com/search/repositories', getListRequestHandler);
      this.delete('https://api.github.com/delete/repositories', deleteListRequestHandler);

      // feed
      this.get('https://mobiletest.charmboard.com/v3.6/demo/hipifeed/1/5', getForYouFeed);
      this.get('https://mobiletest.charmboard.com/v3.6/demo/hipifeed/1/1', getForYouEmbedFeed);

      // social
      this.get('https://api.getsocial.im/v1/activities', getComments);
    }
  });
  return server;
}

function loadMockServerOnce() {
  let initializeMockServer = true;
  const channel = {};
  channel.waitOn = new Promise((resolve, reject) => {
    channel.resolve = resolve;
    channel.reject = reject;
  });
  return async () => {
    if (isMockMode() && initializeMockServer) {
      const { default: mockServer } = await import('../mock');
      mockServer('development', channel.resolve);
      initializeMockServer = false;
    } else {
      channel.resolve();
    }
    return channel.waitOn;
  };
}

export const loadMockServer = loadMockServerOnce();

export default mockServer;
