// this file can be generated basis the env at runtime

const newAuth = {
  preprod: "https://uapi-preprod.zee5.com",
  auth: "https://auth-preprod.zee5.com",
  user: "https://user-preprod.zee5.com",
  prodAuth: "https://auth.zee5.com",
  prodUser: "https://uapi.zee5.com"
};

export const apiBaseEndPoints = {
  local: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    hipi_stage:"https://hipigwapi.zee5.com/api",
    app: 'https://preprod.hipi.co.in/',
    'get-social': 'https://api.getsocial.im/v1',
    login: 'https://whapi.zee5.com/v1/user',
    whapi: 'https://whapi-prod-node.zee5.com',
    charmboard:
    'https://mapi.charmboard.com',
    otp: 'https://b2bapi.zee5.com',
    oldUserApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    authApi: newAuth.prodAuth,
    userApi: newAuth.prodUser,
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
    oldUserApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    authApi: newAuth.prodAuth,
    userApi: newAuth.prodUser,
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
    oldUserApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    authApi: newAuth.prodAuth,
    userApi: newAuth.prodUser,
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
    oldUserApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    authApi: newAuth.prodAuth,
    userApi: newAuth.prodUser,
  }
};

export const defaultApiBasePath = 'https://zee5.com';
