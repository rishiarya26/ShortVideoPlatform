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
    get.mockResolvedValueOnce({ data: forYouEmbedFeed });
    const data = await getSingleFeed();
    expect(get).toBeCalledTimes(1);
    expect(get).toBeCalledWith('https://mobiletest.charmboard.com/v3.6/demo/hipifeed/1/1');
    expect(data).toMatchObject(feed);
  });

  it('should return the expected response for failure state', async () => {
    get.mockRejectedValueOnce({ data: forYouEmbedFeedFailure });
    try {
      await getSingleFeed();
    } catch (e) {
      expect(get).toBeCalledTimes(1);
      expect(get).toBeCalledWith('https://mobiletest.charmboard.com/v3.6/demo/hipifeed/1/1');
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

