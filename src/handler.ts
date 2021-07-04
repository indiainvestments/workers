import { updateMetadata } from './metadata'

const redirectHttpCode = 301
const redirectMap = new Map([
  ['/discord', `${process.env.DISCORD}`],
  ['/reddit', `${process.env.REDDIT}`],
  ['/youtube', `${process.env.YOUTUBE}`],
])

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const { pathname } = url

  const targetUrl = redirectMap.get(pathname)
  if (targetUrl) {
    return Response.redirect(targetUrl, redirectHttpCode)
  }

  return updateMetadata(request)
}
