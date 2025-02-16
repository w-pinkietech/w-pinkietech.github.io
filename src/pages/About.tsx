import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About: FC = () => {
  const { t } = useTranslation();

  const companyInfo = t('pages.about.company_info.items', { returnObjects: true }) as {
    [key: string]: {
      label: string;
      value: string;
    };
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.about.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.about.description')}
        </p>
      </div>

      {/* CEO Message */}
      <Card className="mb-16">
        <CardHeader>
          <CardTitle>{t('pages.about.ceo_message.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-8 items-center">
            <div className="md:col-span-1">
              <img
                src="/images/ceo.jpg"
                alt="CEO"
                className="rounded-lg w-full aspect-square object-cover"
              />
            </div>
            <div className="md:col-span-2">
              <div className="space-y-4">
                <p className="text-lg leading-relaxed">
                  {t('pages.about.ceo_message.content')}
                </p>
                <div className="flex items-center gap-4">
                  <span className="font-medium">CEO</span>
                  <a
                    href="https://twitter.com/wataken215"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:underline inline-flex items-center gap-2"
                  >
                    <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
                    </svg>
                    @wataken215
                  </a>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Company Information */}
      <Card>
        <CardHeader>
          <CardTitle>{t('pages.about.company_info.title')}</CardTitle>
        </CardHeader>
        <CardContent>
          <dl className="space-y-4">
            {Object.entries(companyInfo).map(([key, item]) => (
              <div key={key} className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold min-w-[200px]">
                  {item.label}
                </dt>
                <Separator className="my-2 sm:hidden" />
                <dd className="text-muted-foreground">{item.value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

export default About;
