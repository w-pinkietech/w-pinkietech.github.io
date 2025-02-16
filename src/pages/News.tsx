import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const News: FC = () => {
  const { t } = useTranslation();

  const newsItems = t('pages.news.items', { returnObjects: true }) as Array<{
    id: number;
    date: string;
    category: string;
    title: string;
    description: string;
    link: string;
  }>;

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('ja-JP', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    }).format(date);
  };

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.news.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.news.description')}
        </p>
      </div>

      {/* News List */}
      <div className="grid gap-6">
        {newsItems.map((item) => (
          <Card key={item.id} className="group">
            <CardHeader>
              <div className="flex items-center gap-4 mb-2">
                <time className="text-sm text-muted-foreground">
                  {formatDate(item.date)}
                </time>
                <Badge variant="secondary">{item.category}</Badge>
              </div>
              <CardTitle className="text-2xl group-hover:text-primary transition-colors">
                <Link to={item.link}>{item.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{item.description}</p>
              <Button variant="ghost" className="gap-2 group" asChild>
                <Link to={item.link}>
                  {t('pages.news.read_more')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default News;
