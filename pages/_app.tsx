import { AppProps } from 'next/app'
import { Fragment } from 'react'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import '../styles/globals.css'

function MyApp({ Component, pageProps }: AppProps) {
  return (
  <Fragment>
    <section>
    <Header title="Header title" color="green" />
    <Component {...pageProps} />
    </section>
    <Footer />
  </Fragment>
  )
}

export default MyApp
