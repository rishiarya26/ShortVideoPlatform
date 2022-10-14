import { post } from "network";
import { getApiBasePath } from "../../config";
import { apiMiddleWare } from "../../network/utils";
import { localStorage } from "../../utils/storage";
import { transformError, transformSuccess } from "../transform/desk-upload";

const uploadVideo = async ({ postData }) => {
  const payload = {
    ...postData,
  };

  let shortsAuthTokenn = "";

  if (typeof window !== undefined) {
    let tokens = localStorage.get("tokens");
    const { shortsAuthToken = "" } = tokens;
    shortsAuthTokenn = shortsAuthToken;
  }

  let response = {};
  try {
    const apiPath = `${getApiBasePath("hipi")}/v1/shorts/video`;
    response = await post(apiPath, payload, {
      Authorization: `Bearer ${shortsAuthTokenn}`,
      "content-type": "application/json",
    });
    console.log("api finished", response);
    response.data.status = 200;
    response.data.message = "success";
    return Promise.resolve(response);
  } catch (err) {
    return Promise.reject(err);
  }
};

const [uploadDeskVideo] = apiMiddleWare(
  uploadVideo,
  transformSuccess,
  transformError
);

export { uploadDeskVideo };
