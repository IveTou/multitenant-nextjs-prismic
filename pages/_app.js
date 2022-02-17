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
  
  
  /* We also need to restrict catch data by domain*/
  async  function fetchDocument() {
    const res =  await queryByUID('template', uid)
    setReponse(res)
  }

  useEffect(() => {
    fetchDocument()
  }, [])


  /* Here we can filter prismic data document by uid */
  /* And pass properly pass data by props */
  const data = { ...response, domain }

  
  return <Component { ...data } />
}

const filterByType = arr => ({ type }) => arr.includes(type)

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
