import React from 'react'
import Link from 'next/link'

import Logo from '/public/icons/Logo-desktop.svg'

import styles from './index.module.scss'

const Header = () => {
  return (
    <div className={styles.header}>
      <div>
        <Link href="/bike">自行車道地圖資訊整合網</Link>
      </div>
      <div className={styles.otherPage}>
        <div>
          <Link
            href={{
              pathname: '/bike',
            }}
          >
            自行車道搜尋
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: '/station',
            }}
          >
            我附近的 Youbike 租借站
          </Link>
        </div>
        <div>
          <Link
            href={{
              pathname: '/attractions',
            }}
          >
            美食與景點
          </Link>
        </div>
      </div>
    </div>
  )
}

export default Header
