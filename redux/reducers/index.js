import { HYDRATE } from 'next-redux-wrapper'
import { combineReducers } from 'redux'

import AttractionsReducers from './AttractionsReducers'

const combinedReducer = combineReducers({
  AttractionsReducers,
})

const rootReducer = (state, action) => {
  if (action.type === HYDRATE) {
    // server side rendered from ezApp.getInitialProps
    // everything else should come from client side state and should not be overwritten here by subsequent server
    return {
      ...state, // use previous state
      ...action.payload, // apply delta from hydration
    }
  }
  return combinedReducer(state, action)
}

export default rootReducer
