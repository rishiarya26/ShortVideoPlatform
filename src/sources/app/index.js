import { get } from 'network';
import { getApiBasePath } from '../../config';

async function getLocaleData(locale = 'en-in') {
  let response = {};
  try {
    response = await get(`${getApiBasePath('translations')}/i10n/${locale}.json`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getLocaleData };
