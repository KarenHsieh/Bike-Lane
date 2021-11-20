import React, { useEffect, useState, useMemo } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import dynamic from 'next/dynamic'

// Component
import Select from 'react-select'
import SearchBar from '../../components/SearchBar'

import { axiosCall, formatDate } from '../../server/tools'

import * as BikeActions from '../../redux/actions/BikeActions'

// Styles And Icons
import styles from './index.module.scss'

const MapContainer = dynamic(() => import('../../components/MapContainer'), { ssr: false })

const Bike = () => {
  const { resultList, dataCount, selectedBikeLane = {} } = useSelector(state => state.BikeReducers)

  const [myPosition, setMyPosition] = useState([25.0409256, 121.5093713])
  const [roadMap, setRoadMap] = useState([])
  const [markers, setMarkers] = useState([])
  // const [startPinPosition, setStartPinPosition] = useState('')
  // const [endPinPosition, setEndPinPosition] = useState('')

  useEffect(() => {
    if (selectedBikeLane && Object.keys(selectedBikeLane).length) {
      let { Geometry } = selectedBikeLane
      Geometry = Geometry.replace('MULTILINESTRING ((', '').replace('))', '')

      const spotList = Geometry.split(',')

      // 因為拿到的資料是 [經度, 緯度] ，但地圖需要的順序是 [緯度, 經度]

      const firstSpot = spotList[0].split(' ')
      // const lastSpot = spotList[spotList.length - 1].split(' ')
      // console.log(firstSpot.reverse())
      setMyPosition(firstSpot)

      const bikeLane = spotList.map(spot => {
        const position = spot.split(' ')
        const [longitude, latitude] = position // 121.741369000226 25.0899390023122

        return [latitude, longitude]
      })

      setRoadMap(bikeLane)
    }
  }, [selectedBikeLane])

  return (
    <div className={styles.main}>
      <div className={styles.searchBar}>
        <SearchBar />
      </div>

      <div className={styles.result}>
        {dataCount ? (
          <div className={styles.list}>
            <List />
          </div>
        ) : null}

        <div className={styles.map}>
          <MapContainer mapType="bike" myPosition={myPosition} markers={markers} roadMap={roadMap} />
        </div>
      </div>
    </div>
  )
}
export default Bike

const List = () => {
  const dispatch = useDispatch()
  const { resultList } = useSelector(state => state.BikeReducers)

  const [selectedData, setSelectedData] = useState({})

  useEffect(() => {
    if (Object.keys(selectedData).length) {
      dispatch(BikeActions.updateSelectedData(selectedData))
    }
  }, [selectedData])

  const list = resultList.map((result, index) => {
    const {
      RouteName = '',
      CyclingLength = '',
      RoadSectionStart = '',
      RoadSectionEnd = '',
      Direction = '',
      City = '',
      Town = '',
    } = result

    let townList = []

    if (Town) {
      if (Town.indexOf('、') > 0) {
        townList = Town.split('、').map(data => {
          return (
            <div className={styles.cityTag} key={data}>
              {data}
            </div>
          )
        })
      } else {
        townList = <div className={styles.cityTag}>{Town}</div>
      }
    }

    return (
      <div
        className={styles.item}
        onClick={() => {
          setSelectedData(result)
        }}
      >
        <div className={styles.title}>{RouteName || '未命名路線'}</div>
        {CyclingLength && <div>車道長度約 {CyclingLength} 公尺</div>}
        {RoadSectionStart && <div>起點位置：{RoadSectionStart}</div>}
        {RoadSectionEnd && <div>終點位置：{RoadSectionEnd}</div>}
        {City || Town || Direction ? (
          <div className={styles.tags}>
            {City && <div className={styles.cityTag}>{City}</div>}
            {townList}
            {Direction && <div className={styles.directionTag}>{Direction}</div>}
          </div>
        ) : null}
      </div>
    )
  })
  return <div className={styles.items}>{list}</div>
}
