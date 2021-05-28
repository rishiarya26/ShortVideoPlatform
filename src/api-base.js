// this file can be generated basis the env at runtime

export const apiBaseEndPoints = {
  local: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    app: 'http://localhost:3000',
    stagingMobile: 'https://stagingmobile.charmboard.com',
    'get-social': 'https://api.getsocial.im/v1',
    login: 'https://whapi.zee5.com/v1/user',
    charmboard:
    'https://stagingmobile.charmboard.com',
    otp: 'https://b2bapi.zee5.com'
  },
  development: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    translations: 'https://mock.hipi.co.in',
    app: 'http://localhost:3000',
    charmboard:
    'https://stagingmobile.charmboard.com',
    'get-social': 'https://api.getsocial.im/v1',
    login: 'https://whapi.zee5.com/v1/user',
    otp: 'https://b2bapi.zee5.com'
  },
  staging: {
    test: 'https://api.github.com',
    hipi: 'http://3.6.36.112:7000/api',
    app: 'https://preprod.hipi.co.in',
    'get-social': 'https://api.getsocial.im/v1',
    charmboard:
      'https://stagingmobile.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user',
    otp: 'https://b2bapi.zee5.com'
  },
  production: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    app: 'https://www.hipi.co.in',
    'get-social': 'https://api.getsocial.im/v1',
    charmboard:
    'https://stagingmobile.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user',
    otp: 'https://b2bapi.zee5.com'
  }
};

export const defaultApiBasePath = 'https://zee5.com';
