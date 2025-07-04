
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { LayoutGrid, Library, Sparkles, BarChart2 } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';

export const Navbar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutGrid },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/recommendations', label: 'Recommendations', icon: Sparkles },
    { path: '/statistics', label: 'Statistics', icon: BarChart2 },
  ];
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-medium">GameTrack</span>
          </Link>
        </div>
        
        <nav className="flex flex-1 items-center gap-6 text-sm">
          {navItems.map((item) => {
            const isActive = location.pathname === item.path;
            const Icon = item.icon;
            
            return (
              <Link
                key={item.path}
                to={item.path}
                className={`relative flex items-center gap-2 transition-colors px-3 py-2 rounded-md ${
                  isActive
                    ? 'text-primary font-medium'
                    : 'text-muted-foreground hover:text-foreground'
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{item.label}</span>
                {isActive && (
                  <span className="absolute -bottom-[1px] left-0 right-0 h-[2px] bg-primary rounded-full" />
                )}
              </Link>
            );
          })}
        </nav>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
