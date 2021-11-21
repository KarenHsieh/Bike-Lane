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

const MapContainer = dynamic(() => import('../../components/StationMapContainer'), { ssr: false })

const Station = () => {
  const {
    stationList,
    stationListCount,
    currentLat,
    currentLng,
    selectedStation = {},
  } = useSelector(state => state.BikeReducers)

  const [myPosition, setMyPosition] = useState([25.0409256, 121.5093713])
  const [roadMap, setRoadMap] = useState([])
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (currentLat && currentLng) {
      setMyPosition([currentLat, currentLng])
    }
  }, [currentLat, currentLng])

  useEffect(() => {
    let stationMarkers = []
    if (stationList && stationList.length) {
      stationMarkers = stationList.map(data => {
        const { StationPosition = {} } = data
        const { PositionLat = '', PositionLon = '' } = StationPosition

        if (Object.keys(StationPosition).length && PositionLat && PositionLon) {
          return [PositionLat, PositionLon]
        } else {
          return true
        }
      })

      setMarkers(stationMarkers)
    }
  }, [stationList])

  return (
    <div className={styles.main}>
      <div className={styles.searchBar}>
        <SearchBar mapType="station" />
      </div>

      <div className={styles.result}>
        {stationListCount ? (
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
  const { stationList, stationListCount } = useSelector(state => state.BikeReducers)

  const [selectedData, setSelectedData] = useState({})

  useEffect(() => {
    if (Object.keys(selectedData).length) {
      dispatch(BikeActions.updateSelectedStation(selectedData))
    }
  }, [selectedData])

  const list = stationList.map((result, index) => {
    const {
      StationName = {},
      StationAddress = '',
      BikesCapacity = 0,
      ServiceType,
      ServiceStatus,
      AvailableRentBikes,
      AvailableReturnBikes,
    } = result

    let statusText = ''

    switch (ServiceStatus) {
      case 0: {
        statusText = '停止營運'
        break
      }
      case 1: {
        statusText = '正常營運'
        break
      }
      case 2: {
        statusText = '暫停營運'
        break
      }
      default: {
        statusText = '正常營運'
      }
    }

    return (
      <div
        className={styles.item}
        onClick={() => {
          setSelectedData(result)
        }}
      >
        <div className={styles.title}>{StationName.Zh_tw || '未命名路線'}</div>
        {StationAddress && <div>位置：{StationAddress.Zh_tw} </div>}
        {ServiceType && <div>種類：{ServiceType === 1 ? 'YouBike1.0' : 'YouBike2.0'} </div>}
        {ServiceStatus && <div>目前營運狀態：{statusText}</div>}
        {BikesCapacity && <div>可容量總車位數：{BikesCapacity} </div>} {/* 可容納之自行車總數 */}
        {AvailableRentBikes && <div>可租借數量：{AvailableRentBikes}</div>}
        {AvailableRentBikes && <div>可還空位數：{AvailableReturnBikes}</div>}
      </div>
    )
  })
  return <div className={styles.items}>{list}</div>
}
