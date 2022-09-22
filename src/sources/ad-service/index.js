import { get } from 'network';
import { apiMiddleWare } from '../../network/utils';
import { localStorage } from '../../utils/storage';


async function adService({url, value}) {
  let adArr = localStorage.get('adArr');
  let response = {};
  if(!adArr?.includes(value)){
    let arr = localStorage?.get("adArr");
    arr.push(value);
    localStorage.set("adArr",arr);
    try {
      const apiPath = `${url}&vast_event=${value}`;
      response = await get(apiPath,null,{'content-type':'noHeaders'});
      return Promise.resolve(response);
    } catch (err) {
      return Promise.resolve({ data: '' });
    }
  }
  
}
const [pushAdService] = apiMiddleWare(adService);

export { pushAdService };