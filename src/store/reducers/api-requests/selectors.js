export const selectRequestStatus = (state, actionType) => {
  return state.apiRequests.inProgress[actionType.START.split(':')[0]] || false;
};

export const selectRequestError = (state, actionType) => {
  return state.apiRequests.errors[actionType.FAIL.split(':')[0]] || null;
};
