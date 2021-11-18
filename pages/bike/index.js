import React, { useState } from 'react'
import dynamic from 'next/dynamic'

// Component
import Select from 'react-select'

import { axiosCall, formatDate } from '../../server/tools'

// Styles And Icons
import styles from './index.module.scss'

const MapContainer = dynamic(() => import('../../components/MapContainer'), { ssr: false })

const Bike = () => {
  const myPosition = [25.14017, 121.79959]

  const roadMap = [
    [25.1421325173852, 121.802056935341],
    [25.1422525621511, 121.802154526427],
    [25.1425165264836, 121.802493612695],
    [25.1430886541818, 121.802976550059],
    [25.1434884881812, 121.803054838637],
    [25.1438257817298, 121.80311257542],
    [25.1439930465128, 121.803145744199],
    [25.1441024902429, 121.803165413379],
    [25.144263805563, 121.8032269283],
    [25.1443534922954, 121.803327338599],
    [25.1446058739486, 121.803749122201],
    [25.1448679706783, 121.804068985326],
    [25.145145912456, 121.80441502791],
  ]

  const markers = [25.1422525621511, 121.802154526427]

  return (
    <div className={styles.map}>
      <MapContainer myPosition={myPosition} markers={markers} roadMap={roadMap} />
    </div>
  )
}
export default Bike

// export const getStaticProps = async ctx => {

//   const { data: recentActivityList } = await axiosCall({
//     method: 'GET',
//     url: `https://ptx.transportdata.tw/MOTC/v2/Tourism/Activity?$filter=date(StartTime) ge ${formatDate(
//       new Date()
//     )}&$orderby=StartTime asc&$format=JSON`,
//   })

//   return {
//     props: { recentActivityList },
//   }
// }
