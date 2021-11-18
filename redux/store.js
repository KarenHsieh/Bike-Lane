import { createStore, applyMiddleware } from 'redux'
import { createWrapper } from 'next-redux-wrapper'
import createSagaMiddleware from 'redux-saga'

import rootReducer from './reducers'
import rootSaga from './sagas'

const bindMiddleware = middleware => {
  if (process.env.NODE_ENV !== 'production') {
    const { composeWithDevTools } = require('redux-devtools-extension')
    return composeWithDevTools(applyMiddleware(...middleware))
  }
  return applyMiddleware(...middleware)
}

export const makeStore = context => {
  // 1: Create the middleware
  const sagaMiddleware = createSagaMiddleware()

  // 2: Add an extra parameter for applying middleware:
  const store = createStore(rootReducer, bindMiddleware([sagaMiddleware]))

  // 3: Run your sagas on server
  // (store as SagaStore).sagaTask = sagaMiddleware.run(rootSaga);
  store.sagaTask = sagaMiddleware.run(rootSaga)

  // 4: now return the store:
  return store
}

export const wrapper = createWrapper(makeStore, { debug: false })
