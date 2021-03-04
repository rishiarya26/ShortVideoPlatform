import getConfig from 'next/config';
import { trimFirstChar } from './utils/string';
import { apiBaseEndPoints, defaultApiBasePath} from './api-base';

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

export const getApiBasePath = serviceType => {
  const { publicRuntimeConfig = {} } = getConfig() || {};
  const { appEnv = '' } = publicRuntimeConfig;
  return (apiBaseEndPoints[appEnv][serviceType] || defaultApiBasePath);
};

export const withBasePath = path => (`${getBasePath() || '/'}${path}`);
