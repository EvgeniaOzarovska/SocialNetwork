import { BACKEND_BASE_URL } from 'variables';

export const remoteImageURL = imageName => {
  return `${BACKEND_BASE_URL}${imageName}`;
};
