import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form, Spinner } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

import { getCityInputList, getCityCode } from '../../utils/cityCode'

import * as BikeActions from '../../redux/actions/BikeActions'

// Styles And Icons
import styles from './index.module.scss'

const SearchBar = ({ mapType }) => {
  const dispatch = useDispatch()
  const { resultList, dataCount, isLoading, fetchDataError } = useSelector(state => state.BikeReducers)

  const [singleSelections, setSingleSelections] = useState([])

  const nearBySearch = () => {
    var options = {
      enableHighAccuracy: false, // 是否要取得高度精確的位置資訊
      timeout: 30000,
      maximumAge: 0, // 保存上一次的經緯度資訊
    }

    function success(pos) {
      var crd = pos.coords
      const { latitude, longitude } = crd

      console.log('目前座標位置為:')
      console.log('Latitude 緯度 : ' + latitude)
      console.log('Longitude 經度 : ' + longitude)
      console.log('位置誤差約 ' + crd.accuracy + ' 公尺')

      // 暫時寫死台北車站週遭的位置，不然沒東西測試
      // 25.0409256,121.5093713

      if (mapType === 'bike') {
        // dispatch(BikeActions.getBikeLanes({ lat: 25.0409256, lng: 121.5093713 }))
        dispatch(BikeActions.getBikeLanes({ lat: latitude, lng: longitude }))
      } else {
        // dispatch(BikeActions.getNearByStation(25.0409256, 121.5093713))
        dispatch(BikeActions.getNearByStation(latitude, longitude))
      }
    }

    function error(err) {
      console.warn('ERROR(' + err.code + '): ' + err.message)
    }

    navigator.geolocation.getCurrentPosition(success, error, options)
  }

  const searchCity = () => {
    const { cityCode } = singleSelections[0]

    console.log(cityCode)
    dispatch(BikeActions.getBikeLanes({ city: cityCode }))
  }

  return (
    <div className={styles.container}>
      <div>
        <Typeahead
          id="basic-typeahead-single"
          labelKey="cityName"
          onChange={setSingleSelections}
          options={getCityInputList()}
          placeholder={`${mapType === 'bike' ? '請輸入城市名' : '鄉鎮市區、縣市、郵遞區號'}`}
          selected={singleSelections}
          style={{ zIndex: 1001 }}
        />
        {mapType === 'station' && <div>要取得行政區定位需串接其他政府開放資料api，暫不處理</div>}
      </div>
      <div>
        {isLoading ? (
          <button
            type="button"
            className={`${styles.searchButton} ${styles.isLoading}`}
            onClick={searchCity}
            disabled={isLoading}
          >
            <Spinner animation="border" variant="light" size="md" role="status" aria-hidden="true" />
          </button>
        ) : (
          <button type="button" className={styles.searchButton} onClick={searchCity}></button>
        )}
      </div>
      <div>
        <button type="button" className={styles.nearbySearchButton} onClick={nearBySearch} disabled={isLoading}>
          <i></i>
          {mapType === 'bike' ? '我附近的自行車道' : '我附近的租借站'}
        </button>
        {mapType === 'bike' && <div>自行車道路圖資api未提供經緯度搜尋功能，暫不處理</div>}
      </div>
    </div>
  )
}

export default SearchBar
