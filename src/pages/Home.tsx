import { type FC } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Workflow, Bot, ArrowRight, ChevronRight } from "lucide-react";
import { useTranslation } from "react-i18next";
import { Link } from 'react-router-dom';

const Home: FC = () => {
  const { t } = useTranslation();

  return (
    <>
      {/* Hero Section */}
      <section className="relative py-24 px-6">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/hero-ai.jpg" 
            alt="AI Business Transformation" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto text-center relative z-10">
          <h1 className="text-5xl font-bold mb-6">{t('pages.home.hero.title')}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('pages.home.hero.description')}
          </p>
          <Button size="lg" className="gap-2" asChild>
            <Link to="/contact">
              {t('pages.home.hero.cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('pages.home.services.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/ai-integration.jpg" 
                  alt="AI Integration" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <Brain className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('pages.home.services.ai_integration.title')}</CardTitle>
                <CardDescription>
                  {t('pages.home.services.ai_integration.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{t('pages.home.services.ai_integration.content')}</p>
                <Button variant="ghost" className="gap-2 group" asChild>
                  <Link to="/services#ai-integration">
                    Learn More <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/workflow.jpg" 
                  alt="Workflow Optimization" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <Workflow className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('pages.home.services.workflow.title')}</CardTitle>
                <CardDescription>
                  {t('pages.home.services.workflow.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{t('pages.home.services.workflow.content')}</p>
                <Button variant="ghost" className="gap-2 group" asChild>
                  <Link to="/services#workflow">
                    Learn More <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="overflow-hidden group">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/consulting.jpg" 
                  alt="AI Consulting" 
                  className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <CardHeader>
                <Bot className="w-12 h-12 text-primary mb-4" />
                <CardTitle>{t('pages.home.services.consulting.title')}</CardTitle>
                <CardDescription>
                  {t('pages.home.services.consulting.description')}
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <p>{t('pages.home.services.consulting.content')}</p>
                <Button variant="ghost" className="gap-2 group" asChild>
                  <Link to="/services#consulting">
                    Learn More <ChevronRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/cta-transform.jpg" 
            alt="Business Transformation" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">{t('pages.home.cta.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('pages.home.cta.description')}
          </p>
          <Button size="lg" variant="secondary" className="gap-2" asChild>
            <Link to="/contact">
              {t('pages.home.cta.button')} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export default Home;
