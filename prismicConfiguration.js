// -- Prismic Repo Name
export const repoName = 'multitenant-escale'

// -- Prismic API endpoint
// Determines which repository to query and fetch data from
// Configure your site's access point here
export const apiEndpoint = `https://${repoName}.cdn.prismic.io/api/v2`

// -- Access Token if the repository is not public
// Generate a token in your dashboard and configure it here if your repository is private
export const accessToken = 'MC5ZZzZaTnhFQUFDSUFVSGs5.Fkvvv70C77-977-977-9BkMSB--_vSdV77-9MUMU77-9ee-_vULvv706aO-_ve-_ve-_ve-_ve-_ve-_ve-_vQ'

// -- Link resolution rules
// Manages the url links to internal Prismic documents
export const linkResolver = (doc) => {
  if (['template'].includes(doc.type)) {
    return `/`
  }
  return '/'
}

// -- Route Resolver rules
// Manages the url links to internal Prismic documents two levels deep (optionals)
export const routeResolver = {
  routes: [
    {
      "type":"template",
      "path":"/"
    },
  ]
};