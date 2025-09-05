
import { useState } from "react";
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import { ThemeProvider } from "./components/ThemeProvider";
import { Layout } from "./components/Layout";
import Dashboard from "./pages/Dashboard";
import Library from "./pages/Library";
import GameDetail from "./pages/GameDetail";
import Recommendations from "./pages/Recommendations";
import Statistics from "./pages/Statistics";
import NotFound from "./pages/NotFound";
import { initialGames, Game, GameStatus } from "./utils/gameData";
import { toast } from "@/components/ui/use-toast";

const queryClient = new QueryClient();

const App = () => {
  const [games, setGames] = useState<Game[]>(initialGames);

  const handleStatusChange = (gameId: number, newStatus: GameStatus) => {
    setGames(prevGames => 
      prevGames.map(game => 
        game.id === gameId ? { ...game, status: newStatus } : game
      )
    );
    
    const game = games.find(g => g.id === gameId);
    
    if (game) {
      let message = "";
      switch (newStatus) {
        case GameStatus.FINISHED:
          message = `Added "${game.title}" to your finished games`;
          break;
        case GameStatus.WISHLIST:
          message = `Added "${game.title}" to your wishlist`;
          break;
        case GameStatus.DISLIKED:
          message = `Marked "${game.title}" as not interested`;
          break;
      }
      
      toast({
        title: "Status Updated",
        description: message,
      });
    }
  };
  
  const handleAddToWishlist = (gameId: number) => {
    // Find a recommendation with this ID
    const recommendedGame = games.find(g => g.id === gameId);
    
    if (recommendedGame) {
      handleStatusChange(gameId, GameStatus.WISHLIST);
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Layout games={games} onStatusChange={handleStatusChange} />}>
                <Route index element={<Dashboard games={games} onStatusChange={handleStatusChange} />} />
                <Route path="library" element={<Library games={games} onStatusChange={handleStatusChange} />} />
                <Route path="game/:id" element={<GameDetail games={games} onStatusChange={handleStatusChange} />} />
                <Route path="recommendations" element={<Recommendations games={games} onAddToWishlist={handleAddToWishlist} />} />
                <Route path="statistics" element={<Statistics games={games} />} />
              </Route>
              <Route path="*" element={<NotFound />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
