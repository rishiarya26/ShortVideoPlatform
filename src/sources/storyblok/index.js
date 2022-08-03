import { apiMiddleWare } from '../../network/utils';
import { transformSuccess, transformError } from '../transform/storyblok';
import { getStoryblokApi } from '@storyblok/react';

async function storyblokData() {
    const storyblokApi = getStoryblokApi();
    let response = {};
    try {
        response = await storyblokApi.get(`cdn/stories/`,{
            version: "draft", // or 'published'
        });
        return Promise.resolve(response);
    } catch (err) {
        return Promise.reject(err);
    }
}

const [getStoryblokData] = apiMiddleWare(storyblokData, transformSuccess, transformError, {shouldCache : false});

export { getStoryblokData };