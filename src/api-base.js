// this file can be generated basis the env at runtime

const newAuth = {
  preprod: "https://uapi-preprod.zee5.com",
  auth: "https://auth-preprod.zee5.com",
  user: "https://user-preprod.zee5.com"
};

export const apiBaseEndPoints = {
  local: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    hipi_stage:"https://hipigwapi.zee5.com/api",
    app: 'https://preprod.hipi.co.in/',
    stagingMobile: 'https://mapi.charmboard.com',
    'get-social': 'https://api.getsocial.im/v1',
    login: 'https://whapi.zee5.com/v1/user',
    whapi: 'https://whapi-prod-node.zee5.com',
    charmboard:
    'https://mapi.charmboard.com',
    otp: 'https://b2bapi.zee5.com',
    userApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    staggingHipi: 'https://hipigwapi.zee5.com/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  },
  development: {
    test: 'https://api.github.com',
    hipi:"https://hipigwapi.zee5.com/api",
    hipi_stage:"https://hipitest.charmd.me/api",
    translations: 'https://mock.hipi.co.in',
    app: 'https://mock.hipi.co.in/',
    charmboard:
    'https://mapi.charmboard.com',
    'get-social': 'https://api.getsocial.im/v1',
    login: 'https://whapi.zee5.com/v1/user',
    whapi: 'https://whapi-prod-node.zee5.com',
    otp: 'https://b2bapi.zee5.com',
    userApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    staggingHipi: 'https://hipitest.charmd.me/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  },
  staging: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    hipi_stage:"https://hipitest.charmd.me/api",
    app: 'https://preprod.hipi.co.in/',
    'get-social': 'https://api.getsocial.im/v1',
    charmboard:
    'https://mapi.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user',
    whapi: 'https://whapi-prod-node.zee5.com',
    otp: 'https://b2bapi.zee5.com',
    userApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    staggingHipi: 'https://hipitest.charmd.me/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  },
  production: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    hipi_stage:"https://hipitest.charmd.me/api",
    app: 'https://www.hipi.co.in',
    'get-social': 'https://api.getsocial.im/v1',
    charmboard:
    'https://mapi.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user',
    whapi: 'https://whapi-prod-node.zee5.com',
    otp: 'https://b2bapi.zee5.com',
    userApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    staggingHipi: 'https://hipitest.charmd.me/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  }
};

export const defaultApiBasePath = 'https://zee5.com';
