import React, { useState } from 'react';
import { Check, Clock, X, Search, Filter, Plus } from 'lucide-react';
import { GameList } from '../components/GameList';
import { Game, GameStatus } from '../utils/gameData';

interface LibraryProps {
  games: Game[];
  onStatusChange: (gameId: number, status: GameStatus) => void;
}

const Library: React.FC<LibraryProps> = ({ games, onStatusChange }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filterGenre, setFilterGenre] = useState<string | null>(null);
  
  // Extract unique genres for filter
  const genres = [...new Set(games.map(game => game.genre))];
  
  // Filter games based on search and genre
  const filteredGames = games.filter(game => {
    const matchesSearch = game.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         game.genre.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesGenre = !filterGenre || game.genre === filterGenre;
    
    return matchesSearch && matchesGenre;
  });
  
  // Group games by status
  const untrackedGames = filteredGames.filter(game => !game.status);
  const finishedGames = filteredGames.filter(game => game.status === GameStatus.FINISHED);
  const wishlistGames = filteredGames.filter(game => game.status === GameStatus.WISHLIST);
  const dislikedGames = filteredGames.filter(game => game.status === GameStatus.DISLIKED);
  
  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-6">Game Library</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          {/* Search */}
          <div className="relative flex-1">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <input
              type="text"
              className="w-full pl-10 py-2 bg-secondary/50 border border-border rounded-md focus:ring-1 focus:ring-primary focus:outline-none"
              placeholder="Search games by title or genre..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          {/* Genre filter */}
          <div className="w-full md:w-64">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter className="h-4 w-4 text-muted-foreground" />
              </div>
              <select
                className="w-full pl-10 py-2 bg-secondary/50 border border-border rounded-md focus:ring-1 focus:ring-primary focus:outline-none appearance-none"
                value={filterGenre || ''}
                onChange={(e) => setFilterGenre(e.target.value || null)}
              >
                <option value="">All Genres</option>
                {genres.map(genre => (
                  <option key={genre} value={genre}>{genre}</option>
                ))}
              </select>
              <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                <svg className="h-4 w-4 text-muted-foreground" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <GameList
        title="Untracked Games"
        icon={<Plus className="h-5 w-5 text-gray-600" />}
        games={untrackedGames}
        onStatusChange={onStatusChange}
        emptyMessage={
          searchQuery || filterGenre
            ? "No untracked games match your filters"
            : "All games have been categorized"
        }
      />
      
      <GameList
        title="Finished Games"
        icon={<Check className="h-5 w-5 text-green-600" />}
        games={finishedGames}
        onStatusChange={onStatusChange}
        emptyMessage={
          searchQuery || filterGenre
            ? "No finished games match your filters"
            : "You haven't finished any games yet"
        }
      />
      
      <GameList
        title="Want to Play"
        icon={<Clock className="h-5 w-5 text-blue-600" />}
        games={wishlistGames}
        onStatusChange={onStatusChange}
        emptyMessage={
          searchQuery || filterGenre
            ? "No wishlist games match your filters"
            : "Your wishlist is empty"
        }
      />
      
      <GameList
        title="Not Interested"
        icon={<X className="h-5 w-5 text-red-600" />}
        games={dislikedGames}
        onStatusChange={onStatusChange}
        emptyMessage={
          searchQuery || filterGenre
            ? "No disliked games match your filters"
            : "You haven't disliked any games yet"
        }
      />
    </div>
  );
};

export default Library;
