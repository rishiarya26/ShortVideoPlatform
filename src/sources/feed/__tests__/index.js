import { get } from 'network';
import { getHomeFeed } from '../index';
import { forYouFeed, forYouFeedFailure } from '../../../mock/seeds/feed';
import { feed } from '../../factories/feed';

jest.mock('network', () => ({
  get: jest.fn()
}));

describe('source for feed', () => {
  it('should return the expected response for success state', async () => {
    get.mockResolvedValueOnce({ ...forYouFeed });
    const data = await getHomeFeed();
    expect(get).toBeCalledTimes(1);
    expect(get).toBeCalledWith(
      'https://stagingmobile.charmboard.com/v3.6/demo/hipi/1'
      // 'https://hipigwapi.zee5.com/api/v1/shorts/home?limit=5&type=following&offset=1'
    );
    expect(JSON.stringify(data)).toEqual(JSON.stringify(feed));
  });

  it('should return the expected response for failure state', async () => {
    get.mockRejectedValueOnce({ ...forYouFeedFailure });
    try {
      await getHomeFeed();
    } catch (e) {
      expect(get).toBeCalledTimes(1);
      expect(get).toBeCalledWith(
        'https://stagingmobile.charmboard.com/v3.6/demo/hipi/1'
        // 'https://hipigwapi.zee5.com/api/v1/shorts/home?limit=5&type=following&offset=1'
      );
      expect(e).toMatchObject({
        status: 'fail',
        'http-status': 400,
        message: 'Failed to fetch.',
        meta: {},
        data: {},
        requestedWith: {}
      });
    }
  });
});
