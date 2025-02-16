import { Footer } from '@/components/Footer'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import { MainNav } from '@/components/MainNav'
import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Outlet } from 'react-router-dom'

const RootLayout: FC = () => {
  const { t } = useTranslation()

  const navItems = [
    { href: '/', label: t('common.nav.home') },
    { href: '/about', label: t('common.nav.about') },
    { href: '/services', label: t('common.nav.services') },
    { href: '/works', label: t('common.nav.works') },
    { href: '/news', label: t('common.nav.news') },
    { href: '/careers', label: t('common.nav.careers') },
    { href: '/contact', label: t('common.nav.contact') },
    { href: '/blog', label: t('common.nav.blog') },
    { href: '/faq', label: t('common.nav.faq') },
    { href: '/legal', label: t('common.nav.legal') },
  ]

  return (
    <div className="relative min-h-screen">
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <MainNav items={navItems} />
            <LanguageSwitcher />
          </div>
        </div>
      </header>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  )
}

export default RootLayout
