// Cloudflare Pages Function ‚Äù Domain Redirect Middleware
// Redirects pages.dev and www subdomains ‚Ü‚Ä‚Ñ¢ primary custom domain

const PRIMARY_DOMAIN = 'lifesystemos.com';
const ALIAS_DOMAINS = ['www.lifesystemos.com', 'life-system-os.pages.dev'];

export async function onRequest(context) {
  const { request, next } = context;
  const url = new URL(request.url);
  const host = url.hostname;
  if (host === PRIMARY_DOMAIN) return await next();
  const dest = 'https://' + PRIMARY_DOMAIN + url.pathname + url.search;
  return Response.redirect(dest, 301);
}
