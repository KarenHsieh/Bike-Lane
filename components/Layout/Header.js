import React, { useState, useEffect } from 'react'
import Link from 'next/link'
import { useDispatch } from 'react-redux'

import * as BikeActions from '../../redux/actions/BikeActions'

import styles from './index.module.scss'

const Header = () => {
  const dispatch = useDispatch()
  const [activeTab, setActiveTab] = useState('')

  useEffect(() => {
    if (activeTab) {
      dispatch(BikeActions.clearBikeLanes())
      dispatch(BikeActions.clearPosition())
      dispatch(BikeActions.clearStation())
    }
  }, [activeTab])

  return (
    <div className={styles.header}>
      <div className={styles.logo}>
        <span>自行車道</span>地圖資訊整合網
      </div>
      <div className={styles.otherPage}>
        <div className={activeTab === 'bike' ? styles.active : ''} onClick={() => setActiveTab('bike')}>
          <Link
            href={{
              pathname: '/bike',
            }}
          >
            自行車道搜尋
          </Link>
        </div>
        <div className={activeTab === 'station' ? styles.active : ''} onClick={() => setActiveTab('station')}>
          <Link
            href={{
              pathname: '/station',
            }}
          >
            我附近的 Youbike 租借站
          </Link>
        </div>
        {/* <div className={activeTab === 'attractions' ? styles.active : ''} onClick={() => setActiveTab('attractions')}>
          <Link
            href={{
              pathname: '/attractions',
            }}
          >
            美食與景點
          </Link>
        </div> */}
      </div>
    </div>
  )
}

export default Header
