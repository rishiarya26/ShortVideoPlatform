// import { get } from 'network';
// import { srSendOtp } from '../index';
// import { getApiBasePath } from '../../../config';
// import { forYouFeed, forYouFeedFailure } from '../../../mock/seeds/otp';
// import { otp } from '../../factories/otp';

// jest.mock('network', () => ({
//   get: jest.fn()
// }));
// const apiPath = `${getApiBasePath('hipi')}/v1/shorts/sendOtp`;

// describe('source for otp', () => {
//   it('should return the expected response for success state', async () => {
//     get.mockResolvedValueOnce({ data: forYouFeed });
//     const data = await srSendOtp();
//     expect(get).toBeCalledTimes(1);
//     expect(get).toBeCalledWith(apiPath);
//     expect(data).toMatchObject(otp);
//   });

//   it('should return the expected response for failure state', async () => {
//     get.mockRejectedValueOnce({ data: forYouFeedFailure });
//     try {
//       await srSendOtp();
//     } catch (e) {
//       expect(get).toBeCalledTimes(1);
//       expect(get).toBeCalledWith(apiPath);
//       expect(e).toMatchObject({
//         status: 'fail',
//         message: 'something went wrong',
//         meta: {},
//         data: {},
//         requestedWith: {},
//         'http-status': undefined
//       });
//     }
//   });
// });

it('is a dummy test', async () => {
  expect(1).toEqual(1);
});
