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
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    const { recommendations = []} = data;
    const { responseData = []} = data;
    

    let updateData = recommendations?.concat(responseData);
    // const {additionalBanner = {}} = data;
    // additionalBanner && updateData?.forEach((data)=>{
    //   if(data?.widgetContentType === 'banner')
    //   { if(Object.keys(additionalBanner?.data).length !== 0){
    //     data?.widgetList?.unshift(additionalBanner?.data)
    //   }
    //   }
    // })
    updateData = updateData?.filter((data)=>(data.widgetList =  data?.widgetContentType === 'Video' && data?.widgetList?.length >=8 ? data?.widgetList?.splice(0,8) : data?.widgetList ))
    console.log('u***',updateData);
    payload.data = updateData;
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    payload.requestedWith = data?.requestedWith;
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
