/*
 * Tells Bing, Yandex, Seznam and Naver (through IndexNow) that Blorbmart's
 * pages changed, so they recrawl in minutes instead of weeks. Bing's index
 * also feeds ChatGPT and Copilot search.
 *
 *   npm run indexnow
 *
 * Run it after a deploy. It reads each site's live sitemap, so it submits
 * exactly what is published. Each site serves the key at /<key>.txt from its
 * public/ folder; a site whose key file is missing is skipped, not failed.
 */
const KEY = '4c1f8e2b9a7d4e3f8b6a5c2d1e0f9a7b'
const HOSTS = ['www.blorbmart.com.ng', 'shop.blorbmart.com.ng', 'rider.blorbmart.com.ng', 'vendor.blorbmart.com.ng']

const locs = (xml) => [...xml.matchAll(/<loc>\s*([^<\s]+)\s*<\/loc>/g)].map((m) => m[1])

async function urlsOf(sitemapUrl) {
  const res = await fetch(sitemapUrl, { signal: AbortSignal.timeout(20000) })
  if (!res.ok) throw new Error(`${sitemapUrl} answered ${res.status}`)
  const xml = await res.text()
  if (!xml.includes('<sitemapindex')) return locs(xml)
  const nested = await Promise.all(locs(xml).map((child) => urlsOf(child).catch(() => [])))
  return nested.flat()
}

for (const host of HOSTS) {
  const keyLocation = `https://${host}/${KEY}.txt`
  const key = await fetch(keyLocation).then((r) => (r.ok ? r.text() : ''), () => '')
  if (key.trim() !== KEY) {
    console.log(`${host}: key file not live yet, skipped`)
    continue
  }

  let urlList
  try {
    urlList = [...new Set(await urlsOf(`https://${host}/sitemap.xml`))].filter((u) => new URL(u).host === host)
  } catch (error) {
    console.log(`${host}: could not read the sitemap (${error.message}), skipped`)
    continue
  }
  if (!urlList.length) {
    console.log(`${host}: sitemap is empty, skipped`)
    continue
  }

  const res = await fetch('https://api.indexnow.org/indexnow', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json; charset=utf-8' },
    body: JSON.stringify({ host, key: KEY, keyLocation, urlList }),
  })
  // 200 and 202 both mean accepted; 403 is a bad key, 422 a URL off the host.
  console.log(`${host}: ${urlList.length} URLs → IndexNow ${res.status}`)
}
