import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useTranslation } from "react-i18next";

const languages = [
  { code: 'ja', name: '日本語' },
  { code: 'en', name: 'English' },
  { code: 'zh', name: '中文' },
  { code: 'ko', name: '한국어' },
  { code: 'ar', name: 'العربية' }
];

export function LanguageSwitcher() {
  const { i18n } = useTranslation();

  return (
    <div>
      <Select
        value={i18n.language}
        onValueChange={(value) => {
          i18n.changeLanguage(value);
          window.location.reload();
        }}
      >
        <SelectTrigger className="w-[120px]" aria-label="Select language">
          <SelectValue>
            {languages.find(lang => lang.code === i18n.language)?.name || '日本語'}
          </SelectValue>
        </SelectTrigger>
        <SelectContent>
          {languages.map((lang) => (
            <SelectItem key={lang.code} value={lang.code}>
              {lang.name}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
