import { type FC } from 'react'
import { useTranslation } from 'react-i18next'

const Footer: FC = () => {
  const { t } = useTranslation()

  return (
    <footer className="bg-muted/50 mt-auto">
      <div className="container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="font-bold mb-4">PinkieTech</h3>
            <p className="text-sm text-muted-foreground">{t('common.footer.company_description')}</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('common.footer.services')}</h4>
            <ul className="space-y-2">
              <li><a href="/services/ai-integration" className="text-sm hover:text-primary">{t('common.footer.ai_integration')}</a></li>
              <li><a href="/services/workflow" className="text-sm hover:text-primary">{t('common.footer.workflow')}</a></li>
              <li><a href="/services/consulting" className="text-sm hover:text-primary">{t('common.footer.consulting')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('common.footer.company')}</h4>
            <ul className="space-y-2">
              <li><a href="/about" className="text-sm hover:text-primary">{t('common.footer.about')}</a></li>
              <li><a href="/careers" className="text-sm hover:text-primary">{t('common.footer.careers')}</a></li>
              <li><a href="/contact" className="text-sm hover:text-primary">{t('common.footer.contact')}</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4">{t('common.footer.legal')}</h4>
            <ul className="space-y-2">
              <li><a href="/privacy" className="text-sm hover:text-primary">{t('common.footer.privacy')}</a></li>
              <li><a href="/terms" className="text-sm hover:text-primary">{t('common.footer.terms')}</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          © {new Date().getFullYear()} PinkieTech. {t('common.footer.rights')}
        </div>
      </div>
    </footer>
  )
}

export default Footer
