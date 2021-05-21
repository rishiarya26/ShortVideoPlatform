// this file can be generated basis the env at runtime

export const apiBaseEndPoints = {
  local: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    translations: 'http://localhost:3000',
    'get-social': 'https://api.getsocial.im/v1',
    login: 'https://whapi.zee5.com/v1/user'
  },
  development: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    translations: 'https://mock.hipi.co.in',
    stagingMobile:
    'https://stagingmobile.charmboard.com',
    'get-social': 'https://api.getsocial.im/v1',
    login: 'https://whapi.zee5.com/v1/user'
  },
  staging: {
    test: 'https://api.github.com',
    hipi: 'http://3.6.36.112:7000/api',
    translations: 'https://preprod.hipi.co.in',
    'get-social': 'https://api.getsocial.im/v1',
    stagingMobile:
      'https://stagingmobile.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user'
  },
  production: {
    test: 'https://api.github.com',
    hipi: 'https://hipigwapi.zee5.com/api',
    translations: 'https://www.hipi.co.in',
    'get-social': 'https://api.getsocial.im/v1',
    stagingMobile:
    'https://stagingmobile.charmboard.com',
    login: 'https://whapi.zee5.com/v1/user'
  }
};

export const defaultApiBasePath = 'https://zee5.com';
