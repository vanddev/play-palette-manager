
import React from 'react';
import { GameCard } from './GameCard';
import { Game, GameStatus } from '../utils/gameData';

interface GameListProps {
  title: string;
  icon: React.ReactNode;
  games: Game[];
  onStatusChange: (gameId: number, status: GameStatus) => void;
  emptyMessage?: string;
}

export const GameList: React.FC<GameListProps> = ({
  title,
  icon,
  games,
  onStatusChange,
  emptyMessage = 'No games found',
}) => {
  return (
    <div className="mb-8 animate-fade-in">
      <h2 className="section-title">
        {icon}
        <span>{title}</span>
      </h2>
      
      {games.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {games.map((game) => (
            <GameCard
              key={game.id}
              game={game}
              onStatusChange={onStatusChange}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <p className="text-muted-foreground">{emptyMessage}</p>
        </div>
      )}
    </div>
  );
};
