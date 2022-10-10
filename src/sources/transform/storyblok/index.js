import { transformModel, getMessage, isSuccess } from "../index";
import { getNewObjectCopy } from "../../../utils/app";
import { DEFAULT_ERROR_CODE } from "../../../constants";

function sort(stories){
  let sortedData = stories.sort((a, b) => {
    const aDate = new Date(a?.sort_by_date);
    const bDate = new Date(b?.sort_by_date);
    if(aDate > bDate){
      return -1;
    } else {
      return 1;
    }
  })
  return sortedData;
}

function transformError(error = {}) {
  console.log("error", error);

  const { payload } = getNewObjectCopy(transformModel);
  const { data = {} } = error;
  payload.status = "fail";
  payload.message = getMessage(error, {});
  payload["http-status"] = error["http-status"] || DEFAULT_ERROR_CODE;
  payload.errorCode =
    data.statusCode || error["http-status"] || DEFAULT_ERROR_CODE;
  return payload;
}

function transformSuccess(resp) {
  const { payload } = getNewObjectCopy(transformModel);
  const { data = {}, headers = {} } = resp;

  try {
    if (
      !Object.keys(data).includes("stories") &&
      !Object.keys(data).includes("story")
    ) {
      return transformError(data);
    }
    payload.status = "success";
    payload["http-status"] = 200;
    payload.data = data?.stories ? sort(data.stories) : data?.story;
    payload.total = headers?.total || 0;
    return payload;
  } catch (err) {
    data.appError = err.message;
    return transformError(data);
  }
}

export { transformSuccess, transformError };
