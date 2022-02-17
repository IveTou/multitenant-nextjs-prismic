import React, { useEffect, useState } from 'react'
import '../styles/globals.css'
import { queryByUID } from '../utils/queries'

function App({ Component, pageProps }) {
  const [response, setReponse] = useState()
  const { tenant } = pageProps || {}
  const { name, domains } = tenant || {}

  const environment = process.env.NODE_ENV === 'staging' ? 'stage' : (process.env.NODE_ENV || 'development')
  const domain = domains[0][environment]
  /* uid will be fetched by requisition */
  const uid = ''

  async  function fetchDocument() {
    const res =  await queryByUID('template', 'home' )
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
  let pageProps = {}

  if(Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  return {
    pageProps: {
      ...pageProps,
      tenant
    }
  }
}

export default App
