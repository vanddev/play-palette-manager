
import React from 'react';
import { Clock, ThumbsUp } from 'lucide-react';
import { Game, GameStatus } from '../utils/gameData';

interface RecommendationCardProps {
  game: Game;
  reason: string;
  onAddToWishlist: (gameId: number) => void;
}

export const RecommendationCard: React.FC<RecommendationCardProps> = ({
  game,
  reason,
  onAddToWishlist,
}) => {
  return (
    <div className="glass-card rounded-lg overflow-hidden transition-all duration-300 hover:shadow-md animate-slide-in">
      <div className="relative aspect-video overflow-hidden">
        <img
          src={game.imageUrl}
          alt={game.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        
        <div className="absolute bottom-0 left-0 w-full p-4">
          <h3 className="font-medium text-lg text-white">{game.title}</h3>
          <div className="flex items-center gap-2 mt-1 text-sm text-white/80">
            <span>{game.genre}</span>
            {game.platform && (
              <>
                <span>•</span>
                <span>{game.platform}</span>
              </>
            )}
          </div>
        </div>
      </div>
      
      <div className="p-4">
        <div className="mb-3 flex items-start gap-2">
          <ThumbsUp className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
          <p className="text-sm text-muted-foreground">{reason}</p>
        </div>
        
        <button
          onClick={() => onAddToWishlist(game.id)}
          className="w-full flex items-center justify-center gap-2 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground px-4 py-2 text-sm font-medium transition-colors"
        >
          <Clock className="h-4 w-4" />
          <span>Add to Wishlist</span>
        </button>
      </div>
    </div>
  );
};
