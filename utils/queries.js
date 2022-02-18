import Prismic from '@prismicio/client'
import { Client } from './prismicHelpers'

async function fetchDocs(page = 1, routes = []) {
    const response = await Client().query('', { pageSize: 100, lang: '*', page })
    const allRoutes = routes.concat(response.results)
    if (response.results_size + routes.length < response.total_results_size) {
      return fetchDocs(page + 1, allRoutes)
    }
    return [...new Set(allRoutes)]
}

export const queryByUID = async (type, uid, domain) => {
    /* TODO: if don't have ui force set type param to 'landing' */
    const document =  uid
        ? await Client().getByUID(type, uid)
        : await Client().query([Prismic.Predicates.at('document.type', 'landing')])

    const documentData = document?.data || document.results[0]?.data

    const config = await Client().getByUID('config', documentData.config?.uid)
    
    if(config?.data?.domain !== domain) return null

    return { documentData, config }
}
  
/** Fetches all Prismic documents and filters them (eg. by document type).
 *  In production, you would probably query documents by type instead of filtering them.
 **/
export const queryRepeatableDocuments = async (filter) => {
    const allRoutes = await fetchDocs()
    return allRoutes.filter(filter)
}