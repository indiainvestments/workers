import * as cheerio from 'cheerio'

export async function updateMetadata(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const urlHash = url.hash
  if (urlHash === '') {
    return fetch(url.href)
  }
  const res = await fetch(url.href)
  const clonedResponse = res.clone()
  const body = await res.text()
  const $ = cheerio.load(body)
  const newDescription = $(`${urlHash} + p`).html()
  const gg = new HTMLRewriter()
    .on('meta', new MetaDataRewriter('content', newDescription))
    .transform(clonedResponse)
  return gg
  new Response($.html(), {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}

class MetaDataRewriter {
  description: string | null
  attributeName: string
  constructor(attributeName: string, description: string | null) {
    this.attributeName = attributeName
    this.description = description
  }
  element(element) {
    if (this.description) {
      if (
        element.getAttribute('name') === 'description' ||
        element.getAttribute('property') === 'og:description'
      ) {
        element.setAttribute(this.attributeName, this.description.slice(0, 100))
      }
    }
  }
}
