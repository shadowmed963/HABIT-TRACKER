import { useLanguage } from "@/lib/language-context";
import LanguageSwitcher from "@/components/LanguageSwitcher";

export default function ExamplePage() {
  const { t } = useLanguage();

  return (
    <div className="p-8">
      <LanguageSwitcher />
      <h1 className="text-2xl font-bold mb-4">{t.hero.headline}</h1>
      <p className="mb-4">{t.hero.subheading}</p>
      <div className="space-y-2">
        <p>{t.hero.activeHabits}: 5</p>
        <p>{t.hero.dayTracked}: 12</p>
        <p>{t.hero.challengeStatus}: Active</p>
      </div>
    </div>
  );
}