import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar, User } from "lucide-react";
import { Link } from 'react-router-dom';

const Blog: FC = () => {
  const { t } = useTranslation();

  const blogPosts = t('pages.blog.posts', { returnObjects: true }) as Array<{
    id: number;
    title: string;
    excerpt: string;
    category: string;
    author: string;
    date: string;
    image: string;
    slug: string;
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
        <h1 className="text-4xl font-bold mb-6">{t('pages.blog.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.blog.description')}
        </p>
      </div>

      {/* Blog Posts */}
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {blogPosts.map((post) => (
          <Card key={post.id} className="group">
            <div className="aspect-video overflow-hidden">
              <img
                src={post.image}
                alt={post.title}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <CardHeader>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="secondary">{post.category}</Badge>
              </div>
              <CardTitle className="group-hover:text-primary transition-colors">
                <Link to={`/blog/${post.slug}`}>{post.title}</Link>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">{post.excerpt}</p>
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <User className="w-4 h-4" />
                  {post.author}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4" />
                  {formatDate(post.date)}
                </div>
              </div>
              <Button variant="ghost" className="w-full gap-2 group" asChild>
                <Link to={`/blog/${post.slug}`}>
                  {t('pages.blog.read_more')} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default Blog;
