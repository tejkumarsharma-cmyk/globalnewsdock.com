import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { Calendar, Tag, ArrowRight, Search, ChevronRight } from 'lucide-react'

export const TASK_LIST_PAGE_OVERRIDE_ENABLED = true

// ── Theme tokens ──────────────────────────────────────────────────────────────
// Primary dark  #0d3d56   Primary mid  #0e6b8a
// Accent coral  #f05a28   Light bg     #f0f9ff   Icon ring  #e0f5fb

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=80',
]

function pickImage(post: { slug: string; media?: Array<{ url: string }> | null }) {
  const media = Array.isArray(post.media) ? post.media : []
  if (media[0]?.url) return media[0].url
  let hash = 0
  for (let i = 0; i < post.slug.length; i++) hash = (hash * 31 + post.slug.charCodeAt(i)) >>> 0
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length]
}

function fmtDate(iso?: string | null) {
  if (!iso) return ''
  return new Date(iso).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })
}

function excerpt(text?: string | null, max = 160) {
  const v = (text || '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim()
  return v.length > max ? v.slice(0, max).trimEnd() + '…' : v
}

export async function TaskListPageOverride(_: { task: TaskKey; category?: string }) {
  const posts = await fetchTaskPosts('mediaDistribution', 30, { allowMockFallback: true })

  const featured = posts[0] ?? null
  const grid = posts.slice(1, 13)       // 12 cards in main grid
  const sidebar = posts.slice(0, 6)     // 6 in sidebar latest list

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      {/* ── Page header ───────────────────────────────────────────────────── */}
      <section className="bg-[#0d3d56]">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-[#5dd6f5]">
                Newsroom
              </p>
              <h1 className="mt-1 text-2xl font-extrabold text-white sm:text-3xl">
                Browse News Releases
              </h1>
              <p className="mt-1 text-sm text-slate-300">
                The latest press releases, media announcements, and newsroom updates.
              </p>
            </div>
            <Link
              href="/contact"
              className="shrink-0 self-start rounded-full bg-[#f05a28] px-6 py-2.5 text-sm font-bold text-white hover:bg-[#d44a1e] transition-colors sm:self-auto"
            >
              Submit Release →
            </Link>
          </div>
        </div>
      </section>

      <main className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Left: featured + grid ──────────────────────────────────────── */}
          <div>

            {/* Featured post */}
            {featured && (
              <div className="mb-10">
                <div className="mb-4 flex items-center gap-2">
                  <div className="h-1 w-6 rounded-full bg-[#f05a28]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                    Featured
                  </p>
                </div>

                <Link
                  href={buildPostUrl('mediaDistribution', featured.slug)}
                  className="group grid overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm hover:shadow-lg transition-all sm:grid-cols-[1.4fr_1fr]"
                >
                  {/* image */}
                  <div className="h-56 overflow-hidden bg-slate-100 sm:h-auto">
                    <img
                      src={pickImage(featured)}
                      alt={featured.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  </div>
                  {/* text */}
                  <div className="flex flex-col justify-center p-6 lg:p-8">
                    <span className="mb-3 inline-block w-fit rounded-full bg-[#e0f5fb] px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-[#0e6b8a]">
                      {(featured.content as any)?.category ?? 'Press Release'}
                    </span>
                    <h2 className="text-xl font-extrabold leading-snug text-[#0d3d56] group-hover:text-[#0e6b8a] transition-colors line-clamp-3 lg:text-2xl">
                      {featured.title}
                    </h2>
                    <p className="mt-3 text-sm leading-relaxed text-slate-500 line-clamp-3">
                      {excerpt(featured.summary, 200)}
                    </p>
                    <div className="mt-4 flex items-center gap-3 text-xs text-slate-400">
                      {fmtDate(featured.publishedAt) && (
                        <span className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {fmtDate(featured.publishedAt)}
                        </span>
                      )}
                      <span className="flex items-center gap-1 text-[#f05a28] font-semibold">
                        Read more <ArrowRight className="h-3 w-3" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            )}

            {/* Grid of cards */}
            {grid.length > 0 && (
              <div>
                <div className="mb-6 flex items-center gap-2">
                  <div className="h-1 w-6 rounded-full bg-[#0e6b8a]" />
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                    Most Viewed
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
                  {grid.map((post) => {
                    const cat = (post.content as any)?.category ?? 'Press Release'
                    const date = fmtDate(post.publishedAt)
                    const img = pickImage(post)
                    return (
                      <Link
                        key={post.id}
                        href={buildPostUrl('mediaDistribution', post.slug)}
                        className="group flex flex-col overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                      >
                        {/* cover */}
                        <div className="h-40 w-full overflow-hidden bg-slate-100 shrink-0">
                          <img
                            src={img}
                            alt={post.title}
                            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                          />
                        </div>
                        {/* body */}
                        <div className="flex flex-1 flex-col p-4">
                          <span className="mb-2 inline-block w-fit rounded-full bg-[#e0f5fb] px-2.5 py-0.5 text-[9px] font-bold uppercase tracking-widest text-[#0e6b8a]">
                            {cat}
                          </span>
                          <h3 className="flex-1 text-sm font-semibold leading-snug text-slate-800 group-hover:text-[#0e6b8a] transition-colors line-clamp-3">
                            {post.title}
                          </h3>
                          <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                            {excerpt(post.summary, 100)}
                          </p>
                          <div className="mt-3 flex items-center justify-between border-t border-slate-100 pt-3">
                            {date && (
                              <span className="flex items-center gap-1 text-[10px] text-slate-400">
                                <Calendar className="h-3 w-3" />
                                {date}
                              </span>
                            )}
                            <span className="text-[10px] font-semibold text-[#f05a28]">
                              Read →
                            </span>
                          </div>
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Load more / view all */}
            <div className="mt-10 text-center">
              <Link
                href="/updates"
                className="inline-flex items-center gap-2 rounded-full border-2 border-[#0e6b8a] px-8 py-3 text-sm font-bold text-[#0e6b8a] hover:bg-[#0e6b8a] hover:text-white transition-colors"
              >
                View All Releases <ChevronRight className="h-4 w-4" />
              </Link>
            </div>

            {/* Submit CTA banner */}
            <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d3d56] to-[#0e6b8a] p-8 shadow-lg">
              <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#5dd6f5]">
                    Reach Your Audience
                  </p>
                  <h3 className="mt-1 text-xl font-extrabold text-white">
                    Connect your story with your target audience.
                  </h3>
                  <p className="mt-1 text-sm text-slate-300">
                    Distribute to 10,000+ media outlets, journalists, and digital publishers.
                  </p>
                </div>
                <Link
                  href="/contact"
                  className="shrink-0 rounded-full bg-[#f05a28] px-7 py-3 text-sm font-bold text-white hover:bg-[#d44a1e] transition-colors shadow-md"
                >
                  Submit Release →
                </Link>
              </div>
            </div>
          </div>

          {/* ── Sidebar ───────────────────────────────────────────────────── */}
          <aside className="space-y-6">

            {/* Search */}
            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="mb-3 text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                Search
              </p>
              <form action="/search" method="get" className="flex overflow-hidden rounded-lg border border-slate-200">
                <input
                  name="q"
                  placeholder="Search releases…"
                  className="h-10 flex-1 bg-slate-50 px-3 text-sm text-slate-700 placeholder:text-slate-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="flex h-10 w-10 shrink-0 items-center justify-center bg-[#0e6b8a] text-white hover:bg-[#0d3d56] transition-colors"
                >
                  <Search className="h-4 w-4" />
                </button>
              </form>
            </div>

            {/* Submit CTA card */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3d56] to-[#0e6b8a] p-5 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5dd6f5]">
                Get Featured
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug">
                Want your press release featured on {' '}
                <span className="text-[#5dd6f5]">our newsroom</span>?
              </p>
              <p className="mt-1 text-xs text-slate-300">
                Reach 10,000+ media outlets instantly.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#f05a28] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#d44a1e] transition-colors"
              >
                Get Started →
              </Link>
            </div>

            {/* Latest releases */}
            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                Latest
              </p>
              <div className="space-y-4">
                {sidebar.map((post) => {
                  const img = pickImage(post)
                  const date = fmtDate(post.publishedAt)
                  return (
                    <Link
                      key={post.id}
                      href={buildPostUrl('mediaDistribution', post.slug)}
                      className="group flex items-start gap-3 border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                    >
                      <div className="h-14 w-14 shrink-0 overflow-hidden rounded-lg bg-slate-100">
                        <img
                          src={img}
                          alt={post.title}
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-semibold leading-snug text-slate-700 group-hover:text-[#0e6b8a] transition-colors line-clamp-2">
                          {post.title}
                        </p>
                        {date && (
                          <p className="mt-1 flex items-center gap-1 text-[10px] text-slate-400">
                            <Calendar className="h-2.5 w-2.5" />
                            {date}
                          </p>
                        )}
                      </div>
                    </Link>
                  )
                })}
              </div>
            </div>

            {/* Categories */}
            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                Categories
              </p>
              <div className="flex flex-wrap gap-2">
                {['Business', 'Technology', 'Science', 'Entertainment', 'Industry', 'Events', 'Leadership', 'Product'].map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full bg-[#e0f5fb] px-3 py-1 text-xs font-semibold text-[#0e6b8a] cursor-default"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}
