import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const News: FC = () => {
  const { t } = useTranslation();

  const newsItems = [
    {
      id: 1,
      date: '2024-02-15',
      category: 'プレスリリース',
      title: '新サービス「AI Workflow Optimizer」の提供を開始',
      description: '企業のワークフローを最適化するAIソリューション「AI Workflow Optimizer」の提供を開始しました。',
      link: '/news/ai-workflow-optimizer'
    },
    {
      id: 2,
      date: '2024-02-01',
      category: 'お知らせ',
      title: '東京本社オフィスを移転',
      description: '事業拡大に伴い、東京本社オフィスを移転いたしました。新オフィスでは、より充実した環境でサービスを提供してまいります。',
      link: '/news/office-relocation'
    },
    {
      id: 3,
      date: '2024-01-20',
      category: 'メディア掲載',
      title: '日経新聞に当社のAI活用事例が掲載',
      description: '日経新聞電子版に、当社のAI活用による業務改善事例が特集記事として掲載されました。',
      link: '/news/nikkei-feature'
    }
  ];

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
        <h1 className="text-4xl font-bold mb-6">ニュース</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PinkieTechの最新のニュースやお知らせをご覧いただけます。
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
                  続きを読む <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
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
