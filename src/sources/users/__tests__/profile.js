import { get } from 'network';
import { getUserProfile } from '../profile';
import { profile, prfoileFailure } from '../../../mock/seeds/users/profile';
import { userProfile } from '../../factories/profile';
import { getApiBasePath } from '../../../config';

jest.mock('network', () => ({
  get: jest.fn()
}));
const userId = '34224242424';
const apiPath = `${getApiBasePath('hipi')}/v1/shorts/profile?id=${userId}`;
describe('source for profile', () => {
  it('should return the expected response for success state', async () => {
    get.mockResolvedValueOnce({ data: profile });
    const data = await getUserProfile();
    expect(get).toBeCalledTimes(1);
    expect(get).toBeCalledWith(apiPath);
    expect(data).toMatchObject(userProfile);
  });

  it('should return the expected response for failure state', async () => {
    get.mockRejectedValueOnce({ data: prfoileFailure });
    try {
      await getUserProfile();
    } catch (e) {
      expect(get).toBeCalledTimes(1);
      expect(get).toBeCalledWith(apiPath);
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

