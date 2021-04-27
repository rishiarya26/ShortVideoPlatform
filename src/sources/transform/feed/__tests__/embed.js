import {
  transformError, transformSuccess
} from '../embed';
import { forYouEmbedFeed, forYouEmbedFeedFailure } from '../../../../mock/seeds/feed/embed';
import { feed, feedFail } from '../../../factories/embed';

describe('transforms for feed', () => {
  it('should return the expected transform for success state', () => {
    expect(transformSuccess(forYouEmbedFeed)).toMatchObject(feed);
  });

  it('should return the expected transform for error state', () => {
    expect(transformError(forYouEmbedFeedFailure)).toMatchObject(feedFail);
  });
});
