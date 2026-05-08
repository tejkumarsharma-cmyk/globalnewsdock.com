'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Search, Menu, X } from 'lucide-react'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

export const NAVBAR_OVERRIDE_ENABLED = true

const NAV_LINKS = [
  { label: 'Home',        href: '/' },
  { label: 'Latest News', href: '/updates' },
  { label: 'About Us',    href: '/about' },
  { label: 'Contact',     href: '/contact' },
]

export function NavbarOverride() {
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white shadow-sm">
      {/* ── Main bar ─────────────────────────────────────────────────────────── */}
      <div className="mx-auto flex h-20 max-w-7xl items-center px-6 lg:px-10">

        {/* ── Logo — fixed width so center nav truly centres ─────────────────── */}
        <div className="flex w-56 shrink-0 items-center">
          <Link href="/" className="flex items-center">
            <img
              src="/logo.png"
              alt="Logo"
              className="h-10 w-auto object-contain"
            />
          </Link>
        </div>

        {/* ── Centre nav — absolutely centred in the bar ─────────────────────── */}
        <nav className="hidden flex-1 items-center justify-center gap-8 lg:flex">
          {NAV_LINKS.map((link) => {
            const isActive =
              link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
            return (
              <Link
                key={link.label}
                href={link.href}
                className={cn(
                  'text-[14px] transition-colors whitespace-nowrap',
                  isActive
                    ? 'font-bold text-slate-900'
                    : 'font-medium text-slate-500 hover:text-slate-900'
                )}
              >
                {link.label}
              </Link>
            )
          })}
        </nav>

        {/* ── Right actions — fixed width matching logo side ─────────────────── */}
        <div className="flex w-56 shrink-0 items-center justify-end gap-3">
          {/* Search icon */}
          <Link
            href="/search"
            aria-label="Search"
            className="hidden rounded-full p-2 text-slate-500 hover:bg-slate-100 hover:text-slate-900 transition-colors lg:flex"
          >
            <Search className="h-[18px] w-[18px]" />
          </Link>

          {/* Submit Release CTA */}
          <Link
            href="/contact"
            className="hidden rounded-full bg-[#f05a28] px-5 py-2.5 text-[13px] font-semibold text-white shadow-sm hover:bg-[#d44a1e] transition-colors lg:inline-flex"
          >
            Submit Release
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setOpen(!open)}
            aria-label="Toggle menu"
            className="rounded-full p-2 text-slate-600 hover:bg-slate-100 transition-colors lg:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* ── Mobile menu ───────────────────────────────────────────────────────── */}
      {open && (
        <div className="border-t border-slate-100 bg-white lg:hidden">
          <div className="mx-auto max-w-7xl space-y-1 px-4 py-4 sm:px-6">
            {NAV_LINKS.map((link) => {
              const isActive =
                link.href === '/' ? pathname === '/' : pathname.startsWith(link.href)
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setOpen(false)}
                  className={cn(
                    'flex items-center rounded-xl px-4 py-3 text-sm font-medium transition-colors',
                    isActive
                      ? 'bg-slate-100 font-semibold text-slate-900'
                      : 'text-slate-600 hover:bg-slate-50 hover:text-slate-900'
                  )}
                >
                  {link.label}
                </Link>
              )
            })}

            <div className="flex items-center gap-2 pt-2">
              <Link
                href="/search"
                onClick={() => setOpen(false)}
                className="flex flex-1 items-center gap-2 rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-500 hover:bg-slate-50"
              >
                <Search className="h-4 w-4" />
                Search
              </Link>
              <Link
                href="/contact"
                onClick={() => setOpen(false)}
                className="flex-1 rounded-xl bg-[#f05a28] px-4 py-3 text-center text-sm font-semibold text-white hover:bg-[#d44a1e] transition-colors"
              >
                Submit Release
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
