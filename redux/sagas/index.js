import * as actionTypes from '../constants'

import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import * as BikeSaga from './BikeSaga'

function* rootSaga() {
  yield all([takeLatest(actionTypes.GET_BIKE_LANES, BikeSaga.getBikeLanes)])
  yield all([takeLatest(actionTypes.GET_NEAR_BY_STATION, BikeSaga.getNearByStation)])
}

export default rootSaga
