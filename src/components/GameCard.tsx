
import React from 'react';
import { Link } from 'react-router-dom';
import { Clock, Check, X, Star, Heart } from 'lucide-react';
import { Game, GameStatus } from '../utils/gameData';

interface GameCardProps {
  game: Game;
  onStatusChange: (gameId: number, status: GameStatus) => void;
}

export const GameCard: React.FC<GameCardProps> = ({ game, onStatusChange }) => {
  const statusConfig = {
    [GameStatus.FINISHED]: {
      label: 'Finished',
      icon: Check,
      color: 'bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400',
    },
    [GameStatus.WISHLIST]: {
      label: 'Want to Play',
      icon: Clock, 
      color: 'bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400',
    },
    [GameStatus.DISLIKED]: {
      label: 'Not Interested',
      icon: X,
      color: 'bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400',
    },
  };
  
  const StatusIcon = game.status ? statusConfig[game.status].icon : null;
  
  return (
    <div className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md group animate-scale-in">
      <Link to={`/game/${game.id}`} className="block">
        <div className="relative aspect-[16/9] overflow-hidden">
          <img 
            src={game.imageUrl} 
            alt={game.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
          
          {game.releaseYear && (
            <div className="absolute top-2 left-2 status-chip bg-black/70 text-white text-xs">
              {game.releaseYear}
            </div>
          )}
          
          <div className="absolute top-2 right-2 flex space-x-1">
            {game.rating && (
              <div className="status-chip bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400 flex items-center gap-1">
                <Star className="h-3 w-3" /> 
                <span>{game.rating}</span>
              </div>
            )}
          </div>
        </div>
      </Link>
      
      <div className="p-4">
        <Link to={`/game/${game.id}`} className="block">
          <h3 className="font-medium text-lg truncate">{game.title}</h3>
          
          <div className="flex items-center mt-1 text-sm text-muted-foreground">
            <span>{game.genre}</span>
            {game.platform && (
              <>
                <span className="mx-1">•</span>
                <span>{game.platform}</span>
              </>
            )}
          </div>
        </Link>
        
        <div className="flex items-center justify-between mt-4">
          {game.status ? (
            <div className={`status-chip ${statusConfig[game.status].color} flex items-center gap-1`}>
              <StatusIcon className="h-3 w-3" />
              <span>{statusConfig[game.status].label}</span>
            </div>
          ) : (
            <div className="status-chip bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400 flex items-center gap-1">
              <span>Untracked</span>
            </div>
          )}
          
          <div className="flex space-x-1">
            <button 
              onClick={(e) => {
                e.preventDefault();
                onStatusChange(game.id, GameStatus.FINISHED);
              }}
              className={`btn-icon ${game.status === GameStatus.FINISHED ? 'text-green-600 bg-green-50 dark:text-green-400 dark:bg-green-900/20' : 'text-muted-foreground hover:text-green-600 hover:bg-green-50 dark:hover:text-green-400 dark:hover:bg-green-900/20'}`}
              aria-label="Mark as finished"
            >
              <Check className="h-4 w-4" />
            </button>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                onStatusChange(game.id, GameStatus.WISHLIST);
              }}
              className={`btn-icon ${game.status === GameStatus.WISHLIST ? 'text-blue-600 bg-blue-50 dark:text-blue-400 dark:bg-blue-900/20' : 'text-muted-foreground hover:text-blue-600 hover:bg-blue-50 dark:hover:text-blue-400 dark:hover:bg-blue-900/20'}`}
              aria-label="Add to wishlist"
            >
              <Clock className="h-4 w-4" />
            </button>
            
            <button 
              onClick={(e) => {
                e.preventDefault();
                onStatusChange(game.id, GameStatus.DISLIKED);
              }}
              className={`btn-icon ${game.status === GameStatus.DISLIKED ? 'text-red-600 bg-red-50 dark:text-red-400 dark:bg-red-900/20' : 'text-muted-foreground hover:text-red-600 hover:bg-red-50 dark:hover:text-red-400 dark:hover:bg-red-900/20'}`}
              aria-label="Mark as not interested"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
