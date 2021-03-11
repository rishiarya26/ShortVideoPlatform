import { get } from 'network';
import {
  getHomeFeed
} from '../index';
import { forYouFeed, forYouFeedFailure } from '../../../mock/seeds/feed';
import { feed } from '../../factories/feed';

jest.mock('network', () => ({
  get: jest.fn()
}));

describe('source for feed', () => {
  it('should return the expected response for success state', async () => {
    get.mockResolvedValueOnce({ data: forYouFeed });
    const data = await getHomeFeed();
    expect(get).toBeCalledTimes(1);
    expect(get).toBeCalledWith('https://zee5.com/v2/shorts/home');
    expect(data).toMatchObject(feed);
  });

  it('should return the expected response for failure state', async () => {
    get.mockRejectedValueOnce({ data: forYouFeedFailure });
    try {
      await getHomeFeed();
    } catch (e) {
      expect(get).toBeCalledTimes(1);
      expect(get).toBeCalledWith('https://zee5.com/v2/shorts/home');
      expect(e).toMatchObject({
        status: 'fail',
        message: 'something went wrong',
        meta: {},
        data: {},
        requestedWith: {},
        'http-status': undefined
      });
    }
  });
});

