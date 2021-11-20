import * as actionTypes from '../constants'

const initState = {
  searchLat: '',
  searchLng: '',
  searchCity: '',
  searchDistrict: '',
  resultList: [],
  dataCount: 0,
  isLoading: false,
  fetchDataError: false,
  selectedBikeLane: {},
  stationList: [],
  stationListCount: 0,
  currentLat: '',
  currentLng: '',
}

function BikeReducers(state = initState, action) {
  switch (action.type) {
    case actionTypes.GET_BIKE_LANES: {
      const { lat, lng, city, district } = action.payload
      return {
        ...state,
        searchLat: lat,
        searchLng: lng,
        searchCity: city,
        searchDistrict: district,
        isLoading: true,
      }
    }

    case actionTypes.GET_BIKE_LANES_SUCCESS: {
      return {
        ...state,
        resultList: action.payload.results,
        dataCount: action.payload.dataCount,
        isLoading: false,
        fetchDataError: false,
      }
    }

    case actionTypes.GET_BIKE_LANES_ERROR: {
      return {
        ...state,
        isLoading: false,
        fetchDataError: true,
      }
    }

    case actionTypes.CLEAR_BIKE_LANES: {
      return {
        ...state,
        resultList: [],
        dataCount: 0,
      }
    }

    case actionTypes.UPDATE_SELECTED_DATA: {
      const { selectedBikeLane } = action.payload
      return {
        ...state,
        selectedBikeLane: selectedBikeLane,
      }
    }

    case actionTypes.GET_NEAR_BY_STATION: {
      const { lat, lng } = action.payload
      return {
        ...state,
        currentLat: lat,
        currentLng: lng,
      }
    }

    case actionTypes.GET_NEAR_BY_STATION_SUCCESS: {
      return {
        ...state,
        stationList: action.payload.results,
        stationListCount: action.payload.dataCount,
        isLoading: false,
        fetchDataError: false,
      }
    }

    case actionTypes.GET_NEAR_BY_STATION_ERROR: {
      return {
        ...state,
        isLoading: false,
        fetchDataError: true,
      }
    }

    default:
      return state
  }
}

export default BikeReducers
