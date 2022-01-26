import { MINIMAL_API_PROMISE_RESOLVE_TIME } from 'variables';

// https://stackoverflow.com/questions/951021/what-is-the-javascript-version-of-sleep
const sleep = () => new Promise(resolve => setTimeout(resolve, MINIMAL_API_PROMISE_RESOLVE_TIME));

export const requestWrapper = async requestPromise => {
  const [response] = await Promise.all([requestPromise, sleep()]);
  return response;
};
