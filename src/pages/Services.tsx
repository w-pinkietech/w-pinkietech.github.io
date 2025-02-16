import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Brain, Workflow, Bot, ArrowRight } from "lucide-react";
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

const Services: FC = () => {
  const { t } = useTranslation();

  const services = [
    {
      id: 'ai-integration',
      icon: Brain,
      title: t('pages.home.services.ai_integration.title'),
      description: t('pages.home.services.ai_integration.description'),
      content: t('pages.home.services.ai_integration.content'),
      image: '/images/ai-integration.jpg'
    },
    {
      id: 'workflow',
      icon: Workflow,
      title: t('pages.home.services.workflow.title'),
      description: t('pages.home.services.workflow.description'),
      content: t('pages.home.services.workflow.content'),
      image: '/images/workflow.jpg'
    },
    {
      id: 'consulting',
      icon: Bot,
      title: t('pages.home.services.consulting.title'),
      description: t('pages.home.services.consulting.description'),
      content: t('pages.home.services.consulting.content'),
      image: '/images/consulting.jpg'
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.home.services.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('common.footer.company_description')}
        </p>
      </div>

      {/* Services List */}
      <div className="space-y-16">
        {services.map(({ id, icon: Icon, title, description, content, image }) => (
          <div key={id} id={id} className="scroll-mt-24">
            <Card className="overflow-hidden">
              <div className="grid md:grid-cols-2 gap-8">
                <div className="order-2 md:order-1 p-8">
                  <CardHeader className="px-0">
                    <div className="flex items-center gap-4 mb-4">
                      <Icon className="w-12 h-12 text-primary" />
                      <CardTitle className="text-2xl">{title}</CardTitle>
                    </div>
                    <p className="text-lg text-muted-foreground">{description}</p>
                  </CardHeader>
                  <CardContent className="px-0 space-y-6">
                    <p className="text-lg">{content}</p>
                    <Button asChild>
                      <Link to="/contact" className="gap-2">
                        {t('pages.home.hero.cta')} <ArrowRight className="w-4 h-4" />
                      </Link>
                    </Button>
                  </CardContent>
                </div>
                <div className="order-1 md:order-2">
                  <img
                    src={image}
                    alt={title}
                    className="w-full h-full object-cover aspect-video md:aspect-auto"
                  />
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Services;
