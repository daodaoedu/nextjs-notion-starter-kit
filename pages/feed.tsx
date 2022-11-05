import React from 'react'
import RSS from 'rss'
import {
  getBlockParentPage,
  getBlockTitle,
  getPageProperty,
  idToUuid
} from 'notion-utils'
import { ExtendedRecordMap } from 'notion-types'

import * as config from 'lib/config'
import { getSiteMap } from 'lib/get-site-map'
import { getCanonicalPageUrl } from 'lib/map-page-url'
import { getSocialImageUrl } from 'lib/get-social-image-url'

// const EXTERNAL_DATA_URL = 'https://blog.daoedu.com';
// const createSitemap = (posts) => `<?xml version="1.0" encoding="UTF-8"?>
//     <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
//         ${posts
//     .map(({ id }) => {
//       return `
//                 <url>
//                     <loc>${`${EXTERNAL_DATA_URL}/${id}`}</loc>
//                 </url>
//             `;
//     })
//     .join('')}
//     </urlset>
//     `;

class Sitemap extends React.Component {
  static async getInitialProps({ req, res }) {
    if (req.method !== 'GET') {
      res.statusCode = 405
      res.setHeader('Content-Type', 'application/json')
      res.write(JSON.stringify({ error: 'method not allowed' }))
      res.end()
      return { props: {} }
    }

    const siteMap = await getSiteMap()
    const ttlMinutes = 24 * 60 // 24 hours
    const ttlSeconds = ttlMinutes * 60

    const feed = new RSS({
      title: config.name,
      site_url: config.host,
      feed_url: `${config.host}/feed.xml`,
      language: "zh",
      ttl: ttlMinutes
    })

    for (const pagePath of Object.keys(siteMap.canonicalPageMap)) {
      const pageId = siteMap.canonicalPageMap[pagePath]
      const recordMap = siteMap.pageMap[pageId] as ExtendedRecordMap
      if (!recordMap) continue

      const keys = Object.keys(recordMap?.block || {})
      const block = recordMap?.block?.[keys[0]]?.value
      if (!block) continue

      const parentPage = getBlockParentPage(block, recordMap)
      const isBlogPost =
        block.type === 'page' &&
        block.parent_table === 'collection' &&
        parentPage?.id === idToUuid(config.rootNotionPageId)
      if (!isBlogPost) {
        continue
      }

      const title = getBlockTitle(block, recordMap) || config.name
      const description =
        getPageProperty<string>('Description', block, recordMap) ||
        config.description
      const url = getCanonicalPageUrl(config.site, recordMap)(pageId)
      const lastUpdatedTime = getPageProperty<number>(
        'Last Updated',
        block,
        recordMap
      )
      const publishedTime = getPageProperty<number>('Published', block, recordMap)
      const date = lastUpdatedTime
        ? new Date(lastUpdatedTime)
        : publishedTime
          ? new Date(publishedTime)
          : undefined
      const socialImageUrl = getSocialImageUrl(pageId)

      feed.item({
        title,
        url,
        date,
        description,
        enclosure: socialImageUrl
          ? {
            url: socialImageUrl,
            type: 'image/jpeg'
          }
          : undefined
      })
    }

    const feedText = feed.xml({ indent: true })

    res.setHeader(
      'Cache-Control',
      `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds}`
    )
    res.setHeader('Content-Type', 'text/xml; charset=utf-8')
    res.write(feedText)
    res.end()
  }
}

export default Sitemap;
