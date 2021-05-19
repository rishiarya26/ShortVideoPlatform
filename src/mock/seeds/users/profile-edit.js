export const profileData = {
  success: true,
  status: 200,
  responseData: {
    userHandle: 'sourabhpisolkar',
    firstName: 'sourabh',
    lastName: 'pisolkar',
    dateOfBirth: '01/01/2001',
    bio: 'This is my bio',
    id: 'a486e461-86f0-45f4-9a7a-bd5c54d019a0',
    profileUpdated: false,
    email: 'sourabh.pisolkar@gmail.com'
  }
};

export const failedProfileData = {
  status: 400,
  success: false,
  error: 'Bad request.',
  message: 'Invalid JSON provided.'
};
