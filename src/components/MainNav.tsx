import { type FC } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface MainNavProps {
  items: {
    href: string;
    label: string;
  }[];
}

export const MainNav: FC<MainNavProps> = ({ items }) => {
  const location = useLocation();

  return (
    <div className="flex gap-6 md:gap-10">
      <Link to="/" className="flex items-center space-x-2">
        <span className="inline-block font-bold">PinkieTech</span>
      </Link>
      <nav className="hidden md:flex gap-6">
        {items.map((item) => (
          <Link
            key={item.href}
            to={item.href}
            className={cn(
              'flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary',
              location.pathname === item.href && 'text-foreground'
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}; 