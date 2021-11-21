import * as actionTypes from '../constants'

export const getBikeLanes = query => {
  return {
    type: actionTypes.GET_BIKE_LANES,
    payload: {
      lat: query.lat || '',
      lng: query.lng || '',
      city: query.city || '',
      district: query.district || '',
    },
  }
}

export const getListSuccess = (results, dataCount) => ({
  type: actionTypes.GET_BIKE_LANES_SUCCESS,
  payload: {
    results,
    dataCount,
  },
})

export const getListError = results => ({
  type: actionTypes.GET_BIKE_LANES_ERROR,
  payload: {
    results,
  },
})

export const clearBikeLanes = () => ({
  type: actionTypes.CLEAR_BIKE_LANES,
})

export const updateSelectedData = selectedBikeLane => ({
  type: actionTypes.UPDATE_SELECTED_DATA,
  payload: {
    selectedBikeLane,
  },
})

export const getNearByStation = (lat, lng) => ({
  type: actionTypes.GET_NEAR_BY_STATION,
  payload: {
    lat,
    lng,
  },
})

export const getNearByStationSuccess = (results, dataCount) => ({
  type: actionTypes.GET_NEAR_BY_STATION_SUCCESS,
  payload: {
    results,
    dataCount,
  },
})

export const getNearByStationError = results => ({
  type: actionTypes.GET_NEAR_BY_STATION_ERROR,
  payload: {
    results,
  },
})

export const updateSelectedStation = selectedStation => ({
  type: actionTypes.UPDATE_SELECTED_STATION,
  payload: {
    selectedStation,
  },
})

export const clearPosition = () => ({
  type: actionTypes.CLEAR_POSITION,
})

export const clearStation = () => ({
  type: actionTypes.CLEAR_STATION,
})
