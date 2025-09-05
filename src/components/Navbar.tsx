
import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { LayoutGrid, Library, Sparkles, BarChart2, Search, X } from 'lucide-react';
import { ThemeToggle } from './ThemeToggle';
import { Game, GameStatus } from '../utils/gameData';

interface NavbarProps {
  games: Game[];
  onStatusChange: (gameId: number, status: GameStatus) => void;
}

export const Navbar: React.FC<NavbarProps> = ({ games, onStatusChange }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  
  const navItems = [
    { path: '/', label: 'Dashboard', icon: LayoutGrid },
    { path: '/library', label: 'Library', icon: Library },
    { path: '/recommendations', label: 'Recommendations', icon: Sparkles },
    { path: '/statistics', label: 'Statistics', icon: BarChart2 },
  ];

  // Filter games based on search query
  const searchResults = searchQuery.trim() 
    ? games.filter(game => 
        game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.genre.toLowerCase().includes(searchQuery.toLowerCase()) ||
        game.platform.toLowerCase().includes(searchQuery.toLowerCase())
      ).slice(0, 8) // Limit to 8 results
    : [];

  // Handle search result click
  const handleSearchResultClick = (gameId: number) => {
    navigate(`/game/${gameId}`);
    setSearchQuery('');
    setShowSearchResults(false);
  };

  // Handle click outside to close search results
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);
  
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center">
        <div className="mr-8">
          <Link to="/" className="flex items-center gap-2">
            <span className="text-xl font-medium">GameTrack</span>
          </Link>
        </div>
        
        <nav className="hidden md:flex flex-1 items-center gap-6 text-sm">
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
        
        {/* Search Bar */}
        <div className="relative flex-1 max-w-sm mx-4" ref={searchRef}>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="w-full pl-10 pr-10 py-2 bg-background border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent focus:outline-none transition-all"
              placeholder="Search games..."
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setShowSearchResults(e.target.value.trim().length > 0);
              }}
              onFocus={() => searchQuery.trim().length > 0 && setShowSearchResults(true)}
            />
            {searchQuery && (
              <button
                onClick={() => {
                  setSearchQuery('');
                  setShowSearchResults(false);
                }}
                className="absolute inset-y-0 right-0 flex items-center pr-3 text-muted-foreground hover:text-foreground transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          
          {/* Search Results Dropdown */}
          {showSearchResults && searchResults.length > 0 && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-border rounded-md shadow-lg z-50 max-h-80 overflow-y-auto">
              {searchResults.map((game) => (
                <button
                  key={game.id}
                  onClick={() => handleSearchResultClick(game.id)}
                  className="w-full px-4 py-3 text-left hover:bg-accent transition-colors border-b border-border last:border-b-0"
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground">{game.title}</p>
                      <p className="text-sm text-muted-foreground">{game.genre} • {game.platform}</p>
                    </div>
                    {game.status && (
                      <span className="text-xs px-2 py-1 bg-primary/10 text-primary rounded">
                        {game.status === GameStatus.FINISHED && 'Finished'}
                        {game.status === GameStatus.WISHLIST && 'Wishlist'}
                        {game.status === GameStatus.DISLIKED && 'Not Interested'}
                      </span>
                    )}
                  </div>
                </button>
              ))}
              {searchQuery.trim() && searchResults.length === 0 && (
                <div className="px-4 py-3 text-center text-muted-foreground">
                  No games found for "{searchQuery}"
                </div>
              )}
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
};
