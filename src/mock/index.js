import { Server } from 'miragejs';
import { mockDataBase } from './seeds';
import { getListRequestHandler, deleteListRequestHandler } from './req-handlers/github';

function mockServer(environment = 'development', callback) {
  const server = new Server({
    environment,
    seeds(server) {
      server.db.loadData(mockDataBase);
      callback();
    },
    routes() {
      this.get('https://api.github.com/search/repositories', getListRequestHandler);
      this.delete('https://api.github.com/delete/repositories', deleteListRequestHandler);
    }
  });
  return server;
}

const isMockAPi = (process.env.MOCK_MODE === 'y');

function loadMockServerOnce() {
  let initializeMockServer = true;
  const channel = {};
  channel.waitOn = new Promise((resolve, reject) => {
    channel.resolve = resolve;
    channel.reject = reject;
  });
  return async () => {
    if (isMockAPi && initializeMockServer) {
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
