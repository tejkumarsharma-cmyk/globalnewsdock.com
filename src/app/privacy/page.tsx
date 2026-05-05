import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Shield, Eye, Settings, Lock, Bell, FileText } from 'lucide-react'

// ── Theme tokens (matches homepage teal/coral/amber palette) ──────────────────
// Primary dark  #0d3d56   Primary mid  #0e6b8a
// Accent coral  #f05a28   Light bg     #f0f9ff

const sections = [
  {
    icon: FileText,
    title: 'Data We Collect',
    body: 'We collect account information (name, email, company), usage analytics (pages visited, features used), and content you submit for distribution. We do not sell your personal data to third parties.',
  },
  {
    icon: Eye,
    title: 'How We Use Data',
    body: 'Your data is used to personalise your experience, improve our distribution network, keep the platform secure, and send you relevant service updates. Analytics are aggregated and anonymised wherever possible.',
  },
  {
    icon: Settings,
    title: 'Your Choices',
    body: 'You can manage email preferences from your account settings, request a copy of your data, or delete your account at any time. Deletion requests are processed within 30 days.',
  },
  {
    icon: Lock,
    title: 'Data Security',
    body: 'All data is encrypted in transit (TLS 1.3) and at rest (AES-256). We conduct regular security audits and follow industry best practices for access control and incident response.',
  },
  {
    icon: Bell,
    title: 'Cookies',
    body: 'We use essential cookies for authentication and optional analytics cookies to understand how the platform is used. You can opt out of analytics cookies at any time via the cookie banner.',
  },
  {
    icon: Shield,
    title: 'Third-Party Services',
    body: 'We use trusted third-party services for payment processing, email delivery, and analytics. Each provider is vetted for GDPR compliance and bound by data processing agreements.',
  },
]

export default function PrivacyPage() {
  return (
    <PageShell
      title="Privacy Policy"
      description="How we collect, use, and protect your information."
    >
      {/* ── Header card ───────────────────────────────────────────────────── */}
      <Card className="mb-8 border-sky-100 bg-[#f0f9ff] shadow-sm">
        <CardContent className="flex items-start gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0e6b8a]">
            <Shield className="h-6 w-6 text-white" />
          </div>
          <div>
            <Badge className="mb-2 bg-[#e0f5fb] text-[#0e6b8a] hover:bg-[#c8edf7]">
              Legal
            </Badge>
            <p className="text-sm leading-relaxed text-slate-600">
              Your privacy matters to us. This policy explains exactly what data we collect,
              why we collect it, and how you can control it. If you have questions, reach out
              at{' '}
              <Link href="/contact" className="font-medium text-[#0e6b8a] hover:underline">
                our contact page
              </Link>
              .
            </p>
            <p className="mt-2 text-xs text-slate-400">Last updated: March 16, 2026</p>
          </div>
        </CardContent>
      </Card>

      {/* ── Sections grid ─────────────────────────────────────────────────── */}
      <div className="grid gap-4 sm:grid-cols-2">
        {sections.map((section, idx) => (
          <Card
            key={section.title}
            className="border-sky-100 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            <CardContent className="p-6">
              <div className="flex items-start gap-3">
                {/* numbered icon */}
                <div className="relative shrink-0">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e0f5fb]">
                    <section.icon className="h-5 w-5 text-[#0e6b8a]" />
                  </div>
                  <span className="absolute -right-1 -top-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#f05a28] text-[9px] font-black text-white">
                    {idx + 1}
                  </span>
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-[#0d3d56]">{section.title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-slate-600">{section.body}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* ── Contact strip ─────────────────────────────────────────────────── */}
      <div className="mt-8 rounded-2xl border border-[#f05a28]/20 bg-[#fff7f4] p-6">
        <p className="text-sm text-slate-600">
          <span className="font-semibold text-[#f05a28]">Questions about this policy?</span>{' '}
          We're happy to help. Reach out via our{' '}
          <Link href="/contact" className="font-medium text-[#0e6b8a] hover:underline">
            contact page
          </Link>{' '}
          and we'll respond within one business day.
        </p>
      </div>
    </PageShell>
  )
}
