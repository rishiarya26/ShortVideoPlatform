import { get } from 'network';
import {
  getSingleFeed
} from '../embed';
import { forYouEmbedFeed, forYouEmbedFeedFailure } from '../../../mock/seeds/feed/embed';
import { feed } from '../../factories/embed';

jest.mock('network', () => ({
  get: jest.fn()
}));

describe('source for feed', () => {
  it('should return the expected response for success state', async () => {
    get.mockResolvedValueOnce({ ...forYouEmbedFeed });
    const data = await getSingleFeed({ page: 1 });
    expect(get).toBeCalledTimes(1);
    expect(get).toBeCalledWith('https://hipigwapi.zee5.com/api/v1/shorts/video/detail?id=1');
    expect(data).toMatchObject(feed);
  });

  it('should return the expected response for failure state', async () => {
    get.mockRejectedValueOnce({ ...forYouEmbedFeedFailure });
    try {
      await getSingleFeed({ page: 1 });
    } catch (e) {
      expect(get).toBeCalledTimes(1);
      expect(get).toBeCalledWith('https://hipigwapi.zee5.com/api/v1/shorts/video/detail?id=1');
      expect(e).toMatchObject({
        status: 'fail',
        message: 'Failed to fetch.',
        meta: {},
        data: {},
        requestedWith: {},
        'http-status': 400
      });
    }
  });
});

