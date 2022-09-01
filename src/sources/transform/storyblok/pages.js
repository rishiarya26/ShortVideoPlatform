import { transformModel, getMessage, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';
import { DEFAULT_ERROR_CODE } from '../../../constants';

function transformError(error = {}) {
  console.log("error",error)

  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = 'fail';
  payload.message = getMessage(error, {});
  payload['http-status'] = error['http-status'] || DEFAULT_ERROR_CODE;
  payload.errorCode = data.statusCode || error['http-status'] || DEFAULT_ERROR_CODE;
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  const paths = [];
  try {
    if(!Object.keys(data).includes("links")) {
        return transformError(data);
    }
    Object.keys(data.links).forEach((linkKey) => {
        if (data.links[linkKey].is_folder) {
            return;
          }
          const slug = data.links[linkKey].slug;
          if(slug.length < 1){
            return;
          }
          if(resp.blogType === "newsroom"){
            let [blogType, categoryType, slugType] = slug.split("/");
            if(blogType === resp.blogType && categoryType === resp.category){
                paths.push({ params: { id: slugType } });
            }
          } else {
            let [blogType, slugType] = slug.split("/");
            if(blogType === resp.blogType){
                paths.push({ params: { id: slugType } });
            }
          }
      });
    payload.status = 'success';
    payload.data = paths;
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
