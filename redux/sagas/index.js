import * as actionTypes from '../constants'

import { all, takeEvery, takeLatest } from 'redux-saga/effects'

import * as AttractionsSaga from './AttractionsSaga'

function* rootSaga() {
  yield all([takeLatest(actionTypes.GET_LIST, AttractionsSaga.getList)])
}

export default rootSaga
