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
  const { data = {} } = resp?.data;
  
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.status = 'success';
    payload.message = getMessage(data, {});
    payload['http-status'] = data.status;
    console.log('week1',data?.week1)
    if (data?.week3?.length > 0) {  
      data.week3.forEach((item)=>{
        item.profilepic = item?.profilepic?.replaceAll('upload','upload/w_90') || '';
      })
    }
    if (data?.week1?.length > 0) {  
      data.week1.forEach((item)=>{
        item.profilepic = item?.profilepic?.replaceAll('upload','upload/w_90') || '';
      })
    }

    if (data?.week2?.all?.length > 0) {  
      data.week2.all.forEach((item, key)=>{
        // if(key < 7){
          item.profilepic = item?.profilepic?.replaceAll('upload','upload/w_90') || '';
        // }else{
        //   data.week2.all.splice(key)
        // }
      })
    }
    if (data?.week2?.judges?.length > 0) {  
      data.week2.judges.forEach((item, key)=>{
        // if(key < 3){
        item.profilepic = item?.profilepic?.replaceAll('upload','upload/w_90') || '';
        // }else{
        //   data.week2.judges.splice(key)
        // }
      })
    }
      // resp.data.data = data;
    // console.log("data22",data, data[0].profilepic)
      payload.data = resp?.data;

    payload.requestedWith = { ...data.requestedWith };
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
