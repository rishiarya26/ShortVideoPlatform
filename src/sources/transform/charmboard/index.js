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
    const details = {
      outfit : [],
      accessories : [],
      beauty : [],
      hair : [],
      recipe : [],
      devices: []
    }
    data?.cards.forEach((item, id)=>{
        item?.category === 'outfit' && details.outfit.push(item);
        item?.category === 'accessories' && details.accessories.push(item);
        item?.category === 'beauty' && details.beauty.push(item);
        item?.category === 'hair' && details.hair.push(item);
        item?.category === 'recipe' && details.recipe.push(item);
        item?.category === 'devices' && details.devices.push(item);
    })
    payload.data = details;
    payload.campaignId = data?.cardCampMap?.[0]?.ad_campaign_id || "";

    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
