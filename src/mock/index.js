import { Server } from 'miragejs';
import { mockDataBase } from './seeds';
import { getListRequestHandler, deleteListRequestHandler } from './req-handlers/github';
import { getForYouFeed } from './req-handlers/feed';
import { getForYouEmbedFeed } from './req-handlers/embed';
import { getComments } from './req-handlers/social';
import { getUserProfile } from './req-handlers/users/profile';

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
      this.get('https://hipigwapi.zee5.com/api/v1/shorts/home', getForYouFeed);
      this.get('https://hipigwapi.zee5.com/api/v1/shorts/video/detail', getForYouEmbedFeed);

      // social
      this.get('https://api.getsocial.im/v1/activities', getComments);

      // users-profile
      this.get('https://hipigwapi.zee5.com/api/v1/shorts/profile', getUserProfile);
    }
  });
  return server;
}

export default mockServer;
