import Link from 'next/link'
import { PageShell } from '@/components/shared/page-shell'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SITE_CONFIG } from '@/lib/site-config'
import { ScrollText, UserCheck, FileText, AlertTriangle, RefreshCw, Mail } from 'lucide-react'

// ── Theme tokens (matches homepage teal/coral/amber palette) ──────────────────
// Primary dark  #0d3d56   Primary mid  #0e6b8a
// Accent coral  #f05a28   Light bg     #f0f9ff

const sections = [
  {
    icon: UserCheck,
    title: 'Account Usage',
    body: 'Keep your account credentials secure and do not share access with unauthorised parties. You are responsible for all activity that occurs under your account. Notify us immediately if you suspect unauthorised use.',
  },
  {
    icon: FileText,
    title: 'Content Ownership',
    body: 'You retain full ownership of the release media and content you submit. By submitting, you grant us a non-exclusive, royalty-free licence to distribute and display your content through our media network as directed by you.',
  },
  {
    icon: AlertTriangle,
    title: 'Acceptable Use',
    body: 'You agree not to submit spam, misleading claims, harassing content, or material that violates any applicable law. We reserve the right to reject or remove content that breaches these guidelines without refund.',
  },
  {
    icon: RefreshCw,
    title: 'Service Changes',
    body: 'We may update features, pricing, or these terms with reasonable notice. Continued use of the platform after changes take effect constitutes acceptance of the updated terms.',
  },
  {
    icon: ScrollText,
    title: 'Limitation of Liability',
    body: 'Our liability is limited to the amount paid for the specific service in question. We are not liable for indirect, incidental, or consequential damages arising from use of the platform.',
  },
  {
    icon: Mail,
    title: 'Governing Law',
    body: 'These terms are governed by applicable law. Any disputes will be resolved through binding arbitration before resorting to litigation, except where prohibited by law.',
  },
]

export default function TermsPage() {
  return (
    <PageShell
      title="Terms of Service"
      description={`The rules and guidelines for using ${SITE_CONFIG.name}.`}
    >
      {/* ── Header card ───────────────────────────────────────────────────── */}
      <Card className="mb-8 border-sky-100 bg-[#f0f9ff] shadow-sm">
        <CardContent className="flex items-start gap-4 p-6">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-[#0d3d56]">
            <ScrollText className="h-6 w-6 text-white" />
          </div>
          <div>
            <Badge className="mb-2 bg-[#e0f5fb] text-[#0e6b8a] hover:bg-[#c8edf7]">
              Legal
            </Badge>
            <p className="text-sm leading-relaxed text-slate-600">
              By using {SITE_CONFIG.name} you agree to these terms. Please read them carefully.
              If you have questions, contact us via our{' '}
              <Link href="/contact" className="font-medium text-[#0e6b8a] hover:underline">
                contact page
              </Link>{' '}
              before submitting any content.
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

      {/* ── Agreement strip ───────────────────────────────────────────────── */}
      <div className="mt-8 overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d3d56] to-[#0e6b8a] p-6 text-white shadow-md">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-[#5dd6f5]">
              Agreement
            </p>
            <p className="mt-1 text-sm text-slate-200">
              By using {SITE_CONFIG.name} you confirm you have read and agree to these terms.
            </p>
          </div>
          <Link
            href="/privacy"
            className="shrink-0 rounded-lg border border-white/30 bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20 transition-colors"
          >
            Read Privacy Policy →
          </Link>
        </div>
      </div>
    </PageShell>
  )
}
