import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const About: FC = () => {
  const { t } = useTranslation();

  const companyInfo = [
    { key: 'name', value: 'PinkieTech株式会社' },
    { key: 'ceo', value: '渡部健太' },
    { key: 'established', value: '2025年1月17日' },
    { key: 'capital', value: '5,000,000円' },
    { key: 'employees', value: '3名' },
    { key: 'address', value: '福岡県北九州市八幡西区塔野1-14-22' }
  ];

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
              <p className="text-lg leading-relaxed">
                {t('pages.about.ceo_message.content')}
              </p>
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
            {companyInfo.map(({ key, value }) => (
              <div key={key} className="flex flex-col sm:flex-row sm:gap-4">
                <dt className="font-semibold min-w-[200px]">
                  {t(`pages.about.company_info.items.${key}`)}
                </dt>
                <Separator className="my-2 sm:hidden" />
                <dd className="text-muted-foreground">{value}</dd>
              </div>
            ))}
          </dl>
        </CardContent>
      </Card>
    </div>
  );
}

export default About;
