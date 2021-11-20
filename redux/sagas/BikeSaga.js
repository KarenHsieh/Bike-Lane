import { call, put } from 'redux-saga/effects'

import * as BikeActions from '../actions/BikeActions'

// import axios from 'axios'

import { axiosCall, formatDate } from '../../server/tools'

const apiBaseUri = 'https://ptx.transportdata.tw/MOTC/v2/'
const uri = {
  scenicSpot: `${apiBaseUri}Tourism/ScenicSpot`,
  restaurant: `${apiBaseUri}Tourism/Restaurant`,
  hotel: `${apiBaseUri}Tourism/Hotel`,
  activity: `${apiBaseUri}Tourism/Activity`,
  bikeLane: `${apiBaseUri}Cycling/Shape`,
  stationNearBy: `${apiBaseUri}Bike/Station/NearBy`,
  availabilityNearBy: `${apiBaseUri}Bike/Availability/NearBy`,
  getDistrictData: (lat, lng) => `https://api.nlsc.gov.tw/other/TownVillagePointQuery/${lng}/${lat}/4326`,
}

export function* getBikeLanes({ payload }) {
  const { lat = '', lng = '', city, district } = payload

  // 使用經緯度取得行政區目前還要再多打一次額外的 api 要資料
  // 才能再去用 city 資訊搜尋自行車道
  // 所以先暫不處理
  // https://api.nlsc.gov.tw/other/TownVillagePointQuery/121.5823872/25.0413056/4326
  // https://data.gov.tw/dataset/25489
  if (lat && lng) {
    const tempUrl = uri.getDistrictData(lat, lng)

    const xmlResponse = yield call(async () => {
      return await axiosCall({
        method: 'GET',
        url: tempUrl,
      })
    })
  }

  let options = {}
  if (city) {
    options = {
      method: 'GET',
      url: `${uri.bikeLane}${city ? `/${city}/` : ''}?$format=JSON`,
    }
  }

  try {
    const response = yield call(async () => {
      console.log('======= [debug] options.url ========')
      console.log(options.url)
      return await axiosCall(options)
    })

    options = {}
    console.log('========== [debug] response ==========')
    console.log(response)
    const { status, data = [] } = response

    if (status === 200 && data && data.length) {
      yield put(BikeActions.getListSuccess(data, data.length))
    } else {
      yield put(BikeActions.getListError())
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}

export function* getNearByStation({ payload }) {
  console.log(payload)
  const { lat = '', lng = '' } = payload

  let options = {}
  if (lat && lng) {
    options = {
      method: 'GET',
      // url: `${uri.stationNearBy}?$spatialFilter=nearby(${lat},${lng}, 200)&$format=JSON`,
      url: `${uri.stationNearBy}?$spatialFilter=nearby(25.0409256,121.5093713, 200)&$format=JSON`,
    }
  }

  try {
    const response = yield call(async () => {
      console.log('======= [debug] options.url ========')
      console.log(options.url)
      return await axiosCall(options)
    })

    options = {}
    console.log('========== [debug] response ==========')
    console.log(response)
    const { status, data = [] } = response

    if (status === 200 && data && data.length) {
      yield put(BikeActions.getListSuccess(data, data.length))
    } else {
      yield put(BikeActions.getListError())
    }
  } catch (error) {
    console.error(`network fetch error - ${options.url} - ${error.message}`)
  }
}
