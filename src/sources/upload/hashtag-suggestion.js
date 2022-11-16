/* eslint-disable max-len */
import { get } from "network";
import { getApiBasePath } from "../../config";
import { apiMiddleWare } from "../../network/utils";
import {
  transformSuccess,
  transformError,
} from "../transform/explore/hashtag-suggestion";

async function fetchSearchResult(keyword) {
  let response = {};
  try {
    const apiPath = `${getApiBasePath(
      "hipi"
    )}/v2/shorts/hashtags/suggestion?keyword=${keyword}`;

    response = await get(apiPath);
    response.data.requestedWith = { keyword };
    return Promise.resolve(response);
    ``;
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getSuggestions, clearSuggestions] = apiMiddleWare(
  fetchSearchResult,
  transformSuccess,
  transformError
);

export { getSuggestions, clearSuggestions };
