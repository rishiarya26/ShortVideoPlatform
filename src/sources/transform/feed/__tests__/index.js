import {
  transformError, transformSuccess
} from '../index';
import { forYouFeed, forYouFeedFailure } from '../../../../mock/seeds/feed';
import { feed, feedFail } from '../../factories/feed';

describe('transforms for feed', () => {
  it('should return the expected transform for success state', () => {
    expect(transformSuccess(forYouFeed)).toMatchObject(feed);
  });

  it('should return the expected transform for error state', () => {
    expect(transformError(forYouFeedFailure)).toMatchObject(feedFail);
  });
});

