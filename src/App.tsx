import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Workflow, Bot, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { LanguageSwitcher } from "./components/LanguageSwitcher";

export default function App() {
  const { t, i18n } = useTranslation();
  const isRTL = i18n.language === 'ar';

  return (
    <div className={`min-h-screen bg-background ${isRTL ? 'rtl' : 'ltr'}`} dir={isRTL ? 'rtl' : 'ltr'}>
      <LanguageSwitcher />
      {/* Hero Section */}
      <section className="py-24 px-6 container mx-auto text-center">
        <h1 className="text-5xl font-bold mb-6">{t('hero.title')}</h1>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('hero.description')}
        </p>
        <Button size="lg" className="gap-2">
          {t('hero.cta')} <ArrowRight className="w-4 h-4" />
        </Button>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('services.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card>
              <CardHeader>
                <Brain className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('services.ai_integration.title')}</CardTitle>
                <CardDescription>
                  {t('services.ai_integration.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {t('services.ai_integration.content')}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Workflow className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('services.workflow.title')}</CardTitle>
                <CardDescription>
                  {t('services.workflow.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {t('services.workflow.content')}
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <Bot className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('services.consulting.title')}</CardTitle>
                <CardDescription>
                  {t('services.consulting.description')}
                </CardDescription>
              </CardHeader>
              <CardContent>
                {t('services.consulting.content')}
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 container mx-auto px-6 text-center">
        <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
        <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
          {t('cta.description')}
        </p>
        <Button size="lg" variant="secondary" className="gap-2">
          {t('cta.button')} <ArrowRight className="w-4 h-4" />
        </Button>
      </section>
    </div>
  );
}
