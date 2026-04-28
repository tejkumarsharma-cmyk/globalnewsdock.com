'use client'

import Link from 'next/link'
import { ArrowRight, Check, Globe, Megaphone, Target, TrendingUp, Users, Zap, FileText, BarChart, Search, Mail, Star, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { SITE_CONFIG } from '@/lib/site-config'

export function GlobalnewsdockHomepage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50 to-white">
        <div className="absolute inset-0 bg-[url('/placeholder-hero.jpg')] bg-cover bg-center opacity-20 blur-lg" />
        <div className="relative mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8 lg:py-32">
          <div className="grid gap-16 lg:grid-cols-2 lg:items-center">
            <div>
              <h1 className="text-5xl font-bold tracking-tight text-slate-900 sm:text-6xl lg:text-7xl">
                Your trusted partner for
                <span className="text-orange-600">press release distribution</span>
              </h1>
              <p className="mt-6 text-lg leading-relaxed text-slate-600 max-w-2xl">
                Globalnewsdock connects your news with thousands of media outlets, journalists, and digital publishers worldwide. Our platform ensures your press releases reach the right audience at the right time, maximizing visibility and impact for your announcements.
              </p>
              <div className="mt-10 flex flex-col gap-4 sm:flex-row">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 py-3 text-lg font-semibold shadow-lg">
                  Submit Now
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-[4/3] overflow-hidden rounded-2xl border-2 border-dashed border-orange-200 bg-orange-50/50 flex items-center justify-center backdrop-blur-sm">
                <img 
                  src="https://cdn.freepik.com/free-vector/press-release-distribution-concept-illustration_114360-21832.jpg" 
                  alt="Press Release Distribution"
                  className="w-full h-full object-cover opacity-80"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
              Ready to submit? Choose a package
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Flexible pricing plans for businesses of all sizes
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 lg:grid-cols-4">
            {/* Silver Plan */}
            <Card className="relative border-orange-200 bg-white/80 backdrop-blur-sm shadow-sm hover:shadow-md transition-shadow">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl text-slate-900">Silver</CardTitle>
                <div className="mt-4">
                  <span className="text-4xl font-bold text-slate-900">$29</span>
                  <span className="text-slate-600">/release</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    'Basic Distribution',
                    '500+ Media Outlets',
                    'Standard Support',
                    '7-Day Distribution',
                    'Basic Analytics'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-2">
                      <Check className="h-4 w-4 text-orange-600" />
                      <span className="text-sm text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg">
                  Choose Silver
                </Button>
              </CardContent>
            </Card>

            {/* Gold Plan - Highlighted */}
            <Card className="relative border-orange-600 bg-gradient-to-br from-orange-50 via-orange-100 to-white/90 backdrop-blur-sm shadow-xl scale-105 lg:scale-110 ring-4 ring-orange-600/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-orange-600 to-orange-500 text-white px-4 py-1 shadow-lg">
                  <Star className="mr-2 h-4 w-4" />
                  Most Popular
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-orange-600">Gold</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-orange-600">$79</span>
                  <span className="text-slate-600 text-sm">/release</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    'Enhanced Distribution',
                    '2,000+ Media Outlets',
                    'Priority Support',
                    '14-Day Distribution',
                    'Advanced Analytics',
                    'SEO Optimization',
                    'Social Media Integration'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-xl transform hover:scale-105 transition-all">
                  Choose Gold
                </Button>
              </CardContent>
            </Card>

            {/* Platinum Plan */}
            <Card className="relative border-orange-200 bg-white/80 backdrop-blur-sm hover:border-orange-300 transition-all hover:shadow-lg">
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-semibold text-slate-900">Platinum</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-slate-900">$249</span>
                  <span className="text-slate-600 text-sm">/release</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    'Premium Distribution',
                    '5,000+ Media Outlets',
                    'Dedicated Support',
                    '30-Day Distribution',
                    'Premium Analytics',
                    'Full SEO Package',
                    'Multi-channel Promotion',
                    'Custom Targeting'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg">
                  Choose Platinum
                </Button>
              </CardContent>
            </Card>

            {/* Platinum Plus Plan */}
            <Card className="relative border-orange-600 bg-gradient-to-br from-orange-50 via-orange-100 to-white/90 backdrop-blur-sm shadow-xl scale-105 lg:scale-110 ring-4 ring-orange-600/20">
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                <Badge className="bg-gradient-to-r from-orange-600 to-red-600 text-white px-4 py-1 shadow-lg">
                  <Zap className="mr-2 h-4 w-4" />
                  Best Value
                </Badge>
              </div>
              <CardHeader className="text-center pb-8">
                <CardTitle className="text-xl font-bold text-orange-600">Platinum Plus</CardTitle>
                <div className="mt-4">
                  <span className="text-5xl font-bold text-orange-600">$349</span>
                  <span className="text-slate-600 text-sm">/release</span>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {[
                    'Enterprise Distribution',
                    '10,000+ Media Outlets',
                    'White-glove Support',
                    'Unlimited Distribution',
                    'Enterprise Analytics',
                    'Complete SEO Suite',
                    'Full Media Campaign',
                    'Custom Strategy',
                    'Dedicated Account Manager'
                  ].map((feature) => (
                    <div key={feature} className="flex items-center gap-3">
                      <Check className="h-5 w-5 text-orange-600" />
                      <span className="text-sm font-medium text-slate-700">{feature}</span>
                    </div>
                  ))}
                </div>
                <Button className="w-full mt-6 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white shadow-lg">
                  Choose Platinum Plus
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
              Why choose Globalnewsdock?
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Comprehensive press release distribution with proven results
            </p>
          </div>
          
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { icon: Globe, title: "1000s of Publishing Sources", description: "Access to thousands of verified media outlets and news platforms" },
              { icon: Users, title: "Real Journalists", description: "Connect with professional journalists and media professionals" },
              { icon: TrendingUp, title: "Increased Conversions", description: "Drive more traffic and leads with targeted distribution" },
              { icon: Star, title: "Improved Brand Image", description: "Enhance your brand credibility and authority" },
              { icon: Search, title: "SEO Benefits", description: "Improve search engine rankings with quality backlinks" },
              { icon: Target, title: "Target Your Audience", description: "Reach specific demographics and industry sectors" },
              { icon: FileText, title: "PDF Reporting", description: "Detailed analytics and performance reports" },
              { icon: Zap, title: "Great Marketing Alternative", description: "Cost-effective alternative to traditional marketing" },
              { icon: BarChart, title: "Live in Google News", description: "Get featured in Google News and other aggregators" }
            ].map((benefit, index) => (
              <Card key={index} className="border-orange-200 bg-white/80 backdrop-blur-sm hover:border-orange-300 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="flex items-center gap-4">
                    <div className="rounded-lg bg-orange-100 p-3">
                      <benefit.icon className="h-6 w-6 text-orange-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-slate-900">{benefit.title}</h3>
                      <p className="mt-1 text-sm text-slate-600">{benefit.description}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
                Your trusted partner for press release distribution
              </h2>
              <p className="mt-4 text-lg text-slate-600">
                Globalnewsdock connects businesses with media outlets worldwide, ensuring your news reaches the right audience at the right time. Our platform combines cutting-edge technology with industry expertise to deliver maximum impact for your announcements.
              </p>
              <p className="mt-4 text-lg text-slate-600">
                With years of experience in media distribution, we've built relationships with thousands of journalists, editors, and media outlets across various industries. Our comprehensive network ensures your press releases get the attention they deserve.
              </p>
              <div className="mt-8">
                <Button size="lg" className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg">
                  Get Started Today
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </div>
            </div>
            <div className="relative">
              <div className="aspect-video overflow-hidden rounded-2xl bg-gradient-to-br from-orange-100 to-amber-100">
                <div className="absolute inset-0 bg-[url('/placeholder-team.jpg')] bg-cover bg-center opacity-80" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 bg-gradient-to-b from-white to-orange-50/30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-slate-900">
              Our Services
            </h2>
            <p className="mt-4 text-lg text-slate-600">
              Comprehensive solutions for your press release needs
            </p>
          </div>
          
          <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: FileText, title: "PR Writing", description: "Professional press release writing services" },
              { icon: Globe, title: "Distribution", description: "Wide-reaching media distribution network" },
              { icon: Target, title: "Target Audience", description: "Precise audience targeting and segmentation" },
              { icon: TrendingUp, title: "Marketing", description: "Integrated marketing and promotion" }
            ].map((service, index) => (
              <Card key={index} className="border-orange-200 bg-white/80 backdrop-blur-sm text-center hover:border-orange-300 hover:shadow-md transition-all">
                <CardContent className="p-6">
                  <div className="mx-auto rounded-lg bg-orange-100 p-4 w-fit">
                    <service.icon className="h-8 w-8 text-orange-600" />
                  </div>
                  <h3 className="mt-4 text-lg font-semibold text-slate-900">{service.title}</h3>
                  <p className="mt-2 text-sm text-slate-600">{service.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Media Logos Section */}
      <section className="py-20 bg-gradient-to-b from-background to-muted/20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">
              Featured in major media outlets
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              Your press releases distributed to trusted media sources
            </p>
          </div>
          
          <div className="mt-12 grid grid-cols-2 gap-8 opacity-60 lg:grid-cols-6">
            {['Business Insider', 'Fox News', 'Google News', 'Reuters', 'Associated Press', 'Bloomberg'].map((outlet) => (
              <div key={outlet} className="flex items-center justify-center">
                <div className="text-center">
                  <div className="h-12 w-32 bg-gray-300 rounded flex items-center justify-center text-xs font-medium text-gray-600">
                    {outlet}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gradient-to-r from-orange-600 via-orange-500 to-orange-700">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl text-white">
              What our clients say
            </h2>
            <p className="mt-4 text-lg text-orange-100">
              Trusted by businesses worldwide
            </p>
          </div>
          
          <div className="mt-12 max-w-3xl mx-auto">
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm">
              <CardContent className="p-8 text-center">
                <Quote className="mx-auto h-12 w-12 text-brand-orange/20" />
                <p className="mt-4 text-lg italic text-muted-foreground">
                  "Globalnewsdock transformed our press release strategy. Our announcements now reach thousands of media outlets, resulting in significantly better coverage and brand visibility."
                </p>
                <div className="mt-6">
                  <div className="h-12 w-12 bg-gray-300 rounded-full mx-auto mb-4" />
                  <h4 className="font-semibold">Sarah Johnson</h4>
                  <p className="text-sm text-muted-foreground">Marketing Director, TechCorp</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-20 bg-gradient-to-b from-orange-50/50 to-white">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <Card className="border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 shadow-lg">
            <CardContent className="p-8 text-center">
              <Mail className="mx-auto h-12 w-12 text-orange-600" />
              <h3 className="mt-4 text-2xl font-bold text-slate-900">Stay updated with our latest features</h3>
              <p className="mt-2 text-slate-600">
                Get tips, insights, and exclusive offers delivered to your inbox
              </p>
              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
                <Input
                  type="email"
                  placeholder="Enter your email"
                  className="max-w-xs bg-white/80 border-orange-300 backdrop-blur-sm"
                />
                <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg">
                  Subscribe
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </div>
  )
}
