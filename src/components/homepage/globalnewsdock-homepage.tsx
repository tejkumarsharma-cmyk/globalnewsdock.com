'use client'

import Link from 'next/link'
import {
  ArrowRight, Check, Star, ChevronDown, ChevronUp,
  Zap, Shield, BarChart2, Users, Globe, FileText
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { useState } from 'react'
import { SITE_CONFIG } from '@/lib/site-config'

// ─── Image URLs — watermark-free Unsplash CDN (Unsplash License, free for commercial use) ──
const IMG = {
  // Hero: press/media broadcast concept illustration
  hero:       'https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=900&auto=format&fit=crop&q=80',
  // "Who is this for": clean PR team around a table — NO watermark
  teamWork:   'https://images.unsplash.com/photo-1556761175-4b46a572b786?w=900&auto=format&fit=crop&q=80',
  // "How it works": person working on laptop / dashboard
  dashboard:  'https://images.unsplash.com/photo-1551434678-e076c223a692?w=900&auto=format&fit=crop&q=80',
  // Blog 1: journalist / newsroom
  blog1:      'https://images.unsplash.com/photo-1495020689067-958852a7765e?w=700&auto=format&fit=crop&q=80',
  // Blog 2: analytics / data charts
  blog2:      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=700&auto=format&fit=crop&q=80',
  // Newsletter CTA: business handshake / partnership
  newsletter: 'https://images.unsplash.com/photo-1521791136064-7986c2920216?w=900&auto=format&fit=crop&q=80',
  // Avatars: professional headshots
  avatar1:    'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&auto=format&fit=crop&crop=faces&q=80',
  avatar2:    'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&auto=format&fit=crop&crop=faces&q=80',
  avatar3:    'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&auto=format&fit=crop&crop=faces&q=80',
}

// ─── Color tokens (teal/emerald + coral accent + amber CTA) ──────────────────
// Primary dark:  #0d3d56  (deep ocean teal)
// Primary mid:   #0e6b8a  (teal)
// Accent coral:  #f05a28  (warm coral-orange)
// Accent amber:  #f5a623  (amber)
// Light bg:      #f0f9ff  (sky-50)

const MEDIA_LOGOS = ['FOX', 'NBC', 'Forbes', 'AP', 'YAHOO', 'WSJ', 'Reuters', 'Bloomberg']

const STORIES = [
  {
    quote: 'Media24Press helped us secure meaningful pickup in just one day. The workflow is clean and the turnaround is excellent.',
    name: 'Amelia Davis',
    role: 'Head of PR, Launchpad',
    avatar: IMG.avatar1,
  },
  {
    quote: 'We replaced scattered outreach with one distribution flow. Reporting and visibility have both improved significantly.',
    name: 'Ravi Mehta',
    role: 'Founder, Stackwise',
    avatar: IMG.avatar2,
  },
  {
    quote: 'The platform feels built for brand teams. Our launches now go live faster and look much more professional.',
    name: 'Sophia Chen',
    role: 'Marketing Director, Lumio',
    avatar: IMG.avatar3,
  },
]

const FEATURES_LEFT = [
  { icon: Users,    label: 'Startups launching product or funding announcements' },
  { icon: Globe,    label: 'PR teams handling recurring media distribution' },
  { icon: FileText, label: 'Agencies running multiple client campaigns' },
  { icon: Star,     label: 'Founders building brand authority with consistent news' },
]

const HOW_IT_WORKS = [
  { icon: Star,     title: 'Trustpilot 4.9 / 5',   sub: '5-Star Delivery' },
  { icon: Shield,   title: 'Editorial Review',       sub: 'Human-checked before publish' },
  { icon: Zap,      title: 'Secure Publishing',      sub: 'Encrypted & reliable' },
  { icon: BarChart2,title: 'Media Reporting',        sub: 'Track every placement' },
]

// ─── Press release post type (passed from server) ────────────────────────────
export type PressReleasePost = {
  id: string
  title: string
  slug: string
  summary: string
  category: string
  author: string
  image: string | null
  href: string
  publishedAt: string | null
}

// Fallback images cycling for posts without a cover photo
const FALLBACK_IMAGES = [IMG.blog1, IMG.blog2, IMG.dashboard, IMG.teamWork]

const REVIEWS = [
  { stars: 5, text: 'Incredible reach. Our announcement was picked up by 40+ outlets within 24 hours.', name: 'James T.',  company: 'Founder' },
  { stars: 5, text: 'The editorial team caught two errors before publishing. That level of care is rare.', name: 'Priya K.',  company: 'PR Manager' },
  { stars: 5, text: 'Simple pricing, no hidden fees, and the dashboard is genuinely easy to use.', name: 'Carlos M.', company: 'Agency Lead' },
  { stars: 5, text: 'We switched from a competitor and the difference in pickup quality was immediate.', name: 'Lena W.',   company: 'Brand Strategist' },
]

const FAQS = [
  { q: 'How quickly will my press release go live?',       a: 'Most releases are reviewed and published within 2–4 business hours after submission.' },
  { q: 'Can I track where my release was distributed?',    a: 'Yes. Every plan includes a distribution report showing all pickup locations and estimated reach.' },
  { q: 'Is there a word limit on press releases?',         a: 'Standard releases support up to 800 words. Extended releases are available on Platinum plans.' },
  { q: 'Do you offer writing services?',                   a: 'Yes. Our editorial team can write or polish your release as an add-on to any plan.' },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────
function Stars({ count = 5 }: { count?: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
      ))}
    </div>
  )
}

function FaqItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false)
  return (
    <div className="border-b border-slate-200 py-4">
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between text-left text-base font-medium text-slate-800 hover:text-[#0e6b8a] transition-colors"
      >
        {q}
        {open ? <ChevronUp className="h-4 w-4 shrink-0" /> : <ChevronDown className="h-4 w-4 shrink-0" />}
      </button>
      {open && <p className="mt-3 text-sm leading-relaxed text-slate-600">{a}</p>}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export function GlobalnewsdockHomepage({ pressReleases = [] }: { pressReleases?: PressReleasePost[] }) {
  return (
    <div className="min-h-screen bg-white font-sans">

      {/* ══ HERO ══════════════════════════════════════════════════════════════ */}
      <section className="relative overflow-hidden bg-[#0d3d56] text-white">
        {/* dot-grid overlay */}
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07]"
          style={{
            backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
            backgroundSize: '28px 28px',
          }}
        />
        {/* bottom wave */}
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-16 bg-white"
          style={{ clipPath: 'ellipse(55% 100% at 50% 100%)' }} />

        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">

            {/* ── left copy ── */}
            <div>
              <Badge className="mb-5 border border-[#f05a28]/50 bg-[#f05a28]/20 text-orange-200 hover:bg-[#f05a28]/30">
                Featured On
              </Badge>

              <div className="mb-7 flex flex-wrap gap-2">
                {MEDIA_LOGOS.slice(0, 6).map((m) => (
                  <span key={m}
                    className="rounded-md border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold tracking-wider text-white/80">
                    {m}
                  </span>
                ))}
              </div>

              <h1 className="text-4xl font-extrabold leading-tight tracking-tight sm:text-5xl lg:text-[3.4rem]">
                Get your story in front of{' '}
                <span className="text-[#5dd6f5]">millions</span> — instantly
              </h1>
              <p className="mt-5 max-w-lg text-base leading-relaxed text-slate-300">
                {SITE_CONFIG.name} connects your news with thousands of media outlets, journalists,
                and digital publishers worldwide. Maximise visibility and impact for every announcement.
              </p>

              <div className="mt-9 flex flex-wrap gap-4">
                <Button asChild size="lg"
                  className="bg-[#f05a28] hover:bg-[#d44a1e] text-white px-8 shadow-lg shadow-[#f05a28]/30">
                  <Link href="/contact">
                    Submit Now <ArrowRight className="ml-2 h-4 w-4" />
                  </Link>
                </Button>

              </div>
            </div>

            {/* ── right – hero illustration + orbit ── */}
            <div className="flex items-center justify-center pb-8">
              <div className="relative h-72 w-72">
                {/* hero illustration */}
                <img
                  src={IMG.hero}
                  alt="Press release distribution illustration"
                  className="absolute inset-0 h-full w-full rounded-full object-cover opacity-30"
                />
                {/* centre FOX card */}
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <div className="flex h-32 w-32 flex-col items-center justify-center rounded-full border-4 border-[#5dd6f5] bg-[#0a2e42] shadow-2xl shadow-[#5dd6f5]/20">
                    <span className="text-2xl font-black text-white">FOX</span>
                    <span className="mt-1 text-[10px] font-semibold text-[#5dd6f5]">280M+ Views</span>
                  </div>
                </div>
                {/* orbiting logos */}
                {['NBC', 'Forbes', 'AP', 'YAHOO', 'WSJ'].map((logo, i) => {
                  const angle = (i / 5) * 360 - 90
                  const rad = (angle * Math.PI) / 180
                  const r = 118
                  const x = Math.round(r * Math.cos(rad))
                  const y = Math.round(r * Math.sin(rad))
                  return (
                    <div key={logo}
                      className="absolute flex h-11 w-11 items-center justify-center rounded-full border border-white/25 bg-[#0a2e42] text-[9px] font-bold text-white/80 shadow-lg"
                      style={{ top: `calc(50% + ${y}px - 22px)`, left: `calc(50% + ${x}px - 22px)` }}>
                      {logo}
                    </div>
                  )
                })}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ BRAND IN THE RIGHT PLACE ══════════════════════════════════════════ */}
      <section className="border-b border-slate-100 bg-white py-16">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="mb-3 text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
            Social Proof
          </p>
          <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
            Your brand in the right place
          </h2>
          <div className="mt-6 inline-flex items-center gap-4 rounded-2xl border border-slate-200 bg-[#f0f9ff] px-8 py-4 shadow-sm">
            <span className="text-3xl font-black text-[#0d3d56]">FOX</span>
            <div className="text-left">
              <p className="text-sm font-semibold text-slate-700">280M+ Views</p>
              <p className="text-xs text-slate-500">across distribution channels</p>
            </div>
          </div>
          <p className="mt-5 text-sm text-slate-500">
            Your releases appear alongside trusted editorial content on the web's most-read platforms.
          </p>
        </div>
      </section>

      {/* ══ CUSTOMER STORIES ══════════════════════════════════════════════════ */}
      <section className="bg-[#f0f9ff] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
            Customer Stories
          </p>
          <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Trusted by brands and agencies
          </h2>

          <div className="grid gap-6 sm:grid-cols-3">
            {STORIES.map((s) => (
              <div key={s.name}
                className="flex flex-col gap-4 rounded-2xl border border-sky-100 bg-white p-6 shadow-sm hover:shadow-md transition-shadow">
                {/* avatar */}
                <div className="h-48 w-full overflow-hidden rounded-xl bg-slate-100">
                  <img src={s.avatar} alt={s.name} className="h-full w-full object-cover object-center" />
                </div>
                <p className="flex-1 text-sm leading-relaxed text-slate-600 italic">"{s.quote}"</p>
                <div className="flex items-center gap-3 border-t border-slate-100 pt-3">
                  <div className="h-8 w-8 overflow-hidden rounded-full bg-slate-200">
                    <img src={s.avatar} alt={s.name} className="h-full w-full object-cover object-center" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-800">{s.name}</p>
                    <p className="text-xs text-slate-500">{s.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ WHO IS THIS FOR ═══════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
                Who is this for?
              </p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Made for teams that need reach and speed
              </h2>
              <ul className="mt-8 space-y-4">
                {FEATURES_LEFT.map((f) => (
                  <li key={f.label} className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#e0f5fb]">
                      <Check className="h-3.5 w-3.5 text-[#0e6b8a]" />
                    </span>
                    <span className="text-sm text-slate-700">{f.label}</span>
                  </li>
                ))}
              </ul>
              <Button asChild size="lg"
                className="mt-8 bg-[#0e6b8a] hover:bg-[#0d3d56] text-white shadow-md">
                <Link href="/contact">
                  Get Started <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>

            {/* team photo */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={IMG.teamWork}
                alt="Team collaborating on press release strategy"
                className="h-80 w-full object-cover"
              />

            </div>
          </div>
        </div>
      </section>

      {/* ══ HOW IT WORKS ══════════════════════════════════════════════════════ */}
      <section className="py-20 bg-[#f0f9ff]">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            {/* dashboard photo */}
            <div className="relative overflow-hidden rounded-3xl shadow-xl">
              <img
                src={IMG.dashboard}
                alt="Publishing dashboard on laptop"
                className="h-80 w-full object-cover"
              />
              <div className="absolute bottom-4 right-4 rounded-xl bg-[#0d3d56] px-4 py-2 text-white shadow-lg">
                <p className="text-xs font-semibold uppercase tracking-wide">Live in</p>
                <p className="text-lg font-extrabold">24 Hours</p>
              </div>
            </div>

            <div>
              <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
                How It Works
              </p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Simple flow, fast publishing
              </h2>
              <div className="mt-8 space-y-4">
                {HOW_IT_WORKS.map((h, idx) => (
                  <div key={h.title}
                    className="flex items-center gap-4 rounded-xl border border-sky-100 bg-white px-5 py-4 shadow-sm hover:border-[#0e6b8a]/30 transition-colors">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e0f5fb]">
                      <h.icon className="h-5 w-5 text-[#0e6b8a]" />
                    </div>
                    <div className="flex-1">
                      <p className="text-sm font-semibold text-slate-800">{h.title}</p>
                      <p className="text-xs text-slate-500">{h.sub}</p>
                    </div>
                    <span className="text-2xl font-black text-[#0e6b8a]/10">0{idx + 1}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══ STATS STRIP ═══════════════════════════════════════════════════════ */}
      <section className="bg-[#0d3d56] py-12 text-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center justify-center gap-6 text-center sm:gap-12">
            {[
              { value: '10,000+', label: 'Media Outlets' },
              { value: '280M+',   label: 'Monthly Views' },
              { value: '4.9 / 5', label: 'Trustpilot Rating' },
              { value: '24 hrs',  label: 'Avg. Pickup Time' },
            ].map((s) => (
              <div key={s.label} className="px-4">
                <p className="text-3xl font-extrabold text-[#5dd6f5]">{s.value}</p>
                <p className="mt-1 text-xs font-medium uppercase tracking-widest text-slate-400">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ PRESS RELEASES ════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-end justify-between">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
                Latest Press Releases
              </p>
              <h2 className="text-2xl font-bold text-slate-900 sm:text-3xl">
                Learn what drives distribution performance
              </h2>
            </div>
            <Link href="/updates"
              className="hidden text-sm font-medium text-[#0e6b8a] hover:underline sm:block">
              View all →
            </Link>
          </div>

          {pressReleases.length === 0 ? (
            <p className="text-sm text-slate-400 text-center py-10">No press releases yet.</p>
          ) : (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {pressReleases.map((post, idx) => {
                const coverImg = post.image ?? FALLBACK_IMAGES[idx % FALLBACK_IMAGES.length]
                const date = post.publishedAt
                  ? new Date(post.publishedAt).toLocaleDateString('en-US', {
                      month: 'short', day: 'numeric', year: 'numeric',
                    })
                  : null
                return (
                  <Link
                    key={post.id}
                    href={post.href}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm hover:shadow-lg transition-all hover:-translate-y-0.5"
                  >
                    {/* cover image */}
                    <div className="h-44 w-full overflow-hidden bg-slate-100 shrink-0">
                      <img
                        src={coverImg}
                        alt={post.title}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                    </div>

                    {/* content */}
                    <div className="flex flex-1 flex-col p-5">
                      <Badge className="mb-3 w-fit bg-[#e0f5fb] text-[#0e6b8a] hover:bg-[#c8edf7]">
                        {post.category}
                      </Badge>
                      <h3 className="flex-1 text-sm font-semibold leading-snug text-slate-800 group-hover:text-[#0e6b8a] transition-colors line-clamp-2">
                        {post.title}
                      </h3>
                      {post.summary && (
                        <p className="mt-2 text-xs leading-relaxed text-slate-500 line-clamp-2">
                          {post.summary}
                        </p>
                      )}
                      <div className="mt-4 flex items-center justify-between border-t border-slate-100 pt-3">
                        <span className="text-xs text-slate-400">{post.author}</span>
                        {date && <span className="text-xs text-slate-400">{date}</span>}
                      </div>
                    </div>
                  </Link>
                )
              })}
            </div>
          )}

          {/* mobile "view all" */}
          <div className="mt-8 text-center sm:hidden">
            <Link href="/updates"
              className="text-sm font-medium text-[#0e6b8a] hover:underline">
              View all press releases →
            </Link>
          </div>
        </div>
      </section>

      {/* ══ REVIEWS ═══════════════════════════════════════════════════════════ */}
      <section className="bg-[#f0f9ff] py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="mb-2 text-center text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
            Customer Reviews
          </p>
          <h2 className="mb-12 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Rated highly by founders and teams
          </h2>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {REVIEWS.map((r) => (
              <div key={r.name}
                className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm hover:shadow-md transition-shadow">
                <Stars count={r.stars} />
                <p className="mt-3 text-sm leading-relaxed text-slate-600 italic">"{r.text}"</p>
                <div className="mt-4 border-t border-slate-100 pt-3">
                  <p className="text-sm font-semibold text-slate-800">{r.name}</p>
                  <p className="text-xs text-slate-500">{r.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══ FAQ ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 bg-white">
        <div className="mx-auto max-w-2xl px-4 sm:px-6">
          <h2 className="mb-10 text-center text-2xl font-bold text-slate-900 sm:text-3xl">
            Common questions
          </h2>
          <div>
            {FAQS.map((faq) => (
              <FaqItem key={faq.q} q={faq.q} a={faq.a} />
            ))}
          </div>
        </div>
      </section>

      {/* ══ NEWSLETTER CTA ════════════════════════════════════════════════════ */}
      <section className="py-16 bg-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-3xl bg-gradient-to-br from-[#f5a623] to-[#f05a28]">
            <div className="grid lg:grid-cols-2 lg:items-stretch">
              {/* text side */}
              <div className="p-10 lg:p-14">
                <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/70">
                  Stay Updated
                </p>
                <h2 className="text-2xl font-extrabold text-white sm:text-3xl">
                  Get distribution tips and release templates
                </h2>
                <p className="mt-3 text-sm text-white/80 leading-relaxed">
                  Join thousands of PR professionals who get our weekly insights on media
                  distribution, editorial best practices, and platform updates.
                </p>
                <div className="mt-6 flex flex-col gap-3 sm:flex-row">
                  <Input
                    type="email"
                    placeholder="Enter your email"
                    className="max-w-xs border-white/40 bg-white/20 text-white placeholder:text-white/60 focus-visible:ring-white"
                  />
                  <Button className="bg-[#0d3d56] hover:bg-[#0a2e42] text-white shadow-md font-semibold">
                    Subscribe
                  </Button>
                </div>
              </div>

              {/* newsletter image side */}
              <div className="hidden lg:block relative overflow-hidden">
                <img
                  src={IMG.newsletter}
                  alt="Business partnership handshake"
                  className="absolute inset-0 h-full w-full object-cover mix-blend-overlay opacity-60"
                />
                <div className="absolute inset-0 bg-gradient-to-l from-transparent to-[#f05a28]/40" />
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  )
}
