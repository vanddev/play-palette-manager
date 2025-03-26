
import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { 
  ArrowLeft, 
  Clock, 
  Calendar, 
  Monitor, 
  Star, 
  Check, 
  X, 
  Heart,
  GameController,
  Trophy
} from 'lucide-react';
import { Game, GameStatus, initialGames } from '../utils/gameData';
import { Button } from '@/components/ui/button';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import { Card, CardContent } from '@/components/ui/card';

interface GameDetailProps {
  games: Game[];
  onStatusChange: (gameId: number, status: GameStatus) => void;
}

const GameDetail: React.FC<GameDetailProps> = ({ games, onStatusChange }) => {
  const { id } = useParams<{ id: string }>();
  const gameId = parseInt(id || '0');
  const game = games.find(g => g.id === gameId);

  if (!game) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh]">
        <h1 className="text-3xl font-bold mb-4">Game Not Found</h1>
        <p className="text-muted-foreground mb-6">The game you are looking for does not exist.</p>
        <Link to="/library">
          <Button>
            <ArrowLeft className="mr-2 h-4 w-4" /> Back to Library
          </Button>
        </Link>
      </div>
    );
  }
  
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
  
  const StatusIcon = statusConfig[game.status].icon;
  
  // Mock screenshots for the game
  const mockScreenshots = [
    {
      id: 1,
      url: `https://images.unsplash.com/photo-1511512578047-dfb367046420?q=80&w=1000`,
      caption: 'In-game gameplay'
    },
    {
      id: 2,
      url: `https://images.unsplash.com/photo-1493711662062-fa541adb3fc8?q=80&w=1000`,
      caption: 'Character customization'
    },
    {
      id: 3,
      url: `https://images.unsplash.com/photo-1550745165-9bc0b252726f?q=80&w=1000`,
      caption: 'Battle sequence'
    },
    {
      id: 4,
      url: `https://images.unsplash.com/photo-1533236897111-3ad0d0db7ff4?q=80&w=1000`,
      caption: 'Menu screen'
    }
  ];

  return (
    <div className="animate-fade-in max-w-5xl mx-auto">
      <div className="mb-6">
        <Link to="/library" className="text-primary hover:underline flex items-center">
          <ArrowLeft className="mr-1 h-4 w-4" />
          Back to Library
        </Link>
      </div>
      
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Left Section - Cover Image & Status */}
        <div className="w-full lg:w-1/3">
          <div className="glass-card rounded-lg overflow-hidden">
            <div className="aspect-[3/4] relative">
              <img 
                src={game.imageUrl} 
                alt={game.title}
                className="w-full h-full object-cover"
              />
              <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-4">
                <div className={`status-chip ${statusConfig[game.status].color} inline-flex items-center gap-1`}>
                  <StatusIcon className="h-3 w-3" />
                  <span>{statusConfig[game.status].label}</span>
                </div>
              </div>
            </div>
            
            <div className="p-4 space-y-4">
              <div className="flex justify-between gap-2">
                <Button 
                  variant={game.status === GameStatus.FINISHED ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => onStatusChange(game.id, GameStatus.FINISHED)}
                >
                  <Check className="mr-2 h-4 w-4" />
                  Finished
                </Button>
                
                <Button 
                  variant={game.status === GameStatus.WISHLIST ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => onStatusChange(game.id, GameStatus.WISHLIST)}
                >
                  <Clock className="mr-2 h-4 w-4" />
                  Want to Play
                </Button>
                
                <Button 
                  variant={game.status === GameStatus.DISLIKED ? "default" : "outline"}
                  className="flex-1"
                  onClick={() => onStatusChange(game.id, GameStatus.DISLIKED)}
                >
                  <X className="mr-2 h-4 w-4" />
                  Not Interested
                </Button>
              </div>
            </div>
          </div>
        </div>
        
        {/* Right Section - Game Details */}
        <div className="w-full lg:w-2/3">
          <h1 className="text-3xl font-bold mb-2">{game.title}</h1>
          
          <div className="flex flex-wrap gap-2 mb-4">
            <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center">
              <Star className="h-3 w-3 mr-1" />
              {game.rating || 'N/A'}
            </div>
            
            <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center">
              <GameController className="h-3 w-3 mr-1" />
              {game.genre}
            </div>
            
            {game.platform && (
              <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center">
                <Monitor className="h-3 w-3 mr-1" />
                {game.platform}
              </div>
            )}
            
            {game.releaseYear && (
              <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center">
                <Calendar className="h-3 w-3 mr-1" />
                {game.releaseYear}
              </div>
            )}
            
            {game.playTime && (
              <div className="bg-primary/10 text-primary text-sm px-3 py-1 rounded-full flex items-center">
                <Clock className="h-3 w-3 mr-1" />
                {game.playTime} hrs
              </div>
            )}
          </div>
          
          <div className="glass-card rounded-lg p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">About</h2>
            <p className="text-muted-foreground">
              {game.description || 
                `${game.title} is a ${game.genre} game ${game.platform ? `available on ${game.platform}` : ''} ${game.releaseYear ? `released in ${game.releaseYear}` : ''}.
                 This game has received critical acclaim for its innovative gameplay and storytelling, with a strong ${game.rating || '8.0'} rating from critics and players alike.
                 Experience an unforgettable adventure that will keep you engaged for hours of entertainment.`
              }
            </p>
          </div>
          
          <div className="glass-card rounded-lg p-6 mb-6">
            <h2 className="text-xl font-medium mb-4">Screenshots</h2>
            <Carousel className="w-full">
              <CarouselContent>
                {mockScreenshots.map((screenshot) => (
                  <CarouselItem key={screenshot.id} className="md:basis-1/2 lg:basis-1/3">
                    <div className="p-1">
                      <Card>
                        <CardContent className="flex aspect-video items-center justify-center p-0 overflow-hidden">
                          <img 
                            src={screenshot.url} 
                            alt={screenshot.caption} 
                            className="w-full h-full object-cover"
                          />
                        </CardContent>
                      </Card>
                      <p className="text-sm text-center mt-2 text-muted-foreground">{screenshot.caption}</p>
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious className="md:-left-6" />
              <CarouselNext className="md:-right-6" />
            </Carousel>
          </div>
          
          <div className="glass-card rounded-lg p-6">
            <h2 className="text-xl font-medium mb-4">Achievements & Milestones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[1, 2, 3, 4].map((item) => (
                <div 
                  key={item}
                  className="flex items-center gap-3 p-3 bg-secondary/40 rounded-lg"
                >
                  <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
                    <Trophy className="h-5 w-5" />
                  </div>
                  <div>
                    <h3 className="font-medium">Achievement {item}</h3>
                    <p className="text-sm text-muted-foreground">
                      {item === 1 ? "Complete the main storyline" : 
                       item === 2 ? "Defeat the final boss" : 
                       item === 3 ? "Collect all hidden items" : 
                       "Reach max level"}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GameDetail;
