import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';

const Careers: FC = () => {
  const { t } = useTranslation();

  const positions = t('pages.careers.positions.items', { returnObjects: true }) as Array<{
    id: number;
    title: string;
    department: string;
    type: string;
    location: string;
    description: string;
    requirements: string[];
  }>;

  const benefitIcons = [Users, Heart, Sparkles];
  const benefits = t('pages.careers.benefits.items', { returnObjects: true }) as Array<{
    title: string;
    description: string;
  }>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.careers.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.careers.description')}
        </p>
      </div>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">{t('pages.careers.benefits.title')}</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map(({ title, description }, index) => {
            const Icon = benefitIcons[index];
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">{t('pages.careers.positions.title')}</h2>
        <div className="grid gap-6">
          {positions.map((position) => (
            <Card key={position.id} className="group">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge variant="secondary">{position.department}</Badge>
                  <Badge variant="outline">{position.type}</Badge>
                  <Badge>{position.location}</Badge>
                </div>
                <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                <p className="text-muted-foreground">{position.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">{t('pages.careers.positions.requirements_title')}</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {position.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild>
                  <Link to={`/careers/${position.id}`} className="gap-2">
                    {t('pages.careers.positions.view_details')} <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Careers;
