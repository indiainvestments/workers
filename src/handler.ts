const redirectHttpCode = 301
const redirectMap = new Map([
  ['/discord', '${{ secrets.BOT_GITHUB_TOKEN }}'],
  ['/reddit', '${{ secrets.BOT_GITHUB_TOKEN }}'],
  ['/youtube', '${{ secrets.BOT_GITHUB_TOKEN }}'],
])

export async function handleRequest(request: Request): Promise<Response> {
  const url = new URL(request.url)
  const { pathname } = url

  const targetUrl = redirectMap.get(pathname)
  if (targetUrl) {
    return Response.redirect(targetUrl, redirectHttpCode)
  }

  return fetch(request)
}
