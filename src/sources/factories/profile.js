/* eslint-disable max-len */
export const userProfile = {
  status: 200,
  success: true,
  responseData: {
    bio: '',
    dateOfBirth: '29/09/1990',
    firstName: 'krutarth',
    followRequest: false,
    followers: 0,
    following: 0,
    hipiStar: false,
    id: '6e4a4f22-7b1d-40c8-8e3f-702a7af437e4',
    isFollowing: false,
    lastName: 'shukla',
    likes: 0,
    pristine_image: 'hipi/assets/user/6e4a4f22-7b1d-40c8-8e3f-702a7af437e4/6e4a4f22-7b1d-40c8-8e3f-702a7af437e4',
    profilePic: 'https://akamaividz2.zee5.com/image/upload/v1596474598/hipi/assets/user/6e4a4f22-7b1d-40c8-8e3f-702a7af437e4/6e4a4f22-7b1d-40c8-8e3f-702a7af437e4.jpg',
    profileType: 'public',
    tag: 'Influencer',
    totalLikes: 0,
    totalViews: 0,
    userHandle: '@undefined'
  }
};

export const userProfileFail = {
  status: 400,
  success: false,
  message: 'Failed to fetch.',
  responseData: {}
};
