// refer : https://github.com/kirill-konshin/next-redux-wrapper#usage-with-redux-saga
import React from 'react'
import App from 'next/app'
import { END } from 'redux-saga'
import { wrapper } from '../redux/store'

import '../styles/global.scss'
import Layout from '../components/Layout'
import NextNProgress from 'nextjs-progressbar'

class WrappedApp extends App {
  getInitialProps = async ({ Component, ctx }) => {
    // 1. Wait for all page actions to dispatch
    const pageProps = {
      ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
    }

    // 2. Stop the saga if on server
    if (ctx.req) {
      ctx.store.dispatch(END)
      await ctx.store.sagaTask.toPromise()
    }

    // 3. Return props
    return {
      pageProps,
    }
  }

  render() {
    const { Component, pageProps } = this.props
    return (
      <>
        <NextNProgress />
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </>
    )
  }
}

export default wrapper.withRedux(WrappedApp)
