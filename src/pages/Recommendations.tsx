
import React from 'react';
import { Sparkles } from 'lucide-react';
import { RecommendationCard } from '../components/RecommendationCard';
import { Game, GameStatus, getRecommendations } from '../utils/gameData';

interface RecommendationsProps {
  games: Game[];
  onAddToWishlist: (gameId: number) => void;
}

const Recommendations: React.FC<RecommendationsProps> = ({ games, onAddToWishlist }) => {
  const recommendations = getRecommendations(games);
  const finishedGames = games.filter(game => game.status === GameStatus.FINISHED);
  
  // Check if we can make recommendations (need finished games)
  const canRecommend = finishedGames.length > 0;
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Recommendations</h1>
        <p className="text-muted-foreground">
          Discover new games based on your gaming preferences and history.
        </p>
      </div>
      
      {canRecommend ? (
        <>
          <h2 className="section-title">
            <Sparkles className="h-5 w-5 text-primary" />
            <span>Recommended For You</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {recommendations.map(({ game, reason }) => (
              <RecommendationCard
                key={game.id}
                game={game}
                reason={reason}
                onAddToWishlist={onAddToWishlist}
              />
            ))}
          </div>
          
          <div className="glass-card rounded-lg p-6 mt-8">
            <h3 className="font-medium mb-2">How we make recommendations</h3>
            <p className="text-sm text-muted-foreground">
              Our recommendation engine analyzes your gaming history, preferences, and patterns
              to suggest titles you might enjoy. We consider factors like your favorite genres,
              platforms you own, games you've finished, and overall gaming trends.
            </p>
          </div>
        </>
      ) : (
        <div className="glass-card rounded-lg p-8 text-center flex flex-col items-center">
          <div className="h-16 w-16 rounded-full bg-primary/10 flex items-center justify-center mb-4">
            <Sparkles className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-medium mb-2">
            Finish games to get recommendations
          </h3>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Mark some games as finished in your library so we can understand your preferences
            and recommend games you'll love.
          </p>
        </div>
      )}
    </div>
  );
};

export default Recommendations;
