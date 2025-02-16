import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const FAQ: FC = () => {
  const { t } = useTranslation();

  const faqCategories = t('pages.faq.categories', { returnObjects: true }) as Array<{
    title: string;
    items: Array<{
      question: string;
      answer: string;
    }>;
  }>;

  return (
    <div className="container mx-auto px-6 py-12">
      {/* Hero Section */}
      <div className="text-center mb-16">
        <h1 className="text-4xl font-bold mb-6">{t('pages.faq.title')}</h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          {t('pages.faq.description')}
        </p>
      </div>

      {/* FAQ Categories */}
      <div className="grid gap-8">
        {faqCategories.map((category) => (
          <Card key={category.title}>
            <CardHeader>
              <CardTitle>{category.title}</CardTitle>
            </CardHeader>
            <CardContent>
              <Accordion type="single" collapsible className="w-full">
                {category.items.map((item, index) => (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger>{item.question}</AccordionTrigger>
                    <AccordionContent>{item.answer}</AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default FAQ;
