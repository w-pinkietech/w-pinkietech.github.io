import { type FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';

export const Footer: FC = () => {
    const { t } = useTranslation();

    const links = {
        services: [
            { href: '/services#ai-integration', label: t('common.footer.ai_integration') },
            { href: '/services#workflow', label: t('common.footer.workflow') },
            { href: '/services#consulting', label: t('common.footer.consulting') },
        ],
        company: [
            { href: '/about', label: t('common.footer.about') },
            { href: '/careers', label: t('common.footer.careers') },
            { href: '/contact', label: t('common.footer.contact') },
        ],
        legal: [
            { href: '/legal#privacy', label: t('common.footer.privacy') },
            { href: '/legal#terms', label: t('common.footer.terms') },
        ],
    };

    return (
        <footer className="border-t bg-background">
            <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 py-12">
                <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
                    <div>
                        <Link to="/" className="text-2xl font-bold">
                            PinkieTech
                        </Link>
                        <p className="mt-4 text-sm text-muted-foreground">
                            {t('common.footer.company_description')}
                        </p>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">
                            {t('common.footer.services')}
                        </h3>
                        <ul className="space-y-2">
                            {links.services.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">
                            {t('common.footer.company')}
                        </h3>
                        <ul className="space-y-2">
                            {links.company.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div>
                        <h3 className="mb-4 text-sm font-semibold">
                            {t('common.footer.legal')}
                        </h3>
                        <ul className="space-y-2">
                            {links.legal.map((link) => (
                                <li key={link.href}>
                                    <Link
                                        to={link.href}
                                        className="text-sm text-muted-foreground hover:text-primary"
                                    >
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t pt-8 text-center">
                    <p className="text-sm text-muted-foreground">
                        © 2024 PinkieTech. {t('common.footer.rights')}
                    </p>
                </div>
            </div>
        </footer>
    );
}; 