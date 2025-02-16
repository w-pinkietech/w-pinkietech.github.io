import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Link } from 'react-router-dom';

const Legal: FC = () => {
  const { t } = useTranslation();

  const sections = t('pages.legal.sections', { returnObjects: true }) as Array<{
    id: string;
    title: string;
    content: Array<{
      subtitle: string;
      text: string;
    }>;
  }>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.legal.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.legal.description')}
        </p>
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-4 justify-center mb-12">
        {sections.map((section) => (
          <Link
            key={section.id}
            to={`#${section.id}`}
            className="text-primary hover:underline"
          >
            {section.title}
          </Link>
        ))}
      </div>

      {/* Legal Sections */}
      <div className="space-y-12">
        {sections.map((section) => (
          <Card key={section.id} id={section.id} className="scroll-mt-24">
            <CardHeader>
              <CardTitle className="text-2xl">{section.title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              {section.content.map((item, index) => (
                <div key={index} className="space-y-4">
                  <h3 className="text-lg font-semibold">{item.subtitle}</h3>
                  <p className="text-muted-foreground whitespace-pre-line">
                    {item.text}
                  </p>
                  {index < section.content.length - 1 && (
                    <Separator className="my-4" />
                  )}
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Last Updated */}
      <p className="text-sm text-muted-foreground text-center mt-12">
        {t('pages.legal.last_updated')}
      </p>
    </div>
  );
}

export default Legal;
