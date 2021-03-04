import getConfig from 'next/config';
import { trimFirstChar } from './utils/string';

export const getBasePath = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { basePath = '' } = publicRuntimeConfig;
  return basePath ? `${basePath}` : '';
};

export const getLanguage = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { basePath = '' } = publicRuntimeConfig;
  return trimFirstChar(basePath || '/en');
};

export const getLocale = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { locale = '' } = publicRuntimeConfig;
  return locale;
};

export const withBasePath = path => (`${getBasePath() || '/'}${path}`);
