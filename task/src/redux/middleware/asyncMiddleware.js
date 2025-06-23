
const asyncMiddleware = (store) => (next) => (action) => {

  console.log('Action:', action.type, action.payload);
  

  if (typeof action === 'function') {
    return action(store.dispatch, store.getState);
  }
  

  return next(action);
};

export default asyncMiddleware; 