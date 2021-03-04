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

export const isMockMode = () => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { mockMode = '' } = publicRuntimeConfig;
  return (mockMode === 'y');
};

export const withBasePath = path => (`${getBasePath() || '/'}${path}`);
