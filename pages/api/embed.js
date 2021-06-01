import { forYouEmbedFeed } from '../../src/mock/seeds/feed/embed';

export default function handler(req, res) {
  res.status(200).json(forYouEmbedFeed.data);
}
