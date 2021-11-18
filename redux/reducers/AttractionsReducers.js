import * as actionTypes from '../constants'

const initState = {
  resultList: [],
  dataCount: 0,
  isLoading: false,
  fetchDataError: false,
}

function AttractionsReducers(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_LIST: {
      return {
        ...state,
        ...action.payload,
        isLoading: true,
      }
    }

    case actionTypes.GET_LIST_SUCCESS: {
      return {
        ...state,
        resultList: action.payload.results,
        dataCount: action.payload.dataCount,
        isLoading: false,
        fetchDataError: false,
      }
    }

    case actionTypes.GET_LIST_ERROR: {
      return {
        ...state,
        isLoading: false,
        fetchDataError: true,
      }
    }

    case actionTypes.CLEAR_LIST: {
      return {
        ...state,
        resultList: [],
        dataCount: 0,
      }
    }

    default:
      return state
  }
}

export default AttractionsReducers
