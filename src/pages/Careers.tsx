import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Mail } from "lucide-react";
import { Button } from "@/components/ui/button";

const Careers: FC = () => {
  const { t } = useTranslation();

  const contact = t('pages.careers.contact', { returnObjects: true }) as {
    title: string;
    message: string;
    email: string;
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.careers.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.careers.description')}
        </p>
      </div>

      {/* Contact Information */}
      <Card className="max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>{contact.title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <p className="text-lg text-muted-foreground">{contact.message}</p>
          <Button
            variant="outline"
            size="lg"
            className="gap-2"
            asChild
          >
            <a href={`mailto:${contact.email}`} className="w-full sm:w-auto">
              <Mail className="w-4 h-4" />
              {contact.email}
            </a>
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}

export default Careers;
