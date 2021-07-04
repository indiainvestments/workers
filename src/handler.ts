import { updateMetadata } from './metadata'

declare global {
  const DISCORD_INVITE: string;
  const REDDIT_LINK: string;
  const YOUTUBE_CHANNEL: string;
}

const redirectHttpCode = 301
const redirectMap = new Map([
  ['/discord', DISCORD_INVITE],
  ['/reddit', REDDIT_LINK],
  ['/youtube', YOUTUBE_CHANNEL],
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
