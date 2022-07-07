import { transformModel, isSuccess } from '../index';
import { getNewObjectCopy } from '../../../utils/app';

function transformError() {
  const { payload } = getNewObjectCopy(transformModel);
  payload.isShoppable = false;
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = resp;
  try {
    if (!isSuccess(resp)) {
      return transformError(data);
    }
    payload.isShoppable = false;
    if (
      data.data?.[0]?.topCharms?.length > 0
    ) {
      payload.data = data?.data[0]?.topCharms?.[0]?.contentImageUrlArray;
      payload.type = data?.data[0]?.topCharms?.[0]?.charm_type;
      payload.thumbnail = data?.data[0]?.topCharms?.[0]?.imageUrl;
      payload.smallThumbnails = data?.data[0]?.topCharms?.[0]?.content_image_url;
      payload.title = data?.data[0]?.topCharms?.[0]?.title;
      payload.subtitle = data?.data[0]?.topCharms?.[0]?.subtitle;
      payload.isShoppable = true;
      data?.data?.[0]?.topCharms.forEach((item,id)=>{id ===  0 ? item.expand = true : item.expand = false;})
      payload.charmData = data?.data?.[0]?.topCharms;
      payload.charmIds = data?.data?.[0]?.topCharms?.[0]
      payload.adData = {monitisation : data?.data?.[0]?.monitisation, monitisationCardArray:data?.data?.[0]?.monitisationCardArray}
    }

    console.log("can-shop",payload);
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
