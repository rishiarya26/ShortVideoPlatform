import { apiMiddleWare } from "../../network/utils";
import { transformSuccess, transformError } from "../transform/storyblok";
import {
  transformError as transformErrorPage,
  transformSuccess as transformSuccessPage,
} from "../transform/storyblok/pages";
import { getStoryblokApi } from "@storyblok/react";

async function storyblokData({ params, parentSlug, slug }) {
  const storyblokApi = getStoryblokApi();
  let response = {};
  try {
    response = await storyblokApi.get(
      `cdn/stories/${parentSlug && slug ? `${parentSlug}/${slug}` : ""}`,
      params
    );
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

async function storyblokPage({ params, category = "", blogType = "" }) {
  const storyblokApi = getStoryblokApi();
  let response = {};
  try {
    response = await storyblokApi.get(`cdn/links/`, params);
    response.category = category;
    response.blogType = blogType;
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
}

const [getStoryblokData] = apiMiddleWare(
  storyblokData,
  transformSuccess,
  transformError,
  { shouldCache: false }
);
const [getStoryblokPage] = apiMiddleWare(
  storyblokPage,
  transformSuccessPage,
  transformErrorPage,
  { shouldCache: false }
);

export { getStoryblokData, getStoryblokPage };
