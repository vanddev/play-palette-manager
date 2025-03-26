
import React from 'react';
import { Navbar } from './Navbar';
import { Outlet } from 'react-router-dom';

export const Layout: React.FC = () => {
  return (
    <div className="min-h-screen flex flex-col animate-fade-in">
      <Navbar />
      <main className="flex-1 flex flex-col">
        <div className="page-container">
          <Outlet />
        </div>
      </main>
    </div>
  );
};
