import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { mockTeamMembers } from '@/data/mock-data'
import { SITE_CONFIG } from '@/lib/site-config'
import { Globe, Users, Zap } from 'lucide-react'

// ── Theme tokens (matches homepage teal/coral/amber palette) ──────────────────
// Primary dark  #0d3d56   Primary mid  #0e6b8a
// Accent coral  #f05a28   Light bg     #f0f9ff

const highlights = [
  { label: 'Media Outlets Reached', value: '10,000+', icon: Globe },
  { label: 'Monthly Views',         value: '280M+',   icon: Users },
  { label: 'Avg. Pickup Time',      value: '24 hrs',  icon: Zap },
]

const values = [
  {
    title: 'Curated by people',
    description: 'We believe trusted recommendations beat endless feeds. Every release is reviewed by a human editor before it goes live.',
  },
  {
    title: 'Designed for focus',
    description: 'A clean, calm workflow helps PR teams submit, track, and iterate without friction.',
  },
  {
    title: 'Built to scale',
    description: 'From solo founders to enterprise agencies — our infrastructure handles any volume without slowing down.',
  },
]

export default function AboutPage() {
  return (
    <PageShell
      title={`About ${SITE_CONFIG.name}`}
      description={`${SITE_CONFIG.name} is a modern release media distribution platform built for brands, agencies, and PR teams who need real reach — fast.`}
      actions={
        <>
          <Button
            variant="outline"
            asChild
            className="border-[#0e6b8a] text-[#0e6b8a] hover:bg-[#e0f5fb] hover:text-[#0d3d56]"
          >
            <Link href="/contact">Contact Us</Link>
          </Button>
          <Button
            asChild
            className="bg-[#f05a28] hover:bg-[#d44a1e] text-white shadow-md shadow-[#f05a28]/30"
          >
            <Link href="/create/mediaDistribution">Submit a Release</Link>
          </Button>
        </>
      }
    >
      {/* ── Story + stats ─────────────────────────────────────────────────── */}
      <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
        {/* story card */}
        <Card className="border-sky-100 bg-white shadow-sm">
          <CardContent className="space-y-5 p-6">
            <Badge className="bg-[#e0f5fb] text-[#0e6b8a] hover:bg-[#c8edf7]">
              Our Story
            </Badge>
            <h2 className="text-2xl font-semibold text-[#0d3d56]">
              A single platform for release media distribution that actually works.
            </h2>
            <p className="text-sm leading-relaxed text-slate-600">
              {SITE_CONFIG.name} connects businesses with thousands of media outlets, journalists,
              and digital publishers worldwide. We built the platform because PR teams deserved
              something faster, more transparent, and easier to use than legacy wire services.
            </p>

            {/* stat tiles */}
            <div className="grid gap-4 sm:grid-cols-3">
              {highlights.map((item) => (
                <div
                  key={item.label}
                  className="rounded-xl border border-sky-100 bg-[#f0f9ff] p-4 text-center"
                >
                  <div className="mx-auto mb-2 flex h-9 w-9 items-center justify-center rounded-full bg-[#e0f5fb]">
                    <item.icon className="h-4 w-4 text-[#0e6b8a]" />
                  </div>
                  <div className="text-2xl font-extrabold text-[#0d3d56]">{item.value}</div>
                  <div className="mt-0.5 text-xs text-slate-500">{item.label}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* values */}
        <div className="space-y-4">
          {values.map((value, idx) => (
            <Card
              key={value.title}
              className="border-sky-100 bg-white shadow-sm hover:shadow-md transition-shadow"
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[#f05a28]/10 text-xs font-black text-[#f05a28]">
                    0{idx + 1}
                  </span>
                  <div>
                    <h3 className="text-base font-semibold text-[#0d3d56]">{value.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{value.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── Team ──────────────────────────────────────────────────────────── */}
      <div className="mt-12">
        <div className="mb-6 flex items-center gap-3">
          <div className="h-1 w-8 rounded-full bg-[#f05a28]" />
          <h2 className="text-xl font-bold text-[#0d3d56]">Meet the Team</h2>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {mockTeamMembers.map((member) => (
            <Card
              key={member.id}
              className="border-sky-100 bg-white shadow-sm transition-all hover:-translate-y-1 hover:shadow-md"
            >
              <CardContent className="p-6">
                <div className="flex items-center gap-3">
                  <Avatar className="h-12 w-12 ring-2 ring-[#e0f5fb]">
                    <AvatarImage src={member.avatar} alt={member.name} />
                    <AvatarFallback className="bg-[#0e6b8a] text-white font-semibold">
                      {member.name.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-semibold text-[#0d3d56]">{member.name}</p>
                    <p className="text-xs text-[#0e6b8a]">{member.role}</p>
                  </div>
                </div>
                <p className="mt-3 text-sm leading-relaxed text-slate-600">{member.bio}</p>
                <p className="mt-2 text-xs text-slate-400">{member.location}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* ── CTA banner ────────────────────────────────────────────────────── */}
      <div className="mt-12 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d3d56] to-[#0e6b8a] p-8 text-white shadow-lg">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5dd6f5]">
              Ready to get started?
            </p>
            <h3 className="mt-1 text-xl font-bold">
              Distribute your next release media today
            </h3>
            <p className="mt-1 text-sm text-slate-300">
              Join thousands of brands already using {SITE_CONFIG.name}.
            </p>
          </div>
          <Button
            asChild
            size="lg"
            className="shrink-0 bg-[#f05a28] hover:bg-[#d44a1e] text-white shadow-md shadow-black/20"
          >
            <Link href="/create/mediaDistribution">Submit Now →</Link>
          </Button>
        </div>
      </div>
    </PageShell>
  )
}
