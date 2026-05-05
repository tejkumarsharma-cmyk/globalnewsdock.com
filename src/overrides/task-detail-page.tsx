import Link from 'next/link'
import { notFound } from 'next/navigation'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { fetchTaskPostBySlug, fetchTaskPosts, buildPostUrl } from '@/lib/task-data'
import type { TaskKey } from '@/lib/site-config'
import { formatRichHtml, RichContent } from '@/components/shared/rich-content'
import { Calendar, User, Tag, ArrowLeft, ChevronRight, Search } from 'lucide-react'

export const TASK_DETAIL_PAGE_OVERRIDE_ENABLED = true

// ── Theme tokens ──────────────────────────────────────────────────────────────
// Primary dark  #0d3d56   Primary mid  #0e6b8a
// Accent coral  #f05a28   Light bg     #f0f9ff   Icon ring  #e0f5fb

const FALLBACK_IMAGES = [
  'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=1200&auto=format&fit=crop&q=80',
  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=1200&auto=format&fit=crop&q=80',
]

function pickFallback(slug: string) {
  let hash = 0
  for (let i = 0; i < slug.length; i++) hash = (hash * 31 + slug.charCodeAt(i)) >>> 0
  return FALLBACK_IMAGES[hash % FALLBACK_IMAGES.length]
}

