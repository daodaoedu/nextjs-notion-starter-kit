import React from 'react'
import RSS from 'rss'
import {
  getBlockParentPage,
  getBlockTitle,
  getPageProperty,
  idToUuid
} from 'notion-utils'
// import { ExtendedRecordMap } from 'notion-types'
import { NotionPage } from '../components/NotionPage'
import * as config from 'lib/config'
import { getSiteMap } from 'lib/get-site-map'
import { getCanonicalPageUrl } from 'lib/map-page-url'
import { getSocialImageUrl } from 'lib/get-social-image-url'
import { NextApiRequest, NextApiResponse, NextPageContext } from "next";

interface PageContext extends NextPageContext {
  req: NextApiRequest;
  res: NextApiResponse;
}
export default function Feed(props) {
  return <NotionPage {...props} />
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
Feed.getInitialProps = async ({ req, res }: PageContext) => {
  try {
    const siteMap = await getSiteMap()
    const ttlMinutes = 24 * 60 // 24 hours
    const ttlSeconds = ttlMinutes * 60

    const feed = new RSS({
      title: config.name,
      site_url: config.host,
      feed_url: `${config.host}/feed`,
      language: 'zh',
      ttl: ttlMinutes
    })

    for (const pagePath of Object.keys(siteMap.canonicalPageMap)) {
      const pageId = siteMap.canonicalPageMap[pagePath]
      const recordMap = siteMap.pageMap[pageId] // as ExtendedRecordMap
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
        getPageProperty('Description', block, recordMap) || config.description
      const url = getCanonicalPageUrl(config.site, recordMap)(pageId)
      const lastUpdatedTime = getPageProperty('Last Updated', block, recordMap)
      const publishedTime = getPageProperty('Published', block, recordMap)

      const socialImageUrl = getSocialImageUrl(pageId)

      feed.item({
        title,
        url,
        date: lastUpdatedTime || publishedTime,
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

    res?.setHeader(
      'Cache-Control',
      `public, max-age=${ttlSeconds}, stale-while-revalidate=${ttlSeconds}`
    )
    res?.setHeader('Content-Type', 'text/xml; charset=utf-8')
    res?.write(feedText)
    res?.end()
    return {
      props: {}
    }
  } catch {
    return { notFound: true }
  }
}
