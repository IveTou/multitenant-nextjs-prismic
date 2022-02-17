import React from 'react'

import { queryRepeatableDocuments } from '../../utils/queries'


function Index() {
    fetDocuments()
        .then(a => console.log(a))
        .catch(e => console.log(e))

    return (
        <div>I hate you!</div>
    )
}

function fetDocuments () {
    return queryRepeatableDocuments()
}

export default Index