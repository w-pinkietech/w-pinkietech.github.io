import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent } from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const Works: FC = () => {
  const { t } = useTranslation();

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.works.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.works.description')}
        </p>
      </div>

      {/* No Case Studies Message */}
      <Card className="max-w-2xl mx-auto text-center">
        <CardContent className="py-12">
          <p className="text-lg text-muted-foreground">
            {t('pages.works.description')}
          </p>
          <Button asChild className="mt-6">
            <Link to="/contact" className="gap-2">
              {t('pages.home.hero.cta')} <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Works;
