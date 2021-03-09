/* eslint-disable no-console */

function transformError(data) {
  let message = {};
  if (data.code === 2) {
    message = {
      status: 404,
      message: data.message
    };
  }
  return message;
}

function transformSuccess(data) {
  let message = {};
  try {
    if (data.code === 0) {
      message = {
        status: 200,
        message: data.message || 'default',
        meta: {
          total: data.totalPages,
          page: data.currentPage,
          page_size: data.pageSize
        },
        data: {
          id: data.musicId,
          music_icon: data.musicIcon,
          music_url: data.musicUrl,
          download_url: data.musicDownloadUrl,
          title: data.musicTitle,
          artist_name: data.musicArtistName,
          pristine_image: data.pristine_image,
          music_length: data.musicLength,
          dialouges: data.dialouges

        }
      };
    }
    return message;
  } catch (err) {
    transformError(data);
    return message;
  }
}

export default transformSuccess;
