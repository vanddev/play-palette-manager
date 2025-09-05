
import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';
import { Game, GameStatus } from '../utils/gameData';

interface LayoutProps {
  games: Game[];
  onStatusChange: (gameId: number, status: GameStatus) => void;
}

export const Layout: React.FC<LayoutProps> = ({ games, onStatusChange }) => {
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar games={games} onStatusChange={onStatusChange} />
      <main className="flex-1 flex flex-col">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
