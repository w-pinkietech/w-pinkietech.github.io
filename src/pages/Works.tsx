import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';

const Works: FC = () => {
  const { t } = useTranslation();

  const caseStudies = [
    {
      title: "製造業のAI品質管理システム",
      company: "大手製造メーカー",
      tags: ["AI Integration", "Workflow Optimization"],
      description: "AIを活用した品質管理システムの導入により、不良品検出率が98%向上し、作業効率が30%改善されました。",
      image: "/images/ai-integration.jpg",
      results: [
        "不良品検出率98%向上",
        "作業効率30%改善",
        "年間コスト20%削減"
      ]
    },
    {
      title: "金融機関の業務自動化",
      company: "大手銀行",
      tags: ["Workflow Optimization", "AI Consulting"],
      description: "RPAとAIを組み合わせた業務自動化により、処理時間を75%削減し、人的ミスを90%削減しました。",
      image: "/images/workflow.jpg",
      results: [
        "処理時間75%削減",
        "人的ミス90%削減",
        "顧客満足度15%向上"
      ]
    },
    {
      title: "小売業の需要予測システム",
      company: "全国チェーンストア",
      tags: ["AI Integration", "AI Consulting"],
      description: "機械学習を活用した需要予測システムにより、在庫管理を最適化し、廃棄ロスを60%削減しました。",
      image: "/images/consulting.jpg",
      results: [
        "廃棄ロス60%削減",
        "在庫回転率25%向上",
        "発注業務時間50%削減"
      ]
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">導入事例</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PinkieTechのAIソリューションが、お客様のビジネスにもたらした具体的な成果をご紹介します。
        </p>
      </div>

      {/* Case Studies */}
      <div className="grid gap-8">
        {caseStudies.map((study, index) => (
          <Card key={index} className="overflow-hidden">
            <div className="grid md:grid-cols-2 gap-8">
              <div className="p-8">
                <CardHeader className="px-0">
                  <div className="space-y-4">
                    <div className="flex gap-2 flex-wrap">
                      {study.tags.map((tag) => (
                        <Badge key={tag} variant="secondary">{tag}</Badge>
                      ))}
                    </div>
                    <CardTitle className="text-2xl">{study.title}</CardTitle>
                    <p className="text-muted-foreground">{study.company}</p>
                  </div>
                </CardHeader>
                <CardContent className="px-0 space-y-6">
                  <p className="text-lg">{study.description}</p>
                  <div className="space-y-2">
                    <h3 className="font-semibold">導入効果</h3>
                    <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                      {study.results.map((result, idx) => (
                        <li key={idx}>{result}</li>
                      ))}
                    </ul>
                  </div>
                  <Button asChild>
                    <Link to="/contact" className="gap-2">
                      お問い合わせ <ArrowRight className="w-4 h-4" />
                    </Link>
                  </Button>
                </CardContent>
              </div>
              <div className="order-first md:order-last">
                <img
                  src={study.image}
                  alt={study.title}
                  className="w-full h-full object-cover aspect-video md:aspect-auto"
                />
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Works;
