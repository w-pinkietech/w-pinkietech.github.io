import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Phone, MapPin } from "lucide-react";

const Contact: FC = () => {
  const { t } = useTranslation();

  const contactInfo = [
    {
      icon: Mail,
      title: "メールアドレス",
      content: "contact@pinkie-tech.jp",
      href: "mailto:contact@pinkie-tech.jp"
    },
    {
      icon: Phone,
      title: "電話番号",
      content: "03-1234-5678",
      href: "tel:+81312345678"
    },
    {
      icon: MapPin,
      title: "所在地",
      content: "〒100-0004 東京都千代田区大手町1-1-1",
      href: "https://maps.google.com/?q=東京都千代田区大手町1-1-1"
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
        <h1 className="text-4xl font-bold mb-6">お問い合わせ</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PinkieTechに関するお問い合わせは、以下のフォームまたは各種連絡先よりお願いいたします。
        </p>
      </div>

      <div className="grid lg:grid-cols-2 gap-12">
        {/* Contact Form */}
        <Card>
          <CardHeader>
            <CardTitle>お問い合わせフォーム</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="space-y-2">
                <label htmlFor="name" className="text-sm font-medium">
                  お名前
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  id="name"
                  name="name"
                  required
                  placeholder="山田 太郎"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="email" className="text-sm font-medium">
                  メールアドレス
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  required
                  placeholder="example@email.com"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="company" className="text-sm font-medium">
                  会社名
                </label>
                <Input
                  id="company"
                  name="company"
                  placeholder="株式会社〇〇"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="message" className="text-sm font-medium">
                  お問い合わせ内容
                  <span className="text-red-500 ml-1">*</span>
                </label>
                <Textarea
                  id="message"
                  name="message"
                  required
                  placeholder="お問い合わせ内容をご記入ください"
                  className="min-h-[150px]"
                />
              </div>

              <Button type="submit" className="w-full">
                送信する
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Contact Information */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>お問い合わせ先</CardTitle>
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
