import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Heart, Sparkles } from "lucide-react";
import { Link } from 'react-router-dom';

const Careers: FC = () => {
  const { t } = useTranslation();

  const positions = [
    {
      id: 1,
      title: "AIエンジニア",
      department: "エンジニアリング",
      type: "正社員",
      location: "東京",
      description: "AIソリューションの設計・開発・実装を担当していただきます。機械学習、深層学習の実務経験がある方を募集しています。",
      requirements: [
        "機械学習・深層学習の実務経験3年以上",
        "Python, PyTorchまたはTensorFlowの実務経験",
        "英語でのコミュニケーション能力（読み書き）"
      ]
    },
    {
      id: 2,
      title: "フロントエンドエンジニア",
      department: "エンジニアリング",
      type: "正社員",
      location: "東京/リモート",
      description: "最新のフロントエンド技術を活用し、ユーザー体験の高いWebアプリケーションの開発を担当していただきます。",
      requirements: [
        "React/TypeScriptの実務経験2年以上",
        "モダンなフロントエンド開発経験",
        "UIライブラリの使用経験"
      ]
    }
  ];

  const benefits = [
    {
      icon: Users,
      title: "フレックスタイム制",
      description: "コアタイムなしのフレックスタイム制を採用。ワークライフバランスを重視した働き方が可能です。"
    },
    {
      icon: Heart,
      title: "充実した福利厚生",
      description: "各種社会保険、健康診断、社員旅行、書籍購入補助など、充実した福利厚生を用意しています。"
    },
    {
      icon: Sparkles,
      title: "成長支援制度",
      description: "資格取得支援、カンファレンス参加費用補助、社内勉強会など、社員の成長をサポートします。"
    }
  ];

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">採用情報</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          PinkieTechは、AIの力でビジネスの未来を創造する仲間を募集しています。
          私たちと一緒に、革新的なソリューションを作り上げませんか？
        </p>
      </div>

      {/* Benefits Section */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-center mb-12">働く環境</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {benefits.map(({ icon: Icon, title, description }, index) => (
            <Card key={index} className="text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-primary/10 rounded-full w-fit">
                  <Icon className="w-8 h-8 text-primary" />
                </div>
                <CardTitle>{title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Open Positions */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-12">募集ポジション</h2>
        <div className="grid gap-6">
          {positions.map((position) => (
            <Card key={position.id} className="group">
              <CardHeader>
                <div className="flex flex-wrap items-center gap-4 mb-4">
                  <Badge variant="secondary">{position.department}</Badge>
                  <Badge variant="outline">{position.type}</Badge>
                  <Badge>{position.location}</Badge>
                </div>
                <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                <p className="text-muted-foreground">{position.description}</p>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="font-semibold mb-2">必要なスキル・経験</h3>
                  <ul className="list-disc list-inside space-y-1 text-muted-foreground">
                    {position.requirements.map((req, idx) => (
                      <li key={idx}>{req}</li>
                    ))}
                  </ul>
                </div>
                <Button asChild>
                  <Link to={`/careers/${position.id}`} className="gap-2">
                    詳細を見る <ArrowRight className="w-4 h-4" />
                  </Link>
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>
    </div>
  );
}

export default Careers;
