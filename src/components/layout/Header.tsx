import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet'
import { Menu, X } from 'lucide-react'
import { type FC, useState } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { LanguageSwitcher } from '../LanguageSwitcher'

const Header: FC = () => {
  const { t } = useTranslation()
  const [isOpen, setIsOpen] = useState(false)

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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold">PinkieTech</Link>
            <nav className="hidden md:flex items-center gap-6">
              {navItems.map(({ href, label }) => (
                <Link
                  key={href}
                  to={href}
                  className="text-sm font-medium transition-colors hover:text-primary"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild className="md:hidden">
                <Button variant="ghost" size="icon">
                  {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <nav className="flex flex-col gap-4">
                  {navItems.map(({ href, label }) => (
                    <Link
                      key={href}
                      to={href}
                      className="text-lg font-medium transition-colors hover:text-primary"
                      onClick={() => setIsOpen(false)}
                    >
                      {label}
                    </Link>
                  ))}
                </nav>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
