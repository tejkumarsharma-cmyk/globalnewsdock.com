'use client'

import { useState } from 'react'
import Link from 'next/link'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { SITE_CONFIG } from '@/lib/site-config'
import { Phone, Clock, MapPin, Mail, ChevronRight } from 'lucide-react'

export const CONTACT_PAGE_OVERRIDE_ENABLED = true

// ── Theme tokens (matches homepage teal/coral/amber palette) ──────────────────
// Primary dark  #0d3d56   Primary mid  #0e6b8a
// Accent coral  #f05a28   Light bg     #f0f9ff

const ORG_TYPES = [
  'Please Select',
  'Startup / Founder',
  'PR Agency',
  'Marketing Team',
  'Enterprise',
  'Freelancer',
  'Non-profit',
  'Other',
]

const SUBJECTS = [
  'Please Select',
  'Submit a Press Release',
  'Pricing & Plans',
  'Distribution Question',
  'Technical Support',
  'Partnership Inquiry',
  'Media / Press',
  'Other',
]

export function ContactPageOverride() {
  const [form, setForm] = useState({
    name: '', phone: '', email: '',
    orgType: '', subject: '', message: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white text-slate-900">
      <NavbarShell />

      <main>
        {/* ── Page title ──────────────────────────────────────────────────── */}
        <section className="bg-[#f0f9ff] py-10 text-center">
          <h1 className="text-3xl font-extrabold text-[#0d3d56] sm:text-4xl">Contact Us</h1>
          <p className="mt-2 text-sm text-slate-500">
            We're here to help. Fill in the form and we'll get back to you within one business day.
          </p>
        </section>

        {/* ── Two-column layout ───────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_300px]">

            {/* ── Contact form ──────────────────────────────────────────── */}
            <div className="rounded-2xl border border-sky-100 bg-white p-8 shadow-sm">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-[#e0f5fb]">
                    <Mail className="h-8 w-8 text-[#0e6b8a]" />
                  </div>
                  <h2 className="text-xl font-bold text-[#0d3d56]">Message sent!</h2>
                  <p className="mt-2 text-sm text-slate-500">
                    Thank you for reaching out. We'll respond within one business day.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="mt-6 rounded-full border border-[#0e6b8a] px-6 py-2 text-sm font-medium text-[#0e6b8a] hover:bg-[#e0f5fb] transition-colors"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-[#0e6b8a]">
                    Help Us Understand Your Needs A Little More.
                  </p>

                  {/* Row 1 — name + phone */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Contact Name <span className="text-[#f05a28]">*</span>
                      </label>
                      <input
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e6b8a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6b8a]/20 transition"
                      />
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Phone Number
                      </label>
                      <input
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+1 (000) 000-0000"
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e6b8a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6b8a]/20 transition"
                      />
                    </div>
                  </div>

                  {/* Row 2 — email */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Email <span className="text-[#f05a28]">*</span>
                    </label>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e6b8a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6b8a]/20 transition"
                    />
                  </div>

                  {/* Row 3 — org type + subject */}
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        What type of organization are you? <span className="text-[#f05a28]">*</span>
                      </label>
                      <select
                        name="orgType"
                        required
                        value={form.orgType}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 focus:border-[#0e6b8a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6b8a]/20 transition"
                      >
                        {ORG_TYPES.map((o) => (
                          <option key={o} value={o === 'Please Select' ? '' : o}>
                            {o}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                        Subject: How may we help you? <span className="text-[#f05a28]">*</span>
                      </label>
                      <select
                        name="subject"
                        required
                        value={form.subject}
                        onChange={handleChange}
                        className="h-11 w-full rounded-lg border border-slate-200 bg-slate-50 px-4 text-sm text-slate-700 focus:border-[#0e6b8a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6b8a]/20 transition"
                      >
                        {SUBJECTS.map((s) => (
                          <option key={s} value={s === 'Please Select' ? '' : s}>
                            {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Row 4 — message */}
                  <div>
                    <label className="mb-1.5 block text-xs font-semibold text-slate-700">
                      Message / Comment <span className="text-[#f05a28]">*</span>
                    </label>
                    <textarea
                      name="message"
                      required
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Share the full context so we can respond with the right next step."
                      className="w-full rounded-lg border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-slate-800 placeholder:text-slate-400 focus:border-[#0e6b8a] focus:bg-white focus:outline-none focus:ring-2 focus:ring-[#0e6b8a]/20 transition resize-none"
                    />
                  </div>

                  {/* Submit */}
                  <div className="flex justify-center pt-2">
                    <button
                      type="submit"
                      className="rounded-full bg-[#f05a28] px-10 py-3 text-sm font-bold text-white shadow-md shadow-[#f05a28]/30 hover:bg-[#d44a1e] transition-colors"
                    >
                      Submit Now
                    </button>
                  </div>
                </form>
              )}
            </div>

            {/* ── Sidebar — contact info ─────────────────────────────────── */}
            <aside className="space-y-6">
              {/* Telephone hours */}
              <div className="rounded-2xl border border-sky-100 bg-[#f0f9ff] p-5">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0f5fb]">
                    <Clock className="h-4 w-4 text-[#0e6b8a]" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                    Telephone Hours
                  </p>
                </div>
                <p className="text-sm text-slate-600">Monday to Friday</p>
                <p className="text-sm text-slate-600">8:30am to 5:00pm Pacific (PDT)</p>
              </div>

              {/* Toll free */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0f5fb]">
                    <Phone className="h-4 w-4 text-[#0e6b8a]" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                    Toll Free Telephone
                  </p>
                </div>
                <p className="text-sm font-semibold text-slate-800">1-888-880-9539</p>
                <p className="text-sm text-slate-500">(646) 417-8294</p>
              </div>

              {/* Email */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0f5fb]">
                    <Mail className="h-4 w-4 text-[#0e6b8a]" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                    Email Us
                  </p>
                </div>
                <p className="text-sm font-semibold text-[#0e6b8a]">
                  contact@{SITE_CONFIG.domain}
                </p>
              </div>

              {/* Address */}
              <div className="rounded-2xl border border-sky-100 bg-white p-5 shadow-sm">
                <div className="mb-3 flex items-center gap-2">
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[#e0f5fb]">
                    <MapPin className="h-4 w-4 text-[#0e6b8a]" />
                  </div>
                  <p className="text-xs font-bold uppercase tracking-widest text-[#0d3d56]">
                    US Address
                  </p>
                </div>
                <p className="text-sm text-slate-600 leading-relaxed">
                  Suite 1400 – 506 Second Avenue<br />
                  Seattle, WA 98104, USA
                </p>
              </div>
            </aside>
          </div>
        </section>

        {/* ── FAQ banner ──────────────────────────────────────────────────── */}
        <section className="mx-auto max-w-6xl px-4 pb-16 sm:px-6 lg:px-8">
          <div className="overflow-hidden rounded-2xl bg-gradient-to-r from-[#0d3d56] to-[#0e6b8a] px-8 py-10 shadow-lg">
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-[#5dd6f5]">
                  Quick Answers
                </p>
                <h2 className="mt-1 max-w-md text-xl font-bold text-white sm:text-2xl">
                  Please take a moment to check out our FAQs for quick answers to common questions.
                </h2>
              </div>
              <Link
                href="/#faq"
                className="inline-flex shrink-0 items-center gap-2 rounded-full border-2 border-white px-6 py-3 text-sm font-bold text-white hover:bg-white hover:text-[#0d3d56] transition-colors"
              >
                View FAQs
                <ChevronRight className="h-4 w-4" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
