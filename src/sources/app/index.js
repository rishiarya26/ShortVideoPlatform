import { get } from 'network';
import { getLocale, getApiBasePath } from '../../config';

async function getLocaleData() {
  let response = {};
  try {
    response = await get(`${getApiBasePath('translations')}/${getLocale()}.json`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getLocaleData };
