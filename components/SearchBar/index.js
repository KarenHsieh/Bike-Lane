import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { Form } from 'react-bootstrap'
import { Typeahead } from 'react-bootstrap-typeahead'

import { getCityInputList, getCityCode } from '../../utils/cityCode'

import * as BikeActions from '../../redux/actions/BikeActions'

// Styles And Icons
import styles from './index.module.scss'

const SearchBar = () => {
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
      console.log('Latitude 緯度 : ' + crd.latitude)
      console.log('Longitude 經度 : ' + crd.longitude)
      console.log('位置誤差約 ' + crd.accuracy + ' 公尺')

      dispatch(BikeActions.getBikeLanes(latitude, longitude))
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
          placeholder="請輸入城市名"
          selected={singleSelections}
          style={{ zIndex: 1001 }}
        />
      </div>
      <div>
        <button type="button" className={styles.searchButton} onClick={searchCity}></button>
      </div>
      <div>
        <button type="button" className={styles.nearbySearchButton} onClick={nearBySearch}>
          <i></i>我附近的自行車道
        </button>
      </div>
    </div>
  )
}

export default SearchBar
