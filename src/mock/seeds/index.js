import { repoList, deleteRepo } from './github-repo';
import { forYouFeed } from './feed';
import { forYouEmbedFeed } from './feed/embed';
import { comments } from './social';
import { login } from './auth';
import { hipiLogin } from './auth/hipi-login';
import { profileData } from './users/profile-edit';
import { profile } from './users/profile';
import { profileFeed } from './users/profile-feed';
import { shop } from './can-shop';

export const mockDataBase = {
  repoList,
  deleteRepo,
  forYouFeed,
  forYouEmbedFeed,
  comments,
  login,
  hipiLogin,
  profileData,
  profile,
  profileFeed,
  shop
};
