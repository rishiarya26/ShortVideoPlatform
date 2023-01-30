// this file can be generated basis the env at runtime

const newAuth = {
  preprod: "https://uapi-preprod.zee5.com",
  auth: "https://auth-dev.zee5.com",
  user: "https://user-dev.zee5.com"
};

export const apiBaseEndPoints = {
  local: {
    test: 'https://api.github.com',
    hipi: 'http://3.7.148.209:7000/api',
    hipi_stage:"http://3.7.148.209:7000/api",
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
    staggingHipi: 'http://3.7.148.209:7000/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  },
  development: {
    test: 'https://api.github.com',
    hipi:"http://3.7.148.209:7000",
    hipi_stage:"http://3.7.148.209:7000/api",
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
    staggingHipi: 'http://3.7.148.209:7000/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  },
  staging: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    hipi_stage:"http://3.7.148.209:7000/api",
    app: 'https://preprod.hipi.co.in/',
    'get-social': 'https://api.getsocial.im/v1',
    charmboard:
    'https://mapi.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user',
    whapi: 'https://whapi-prod-node.zee5.com',
    otp: 'https://b2bapi.zee5.com',
    userApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    staggingHipi: 'http://3.7.148.209:7000/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  },
  production: {
    test: 'https://api.github.com',
    hipi: 'http://3.7.148.209:7000/api',
    hipi_stage:"http://3.7.148.209:7000/api",
    app: 'https://www.hipi.co.in',
    'get-social': 'https://api.getsocial.im/v1',
    charmboard:
    'https://mapi.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user',
    whapi: 'https://whapi-prod-node.zee5.com',
    otp: 'https://b2bapi.zee5.com',
    userApi: 'https://userapi.zee5.com',
    viewCount: 'https://kw7bwwzx3d.execute-api.ap-south-1.amazonaws.com',
    staggingHipi: 'http://3.7.148.209:7000/api',
    leaderboard: 'https://leaderboard.charmd.me',
    staggingLeaderboard: 'http://35.154.183.190:3000',
    playlist:"https://hipigwapis2.zee5.com/api/v1",
    preprodAuth: newAuth.auth,
    preprodUser: newAuth.user,
  }
};

export const defaultApiBasePath = 'https://zee5.com';
