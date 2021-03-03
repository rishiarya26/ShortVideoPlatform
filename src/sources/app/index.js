import { get } from 'network';
import { getLocale } from '../../config';

async function getLocaleData() {
  let response = {};
  try {
    response = await get(`https://anky2k.github.io/${getLocale()}.json`);
    return response.data;
  } catch (err) {
    return Promise.reject(err);
  }
}

export { getLocaleData };
