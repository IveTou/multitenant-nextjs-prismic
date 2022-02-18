import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import { queryByUID } from '../utils/queries'

function App({ Component, pageProps }) {
  const [response, setReponse] = useState()
  const { tenant, path } = pageProps || {}
  const { name, domains } = tenant || {}

  const uid = path.substring(1)

  const environment = process.env.NODE_ENV === 'staging' ? 'stage' : (process.env.NODE_ENV || 'development')
  const domain = domains[0][environment]
  
    async  function fetchDocument() {
    const res =  await queryByUID('template', uid, domain)
    setReponse(res)
  }

  useEffect(() => {
    fetchDocument()
  }, [])

  const data = { ...response, domain }

  if(!response) {
    return <h1>404</h1>
  }
  
  return <Component { ...data } />
}

App.getInitialProps = async({ Component, ctx }) => {
  const tenant = ctx?.req?.tenant
  const path = ctx?.req?.originalUrl
  let pageProps = {}

  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {
    pageProps: {
      ...pageProps,
      tenant,
      path
    }
  }
}

export default App
