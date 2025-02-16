import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const Works: FC = () => {
  const { t } = useTranslation();

  const caseStudies = t('pages.works.case_studies', { returnObjects: true }) as Array<{
    title: string;
    company: string;
    tags: string[];
    description: string;
    results: string[];
  }>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.works.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.works.description')}
        </p>
      </div>

      {/* Case Studies */}
      <div className="grid gap-8">
        {caseStudies.map((study, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8">
                <CardHeader className="px-0">
                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl">{study.title}</CardTitle>
                    <p className="text-muted-foreground">{study.company}</p>
                  </div>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <p className="text-lg">{study.description}</p>
                  <div className="space-y-2">
                    <h3 className="font-semibold">{t('pages.works.results_title')}</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {study.results.map((result, idx) => (
                        <li key={idx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild>
                    <Link to="/contact" className="gap-2">
                      {t('pages.home.hero.cta')} <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
              <div className="order-first md:order-last">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover aspect-video md:aspect-auto"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Works;
