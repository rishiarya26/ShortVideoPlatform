import { repoList, deleteRepo } from './github-repo';
import { forYouFeed } from './feed';
import { forYouEmbedFeed } from './feed/embed';
import { comments } from './social';

export const mockDataBase = {
  repoList,
  deleteRepo,
  forYouFeed,
  forYouEmbedFeed,
  comments
};
