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

const Station = () => {
  const { resultList, dataCount } = useSelector(state => state.BikeReducers)

  const [myPosition, setMyPosition] = useState([25.0409256, 121.5093713])
  const [roadMap, setRoadMap] = useState([])
  const [markers, setMarkers] = useState([])

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
          <MapContainer mapType="station" myPosition={myPosition} markers={markers} roadMap={roadMap} />
        </div>
      </div>
    </div>
  )
}
export default Station

const List = () => {
  const dispatch = useDispatch()
  const { resultList } = useSelector(state => state.BikeReducers)

  const [selectedData, setSelectedData] = useState({})

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