export async function TaskDetailPageOverride({ task, slug }: { task: TaskKey; slug: string }) {
  const post = await fetchTaskPostBySlug('mediaDistribution', slug)
  if (!post) notFound()

  const recent = (await fetchTaskPosts('mediaDistribution', 8, { allowMockFallback: true }))
    .filter((item) => item.slug !== slug)
    .slice(0, 6)

  const content = (post.content || {}) as Record<string, unknown>
  const category = typeof content.category === 'string' ? content.category : 'Press Release'
  const author = post.authorName || 'Editorial Desk'
  const date = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString('en-US', {
        month: 'long', day: 'numeric', year: 'numeric',
      })
    : ''

  const html = formatRichHtml(
    (content.body as string) || (content.description as string) || post.summary || '',
    'Post body will appear here.'
  )

  // Cover image — use post media or fallback
  const mediaImages = Array.isArray(post.media)
    ? post.media.map((m) => m?.url).filter((u): u is string => typeof u === 'string' && u.length > 0)
    : []
  const coverImage = mediaImages[0] ?? pickFallback(slug)

  // Prev / next from recent
  const prevPost = recent[0] ?? null
  const nextPost = recent[1] ?? null

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      {/* ── Hero banner ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden bg-[#0d3d56]">
        {/* dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.06]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        <div className="relative mx-auto max-w-5xl px-4 py-14 text-center sm:px-6 lg:py-20">
          {/* breadcrumb */}
          <div className="mb-6 flex items-center justify-center gap-2 text-xs text-slate-400">
            <Link href="/" className="hover:text-white transition-colors">Home</Link>
            <ChevronRight className="h-3 w-3" />
            <Link href="/updates" className="hover:text-white transition-colors">Press Releases</Link>
            <ChevronRight className="h-3 w-3" />
            <span className="text-slate-300 line-clamp-1 max-w-xs">{post.title}</span>
          </div>

          {/* category badge */}
          <span className="mb-4 inline-block rounded-full bg-[#f05a28]/20 px-4 py-1 text-xs font-semibold uppercase tracking-widest text-[#f05a28]">
            {category}
          </span>

          <h1 className="mx-auto max-w-4xl text-3xl font-extrabold leading-tight text-white sm:text-4xl lg:text-5xl">
            {post.title}
          </h1>

          {/* meta row */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-4 text-sm text-slate-300">
            {author && (
              <span className="flex items-center gap-1.5">
                <User className="h-3.5 w-3.5 text-[#5dd6f5]" />
                {author}
              </span>
            )}
            {date && (
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#5dd6f5]" />
                {date}
              </span>
            )}
            <span className="flex items-center gap-1.5">
              <Tag className="h-3.5 w-3.5 text-[#5dd6f5]" />
              {category}
            </span>
          </div>
        </div>
      </section>

      {/* ── Cover image ─────────────────────────────────────────────────────── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <div className="-mt-8 overflow-hidden rounded-2xl shadow-xl">
          <img
            src={coverImage}
            alt={post.title}
            className="h-64 w-full object-cover sm:h-80 lg:h-96"
          />
        </div>
      </div>

      {/* ── Main content grid ────────────────────────────────────────────────── */}
      <main className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

          {/* ── Article body ──────────────────────────────────────────────── */}
          <article>
            {/* back link */}
            <Link
              href="/updates"
              className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-[#0e6b8a] hover:text-[#0d3d56] transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Press Releases
            </Link>

            {/* summary lead */}
            {post.summary && (
              <p className="mb-8 rounded-xl border-l-4 border-[#f05a28] bg-[#f0f9ff] px-5 py-4 text-base font-medium leading-relaxed text-[#0d3d56]">
                {post.summary}
              </p>
            )}

            {/* body */}
            <div className="prose prose-slate max-w-none
              prose-headings:text-[#0d3d56] prose-headings:font-bold
              prose-a:text-[#0e6b8a] prose-a:no-underline hover:prose-a:underline
              prose-strong:text-[#0d3d56]
              prose-li:marker:text-[#f05a28]
              prose-blockquote:border-l-[#f05a28] prose-blockquote:bg-[#f0f9ff] prose-blockquote:py-1 prose-blockquote:px-4 prose-blockquote:rounded-r-lg
            ">
              <RichContent html={html} />
            </div>

            {/* tags */}
            {Array.isArray(post.tags) && post.tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-slate-100 pt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="rounded-full bg-[#e0f5fb] px-3 py-1 text-xs font-semibold text-[#0e6b8a]"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            {/* prev / next */}
            {(prevPost || nextPost) && (
              <div className="mt-10 grid gap-4 border-t border-slate-100 pt-8 sm:grid-cols-2">
                {prevPost && (
                  <Link
                    href={buildPostUrl('mediaDistribution', prevPost.slug)}
                    className="group rounded-xl border border-sky-100 bg-[#f0f9ff] p-5 hover:border-[#0e6b8a]/30 hover:shadow-sm transition-all"
                  >
                    <p className="mb-2 flex items-center gap-1 text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
                      <ArrowLeft className="h-3 w-3" /> Previous
                    </p>
                    <p className="text-sm font-medium leading-snug text-slate-700 group-hover:text-[#0d3d56] line-clamp-2">
                      {prevPost.title}
                    </p>
                  </Link>
                )}
                {nextPost && (
                  <Link
                    href={buildPostUrl('mediaDistribution', nextPost.slug)}
                    className="group rounded-xl border border-sky-100 bg-[#f0f9ff] p-5 hover:border-[#0e6b8a]/30 hover:shadow-sm transition-all sm:text-right"
                  >
                    <p className="mb-2 flex items-center justify-end gap-1 text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
                      Next <ChevronRight className="h-3 w-3" />
                    </p>
                    <p className="text-sm font-medium leading-snug text-slate-700 group-hover:text-[#0d3d56] line-clamp-2">
                      {nextPost.title}
                    </p>
                  </Link>
                )}
              </div>
            )}
          </article>

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

            {/* Submit CTA */}
            <div className="overflow-hidden rounded-2xl bg-gradient-to-br from-[#0d3d56] to-[#0e6b8a] p-5 text-white shadow-sm">
              <p className="text-xs font-bold uppercase tracking-widest text-[#5dd6f5]">
                Distribute Your News
              </p>
              <p className="mt-2 text-sm font-semibold leading-snug">
                Get your press release in front of 10,000+ media outlets.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex w-full items-center justify-center rounded-full bg-[#f05a28] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#d44a1e] transition-colors"
              >
                Submit a Release →
              </Link>
            </div>

            {/* Recent releases */}
            <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
              <p className="mb-4 text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                Recent Releases
              </p>
              <div className="space-y-4">
                {recent.map((item) => {
                  const itemDate = item.publishedAt
                    ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                        month: 'short', day: 'numeric', year: 'numeric',
                      })
                    : ''
                  return (
                    <Link
                      key={item.id}
                      href={buildPostUrl('mediaDistribution', item.slug)}
                      className="group block border-b border-slate-100 pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-sm font-medium leading-snug text-slate-700 group-hover:text-[#0e6b8a] transition-colors line-clamp-2">
                        {item.title}
                      </p>
                      {itemDate && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="h-3 w-3" />
                          {itemDate}
                        </p>
                      )}
                    </Link>
                  )
                })}
              </div>
              <Link
                href="/updates"
                className="mt-4 block text-center text-xs font-semibold text-[#0e6b8a] hover:underline"
              >
                View all releases →
              </Link>
            </div>

          </aside>
        </div>

        {/* ── Related releases ──────────────────────────────────────────────── */}
        {recent.length > 0 && (
          <section className="mt-16 border-t border-slate-100 pt-12">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-1 w-8 rounded-full bg-[#f05a28]" />
              <h2 className="text-xl font-bold text-[#0d3d56]">More Press Releases</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {recent.slice(0, 3).map((item) => {
                const itemImg = (Array.isArray(item.media) && item.media[0]?.url) || pickFallback(item.slug)
                const itemDate = item.publishedAt
                  ? new Date(item.publishedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })
                  : ''
                const itemCategory =
                  typeof (item.content as any)?.category === 'string'
                    ? (item.content as any).category
                    : 'Press Release'
                return (
                  <Link
                    key={item.id}
                    href={buildPostUrl('mediaDistribution', item.slug)}
                    className="group overflow-hidden rounded-2xl border border-sky-100 bg-white shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all"
                  >
                    <div className="h-40 w-full overflow-hidden bg-slate-100">
                      <img
                        src={itemImg}
                        alt={item.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>
                    <div className="p-4">
                      <span className="mb-2 inline-block rounded-full bg-[#e0f5fb] px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-[#0e6b8a]">
                        {itemCategory}
                      </span>
                      <p className="text-sm font-semibold leading-snug text-slate-800 group-hover:text-[#0e6b8a] transition-colors line-clamp-2">
                        {item.title}
                      </p>
                      {itemDate && (
                        <p className="mt-2 flex items-center gap-1 text-xs text-slate-400">
                          <Calendar className="h-3 w-3" />
                          {itemDate}
                        </p>
                      )}
                    </div>
                  </Link>
                )
              })}
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
