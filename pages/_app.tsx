import { AppProps } from 'next/app'
import { Fragment } from 'react'
import { Provider } from 'react-redux'
import { createWrapper } from 'next-redux-wrapper'
import store from '../redux/store'
import Footer from '../components/layout/Footer'
import Header from '../components/layout/Header'
import '../styles/globals.css'
import '../styles/_fontawesome.ts'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Fragment>
        <section>
          <Header />
          <Component {...pageProps} />
        </section>
        <Footer />
      </Fragment>
    </Provider>
  )
}
const makeStore = () => store
const wrapper = createWrapper(makeStore)

export default wrapper.withRedux(MyApp)
