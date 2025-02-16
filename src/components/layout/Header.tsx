import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { LanguageSwitcher } from '../LanguageSwitcher'

const Header: FC = () => {
  const { t } = useTranslation()

  return (
    <header className="border-b">
      <div className="container mx-auto px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <a href="/" className="text-xl font-bold">PinkieTech</a>
          <nav className="hidden md:flex items-center gap-6">
            <a href="/about" className="text-sm hover:text-primary">{t('common.nav.about')}</a>
            <a href="/services" className="text-sm hover:text-primary">{t('common.nav.services')}</a>
            <a href="/works" className="text-sm hover:text-primary">{t('common.nav.works')}</a>
            <a href="/news" className="text-sm hover:text-primary">{t('common.nav.news')}</a>
            <a href="/careers" className="text-sm hover:text-primary">{t('common.nav.careers')}</a>
            <a href="/contact" className="text-sm hover:text-primary">{t('common.nav.contact')}</a>
          </nav>
        </div>
        <LanguageSwitcher />
      </div>
    </header>
  )
}

export default Header
