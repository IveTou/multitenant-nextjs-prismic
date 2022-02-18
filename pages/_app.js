import React, { useEffect, useState } from 'react'

import '../styles/globals.css'
import { queryByUID } from '../utils/queries'

function App({ Component, pageProps }) {
  const [response, setReponse] = useState()
  const [error, setError] = useState()
  const { domain, uid } = pageProps || {}
  
  async  function fetchDocument() {
    try {
      /* This will cause a delay on page lading */
      const res =  await queryByUID('template', uid, domain)
      setReponse(res)
    } catch (e) {
      setError(e)
    }
  }

  useEffect(() => {
    fetchDocument()
  }, [])

  if(error) {
    return <h1>404</h1>
  }
  
  return <Component {...{ ...response, domain }} />
}

App.getInitialProps = async({ Component, ctx }) => {
  const { domains } = ctx?.req?.tenant || {}
  const path = ctx?.req?.originalUrl
  let pageProps = {}

  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  const uid = path.substring(1).replace('/', '--')

  const environment = process.env.NODE_ENV === 'staging' ? 'stage' : (process.env.NODE_ENV || 'development')
  const domain = domains[0][environment]

  return {
    pageProps: {
      ...pageProps,
      domain,
      uid
    }
  }
}

export default App
