import { Axios } from 'helpers';

export const uploadImage = image => {
  const multipartFormData = new FormData();
  multipartFormData.append('photo', image);

  return Axios.post('/upload', multipartFormData, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const uploadImages = images => {
  const promises = [];
  images.forEach(image => {
    promises.push(uploadImage(image));
  });

  return Promise.all(promises);
};
