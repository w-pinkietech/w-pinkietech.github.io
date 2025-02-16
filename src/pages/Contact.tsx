import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact: FC = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      title: t('pages.contact.info.email.title'),
      content: t('pages.contact.info.email.content'),
      href: `mailto:${t('pages.contact.info.email.content')}`
    },
    {
      icon: Phone,
      title: t('pages.contact.info.phone.title'),
      content: t('pages.contact.info.phone.content'),
      href: `tel:+81${t('pages.contact.info.phone.content').replace(/-/g, '')}`
    },
    {
      icon: MapPin,
      title: t('pages.contact.info.address.title'),
      content: t('pages.contact.info.address.content'),
      href: `https://maps.google.com/?q=${encodeURIComponent(t('pages.contact.info.address.content'))}`
    }
  ];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.contact.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.contact.description')}
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>{t('pages.contact.form.title')}</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  {t('pages.contact.form.name.label')}
                  <span className="text-red-500 ml-1">{t('pages.contact.form.required')}</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder={t('pages.contact.form.name.placeholder')}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  {t('pages.contact.form.email.label')}
                  <span className="text-red-500 ml-1">{t('pages.contact.form.required')}</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder={t('pages.contact.form.email.placeholder')}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  {t('pages.contact.form.company.label')}
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder={t('pages.contact.form.company.placeholder')}
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  {t('pages.contact.form.message.label')}
                  <span className="text-red-500 ml-1">{t('pages.contact.form.required')}</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder={t('pages.contact.form.message.placeholder')}
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full">
                {t('pages.contact.form.submit')}
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>{t('pages.contact.info.title')}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {contactInfo.map(({ icon: Icon, title, content, href }) => (
                <div key={title} className="flex items-start gap-4">
                  <div className="p-2 bg-primary/10 rounded-full">
                    <Icon className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="font-medium">{title}</h3>
                    <a
                      href={href}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {content}
                    </a>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Map */}
          <Card>
            <CardContent className="p-0">
              <iframe
                title="会社所在地"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.828030555938!2d139.76454725!3d35.6811773!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188bfbd89f700b%3A0x277c49ba34ed38!2z5aSn5omL55S6!5e0!3m2!1sja!2sjp!4v1644037858843!5m2!1sja!2sjp"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                className="rounded-lg"
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Contact;
