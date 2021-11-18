import React from 'react'

import Header from './Header'
import Footer from './Footer'

import styles from './index.module.scss'

const Layout = ({ children }) => {
  return (
    <div className={styles.document}>
      <Header />
      <main className={styles.container}>{children}</main>
      <Footer />
    </div>
  )
}

export default Layout
