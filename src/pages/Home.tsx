import { type FC } from 'react';
import React from 'react';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card";
import { Brain, Workflow, Bot, ArrowRight } from "lucide-react";
import { useTranslation } from "react-i18next";

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
          <h1 className="text-5xl font-bold mb-6">{t('hero.title')}</h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('hero.description')}
          </p>
          <Button size="lg" className="gap-2">
            {t('hero.cta')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-16 bg-muted/50">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-bold text-center mb-12">{t('services.title')}</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/ai-integration.jpg" 
                  alt="AI Integration" 
                  className="w-full h-full object-cover"
                />
              </div>
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
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/workflow.jpg" 
                  alt="Workflow Optimization" 
                  className="w-full h-full object-cover"
                />
              </div>
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
            <Card className="overflow-hidden">
              <div className="h-48 overflow-hidden">
                <img 
                  src="/images/consulting.jpg" 
                  alt="AI Consulting" 
                  className="w-full h-full object-cover"
                />
              </div>
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
      <section className="relative py-24">
        <div className="absolute inset-0 z-0">
          <img 
            src="/images/cta-transform.jpg" 
            alt="Business Transformation" 
            className="w-full h-full object-cover opacity-20"
          />
        </div>
        <div className="container mx-auto px-6 text-center relative z-10">
          <h2 className="text-3xl font-bold mb-6">{t('cta.title')}</h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            {t('cta.description')}
          </p>
          <Button size="lg" variant="secondary" className="gap-2">
            {t('cta.button')} <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </section>
    </>
  );
}

export default Home;
