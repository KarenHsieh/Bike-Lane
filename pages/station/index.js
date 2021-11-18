import React, { useState } from 'react'

// Component
import Select from 'react-select'

import { axiosCall, formatDate } from '../../server/tools'

// Styles And Icons
import styles from './index.module.scss'

const Station = () => {
  return null
}
export default Station

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
