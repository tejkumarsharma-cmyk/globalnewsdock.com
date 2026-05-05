import type { Metadata } from 'next'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { SITE_CONFIG } from '@/lib/site-config'
import { buildPageMetadata } from '@/lib/seo'
import { siteContent } from '@/config/site.content'
import { GlobalnewsdockHomepage } from '@/components/homepage/globalnewsdock-homepage'
import { fetchTaskPosts, buildPostUrl, getPostImages } from '@/lib/task-data'
import { getHomeEditorialMockPosts } from '@/lib/home-editorial-mock'

export const revalidate = 300

export async function generateMetadata(): Promise<Metadata> {
  return buildPageMetadata({
    path: '/',
    title: siteContent.home.metadata.title,
    description: siteContent.home.metadata.description,
    openGraphTitle: siteContent.home.metadata.openGraphTitle,
    openGraphDescription: siteContent.home.metadata.openGraphDescription,
    image: SITE_CONFIG.defaultOgImage,
    keywords: [...siteContent.home.metadata.keywords],
  })
}

export default async function HomePage() {
  const schemaData = [
    {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      logo: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}${SITE_CONFIG.defaultOgImage}`,
      sameAs: [],
    },
    {
      '@context': 'https://schema.org',
      '@type': 'WebSite',
      name: SITE_CONFIG.name,
      url: SITE_CONFIG.baseUrl,
      potentialAction: {
        '@type': 'SearchAction',
        target: `${SITE_CONFIG.baseUrl.replace(/\/$/, '')}/search?q={search_term_string}`,
        'query-input': 'required name=search_term_string',
      },
    },
  ]

  // Fetch real press releases; fall back to mock if feed is empty
  const rawPosts = await fetchTaskPosts('mediaDistribution', 6, { allowMockFallback: true })
  const posts = (rawPosts.length ? rawPosts : getHomeEditorialMockPosts().slice(0, 6)).map((p) => {
    const images = getPostImages(p)
    const category =
      typeof (p.content as any)?.category === 'string'
        ? (p.content as any).category
        : 'Press Release'
    return {
      id: p.id,
      title: p.title,
      slug: p.slug,
      summary: p.summary ?? '',
      category,
      author: p.authorName ?? 'Editorial Team',
      image: images[0] ?? null,
      href: buildPostUrl('mediaDistribution', p.slug),
      publishedAt: p.publishedAt ?? null,
    }
  })

  return (
    <div className="min-h-screen bg-background text-foreground">
      <NavbarShell />
      <SchemaJsonLd data={schemaData} />
      <GlobalnewsdockHomepage pressReleases={posts} />
      <Footer />
    </div>
  )
}
