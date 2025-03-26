
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  ArrowRight, 
  Gamepad, 
  Clock, 
  Check, 
  X, 
  Sparkles, 
  BarChart2 
} from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { GameCard } from '../components/GameCard';
import { Game, GameStatus, getStatistics } from '../utils/gameData';

interface DashboardProps {
  games: Game[];
  onStatusChange: (gameId: number, status: GameStatus) => void;
}

const Dashboard: React.FC<DashboardProps> = ({ games, onStatusChange }) => {
  const stats = getStatistics(games);
  
  const recentlyAdded = [...games].sort((a, b) => b.id - a.id).slice(0, 4);
  const finishedGames = games.filter(game => game.status === GameStatus.FINISHED);
  const wishlistGames = games.filter(game => game.status === GameStatus.WISHLIST);
  
  return (
    <div className="animate-fade-in">
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-6">Welcome back</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <StatsCard
            title="Total Games"
            value={stats.totalGames}
            icon={<Gamepad className="h-5 w-5" />}
            description="Games in your collection"
          />
          
          <StatsCard
            title="Finished Games"
            value={stats.finishedCount}
            icon={<Check className="h-5 w-5" />}
            trend={{
              value: 12,
              isPositive: true
            }}
          />
          
          <StatsCard
            title="Want to Play"
            value={stats.wishlistCount}
            icon={<Clock className="h-5 w-5" />}
          />
          
          <StatsCard
            title="Total Play Time"
            value={`${stats.totalPlayTime} hrs`}
            icon={<Clock className="h-5 w-5" />}
            description="Hours spent gaming"
          />
        </div>
      </section>
      
      <section className="mb-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-medium">Recently Added</h2>
          <Link 
            to="/library" 
            className="text-sm text-primary flex items-center hover:underline"
          >
            View All <ArrowRight className="ml-1 h-4 w-4" />
          </Link>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {recentlyAdded.map(game => (
            <GameCard 
              key={game.id} 
              game={game} 
              onStatusChange={onStatusChange} 
            />
          ))}
        </div>
      </section>
      
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Quick Actions</h2>
          </div>
          
          <div className="glass-card rounded-lg divide-y divide-border">
            <Link 
              to="/library" 
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-4">
                  <Gamepad className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Game Library</h3>
                  <p className="text-sm text-muted-foreground">
                    View and manage all your games
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            
            <Link 
              to="/recommendations" 
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-4">
                  <Sparkles className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Game Recommendations</h3>
                  <p className="text-sm text-muted-foreground">
                    Discover new games based on your preferences
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
            
            <Link 
              to="/statistics" 
              className="flex items-center justify-between p-4 hover:bg-muted/50 transition-colors"
            >
              <div className="flex items-center">
                <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary mr-4">
                  <BarChart2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-medium">Gaming Statistics</h3>
                  <p className="text-sm text-muted-foreground">
                    View your gaming patterns and insights
                  </p>
                </div>
              </div>
              <ArrowRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          </div>
        </div>
        
        <div>
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-medium">Gaming Overview</h2>
          </div>
          
          <div className="glass-card rounded-lg p-6">
            <div className="grid grid-cols-2 gap-6 mb-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {stats.averageRating}
                </div>
                <p className="text-sm text-muted-foreground">
                  Average Rating
                </p>
              </div>
              
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {stats.completionRate}%
                </div>
                <p className="text-sm text-muted-foreground">
                  Completion Rate
                </p>
              </div>
            </div>
            
            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium mb-2">Favorite Genre</h3>
                <div className="glass-card rounded-md p-3 flex items-center justify-between">
                  <span>{stats.favoriteGenre}</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {stats.genreBreakdown[0]?.percentage || 0}%
                  </span>
                </div>
              </div>
              
              <div>
                <h3 className="text-sm font-medium mb-2">Favorite Platform</h3>
                <div className="glass-card rounded-md p-3 flex items-center justify-between">
                  <span>{stats.favoritePlatform}</span>
                  <span className="bg-primary/10 text-primary text-xs px-2 py-1 rounded-full">
                    {stats.platformBreakdown[0]?.percentage || 0}%
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Dashboard;
