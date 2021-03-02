describe('config', () => {
  beforeEach(() => jest.resetModules());
  describe('when the config is set', () => {
    it('returns values', () => {
      jest.mock('next/config', () => () => ({ publicRuntimeConfig: { basePath: 'https://hipi.com' } }));
      // eslint-disable-next-line global-require
      const { getBasePath, getLanguage, withBasePath } = require('./config');
      expect(getBasePath()).toBe('https://hipi.com/');
      expect(withBasePath('feed')).toBe('https://hipi.com/feed');
      expect(getLanguage()).toBe('https://hipi.com');
    });
  });
  describe('when the config is not set', () => {
    it('returns hi', () => {
      jest.mock('next/config', () => () => ({ publicRuntimeConfig: {} }));
      // eslint-disable-next-line global-require
      const { getBasePath, getLanguage, withBasePath } = require('./config');
      expect(getBasePath()).toBe('');
      expect(withBasePath('feed')).toBe('/feed');
      expect(getLanguage()).toBe('en');
    });
  });
});
