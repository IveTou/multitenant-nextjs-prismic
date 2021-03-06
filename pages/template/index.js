import React from 'react'

const Landing = ({ config, document, domain }) => {
  if(!document) return null

  const { data: configData } = config || {}

  return (
    <div>
      <h1>I'll Landing you!</h1>
      <h2>My domain is {domain}</h2>
      <h2>My theme is {configData?.theme}</h2>
      <h2>My info is:</h2>
      <ul>
          <li>{document?.title}</li>
          <li>{document?.description}</li>
      </ul>

      <h4>Then I can decide what and how to show you things!</h4>
    </div>
  )
}

export default Landing