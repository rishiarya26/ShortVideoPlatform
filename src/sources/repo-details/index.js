
import { get } from 'network';
import { core } from '../../api-base';
import { apiMiddleWare } from '../../utils/app';

function transformSuccess(data) {
  return data;
}

function transformError(data) {
  return data;
}

async function getRepoDetails({ publisher, project }) {
  let response = {};
  try {
    const apiPath = `${core}/repos/${publisher}/${project}`;
    response = await get(apiPath);
    response.data.requestedWith = { publisher, project };
    return Promise.resolve(response.data);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [srGetRepoDetails, clearGetRepoDetails] = apiMiddleWare(getRepoDetails, transformSuccess, transformError);

export { srGetRepoDetails, clearGetRepoDetails };
