// Load the required clients and packages
import { CognitoIdentityClient } from "@aws-sdk/client-cognito-identity";
import { fromCognitoIdentityPool } from "@aws-sdk/credential-provider-cognito-identity";
import { S3Client } from "@aws-sdk/client-s3";
import { Upload } from "@aws-sdk/lib-storage";
import {
  S3_BUCKET_STAGE,
  S3_BUCKET_PROD,
  S3_POOL_ID,
  S3_REGION,
} from "../../constants";
import { localStorage } from "../../utils/storage";

const BucketName =
  process.env.NODE_ENV === "production" || process.env.APP_ENV === "production"
    ? S3_BUCKET_PROD
    : S3_BUCKET_STAGE; //BUCKET_NAME need to be change to prod

export const uploadImage2 = async (
  albumName = "src",
  file,
  fileName,
  cbProgressBar
) => {
  localStorage.set("UPLOAD_API_TIMESTAMP_START", new Date()?.getTime() / 1000);
  const albumPhotosKey = `${encodeURIComponent(albumName)}`;
  const photoKey = `${albumPhotosKey}/${fileName}`;
  const contentType = file.type;
  const target = {
    Bucket: BucketName,
    Key: photoKey,
    Body: file,
    ContentType: contentType,
  };
  try {
    const parallelUploads3 = new Upload({
      client: new S3Client({
        region: S3_REGION,
        credentials: fromCognitoIdentityPool({
          client: new CognitoIdentityClient({ region: S3_REGION }),
          identityPoolId: S3_POOL_ID, // IDENTITY_POOL_ID
        }),
      }),
      queueSize: 4, // optional concurrency configuration
      leavePartsOnError: false, // optional manually handle dropped parts
      params: target,
    });
    parallelUploads3.on("httpUploadProgress", (progress) => {
      cbProgressBar(
        Math.floor((progress.loaded / progress.total) * 100),
        file,
        fileName
      );
    });

    await parallelUploads3.done();

    return {
      message: "file added successfully",
      status: "success",
    };
  } catch (e) {
    return {
      message: e.message,
      status: "failure",
    };
  }
};

/** old implementation */

// let s3ClientObj;

// // Initialize the Amazon Cognito credentials provider

// export const initS3Client = () => {
//   try {
//     s3ClientObj = new S3Client({
//       region: S3_REGION,
//       credentials: fromCognitoIdentityPool({
//         client: new CognitoIdentityClient({ region: S3_REGION }),
//         identityPoolId: S3_POOL_ID, // IDENTITY_POOL_ID
//         requestHandler: myHttpHandler,
//       }),
//     });
//   } catch (e) {
//     console.error(e);
//   }
// };

// export const uploadImage = async (albumName = "src", file, fileName, cb) => {
//   try {
//     const albumPhotosKey = `${encodeURIComponent(albumName)}`;
//     const photoKey = `${albumPhotosKey}/${fileName}`;
//     const contentType = file.type;
//     const uploadParams = {
//       Bucket: BucketName,
//       Key: photoKey,
//       Body: file,
//       ContentType: contentType,
//     };
//     try {
//       const data = await s3ClientObj.send(new PutObjectCommand(uploadParams));
//       cb();
//     } catch (err) {
//       return alert("There was an error uploading your video: ", err);
//     }
//   } catch (err) {
//     if (!files.length) {
//       return alert("Choose a file to upload first.");
//     }
//   }
// };

// ? to the status of uploaded video on s3 bucket
/* 
const getRes = async(BucketName, photoKey, fileType) => {
  try{
    const uploadParams = {
      Bucket: BucketName,
      Key: photoKey,
      ContentType: fileType
    };
    const data = await s3ClientObj.send(new GetObjectCommand(uploadParams));
    console.log(data)
  }catch(e){
    console.log(e)
  }
}
*/
