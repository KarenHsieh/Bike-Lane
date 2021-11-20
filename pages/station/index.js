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
  const { stationList, stationListCount, currentLat, currentLng } = useSelector(state => state.BikeReducers)

  const [myPosition, setMyPosition] = useState([25.0409256, 121.5093713])
  const [roadMap, setRoadMap] = useState([])
  const [markers, setMarkers] = useState([])

  useEffect(() => {
    if (currentLat && currentLng) {
      setMyPosition([currentLat, currentLng])
    }
  }, [currentLat, currentLng])

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

  const list = stationList.map((result, index) => {
    const { StationName = {}, StationAddress = '', BikesCapacity = 0, ServiceType } = result

    return (
      <div
        className={styles.item}
        onClick={() => {
          setSelectedData(result)
        }}
      >
        <div className={styles.title}>{StationName.Zh_tw || '未命名路線'}</div>
        {StationAddress && <div>{StationAddress} </div>}
        {BikesCapacity && <div>{BikesCapacity} </div>} {/* 可容納之自行車總數 */}
        {ServiceType && <div>{ServiceType === 1 ? 'YouBike1.0' : 'YouBike2.0'} </div>}
      </div>
    )
  })
  return <div className={styles.items}>{list}</div>
}
