import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { Link } from 'react-router-dom'
import { Github, Twitter, Linkedin, Mail } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Separator } from '@/components/ui/separator'

const Footer: FC = () => {
  const { t } = useTranslation()

  const socialLinks = [
    { icon: Github, href: 'https://github.com/w-pinkietech', label: 'GitHub' },
    { icon: Twitter, href: 'https://twitter.com/pinkietech', label: 'Twitter' },
    { icon: Linkedin, href: 'https://linkedin.com/company/pinkietech', label: 'LinkedIn' },
    { icon: Mail, href: 'mailto:contact@pinkie-tech.jp', label: 'Email' }
  ]

  const sections = [
    {
      title: t('common.footer.services'),
      links: [
        { href: '/services#ai-integration', label: t('common.footer.ai_integration') },
        { href: '/services#workflow', label: t('common.footer.workflow') },
        { href: '/services#consulting', label: t('common.footer.consulting') }
      ]
    },
    {
      title: t('common.footer.company'),
      links: [
        { href: '/about', label: t('common.footer.about') },
        { href: '/careers', label: t('common.footer.careers') },
        { href: '/contact', label: t('common.footer.contact') }
      ]
    },
    {
      title: t('common.footer.legal'),
      links: [
        { href: '/legal#privacy', label: t('common.footer.privacy') },
        { href: '/legal#terms', label: t('common.footer.terms') }
      ]
    }
  ]

  return (
    <footer className="bg-muted/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="md:col-span-1">
            <Link to="/" className="inline-block">
              <h3 className="font-bold text-xl mb-4">PinkieTech</h3>
            </Link>
            <p className="text-sm text-muted-foreground mb-6">{t('common.footer.company_description')}</p>
            <div className="flex gap-4">
              {socialLinks.map(({ icon: Icon, href, label }) => (
                <Button
                  key={href}
                  variant="ghost"
                  size="icon"
                  asChild
                  className="hover:text-primary"
                  aria-label={label}
                >
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    <Icon className="h-5 w-5" />
                  </a>
                </Button>
              ))}
            </div>
          </div>
          <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-8">
            {sections.map(({ title, links }) => (
              <div key={title}>
                <h4 className="font-semibold mb-4">{title}</h4>
                <ul className="space-y-2">
                  {links.map(({ href, label }) => (
                    <li key={href}>
                      <Link to={href} className="text-sm hover:text-primary transition-colors">
                        {label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
        <Separator className="my-8" />
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 text-sm text-muted-foreground">
          <p>© {new Date().getFullYear()} PinkieTech. {t('common.footer.rights')}</p>
          <nav className="flex gap-8">
            <Link to="/sitemap" className="hover:text-primary transition-colors">Sitemap</Link>
            <Link to="/faq" className="hover:text-primary transition-colors">{t('common.nav.faq')}</Link>
            <Link to="/blog" className="hover:text-primary transition-colors">{t('common.nav.blog')}</Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}

export default Footer
