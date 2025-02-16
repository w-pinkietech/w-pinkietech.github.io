import { Mail, MapPin, Phone } from "lucide-react";
import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from "../components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card";
import { Input } from "../components/ui/input";
import { Textarea } from "../components/ui/textarea";

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
      href: `https://maps.google.com/?q=${encodeURIComponent('福岡県北九州市八幡西区塔野1-14-22')}`
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
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3314.538241511479!2d130.73536311154467!3d33.82422747313201!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3543cef36e446151%3A0x4f8fcc8b78eb19f7!2s1-ch%C5%8Dme-14-22%20T%C5%8Dno%2C%20Yahatanishi%20Ward%2C%20Kitakyushu%2C%20Fukuoka%20807-0085%2C%20Japan!5e0!3m2!1sen!2ssg!4v1739725201107!5m2!1sen!2ssg"
                width="100%"
                height="300"
                style={{ border: 0 }}
                loading="lazy"
                className="rounded-lg"
                referrerPolicy="no-referrer-when-downgrade"
                allowFullScreen
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}

export default Contact;
