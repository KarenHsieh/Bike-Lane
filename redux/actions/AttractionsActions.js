import * as actionTypes from '../constants'

export const getList = query => {
  return {
    type: actionTypes.GET_LIST,
    payload: {
      type: query.type || '',
      city: query.city || '',
      keyword: query.keyword || '',
      category: query.class,
    },
  }
}

export const getListSuccess = (results, dataCount) => ({
  type: actionTypes.GET_LIST_SUCCESS,
  payload: {
    results,
    dataCount,
  },
})

export const getListError = results => ({
  type: actionTypes.GET_LIST_ERROR,
  payload: {
    results,
  },
})

export const clearList = () => ({
  type: actionTypes.CLEAR_LIST,
})
