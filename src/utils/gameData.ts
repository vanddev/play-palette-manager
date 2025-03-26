
export enum GameStatus {
  FINISHED = 'finished',
  WISHLIST = 'wishlist',
  DISLIKED = 'disliked'
}

export interface Game {
  id: number;
  title: string;
  imageUrl: string;
  genre: string;
  platform?: string;
  releaseYear?: number;
  rating?: number;
  status: GameStatus;
  playTime?: number;
}

// Mock game data
export const initialGames: Game[] = [
  {
    id: 1,
    title: "The Last of Us Part II",
    imageUrl: "https://images.unsplash.com/photo-1616889063140-90356bacaec1?q=80&w=1000",
    genre: "Action-Adventure",
    platform: "PlayStation",
    releaseYear: 2020,
    rating: 9.5,
    status: GameStatus.FINISHED,
    playTime: 25
  },
  {
    id: 2,
    title: "Elden Ring",
    imageUrl: "https://images.unsplash.com/photo-1581120083654-150513117cbf?q=80&w=1000",
    genre: "Action RPG",
    platform: "Multiple",
    releaseYear: 2022,
    rating: 9.6,
    status: GameStatus.FINISHED,
    playTime: 87
  },
  {
    id: 3,
    title: "Horizon Forbidden West",
    imageUrl: "https://images.unsplash.com/photo-1639154945057-6f42d79c4ea2?q=80&w=1000",

    genre: "Action RPG",
    platform: "PlayStation",
    releaseYear: 2022,
    rating: 9.2,
    status: GameStatus.WISHLIST
  },
  {
    id: 4,
    title: "Star Wars Jedi: Survivor",
    imageUrl: "https://images.unsplash.com/photo-1653831340008-4154a297f887?q=80&w=1000",
    genre: "Action-Adventure",
    platform: "Multiple",
    releaseYear: 2023,
    rating: 8.8,
    status: GameStatus.WISHLIST
  },
  {
    id: 5,
    title: "Call of Duty: Modern Warfare II",
    imageUrl: "https://images.unsplash.com/photo-1652799325598-d1b1efa9b3d9?q=80&w=1000",
    genre: "First-Person Shooter",
    platform: "Multiple",
    releaseYear: 2022,
    rating: 7.9,
    status: GameStatus.DISLIKED
  },
  {
    id: 6,
    title: "God of War Ragnarök",
    imageUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=1000",
    genre: "Action-Adventure",
    platform: "PlayStation",
    releaseYear: 2022,
    rating: 9.7,
    status: GameStatus.FINISHED,
    playTime: 35
  },
  {
    id: 7,
    title: "Cyberpunk 2077",
    imageUrl: "https://images.unsplash.com/photo-1640216589314-803a96fcf5bd?q=80&w=1000",
    genre: "Action RPG",
    platform: "Multiple",
    releaseYear: 2020,
    rating: 7.1,
    status: GameStatus.DISLIKED
  },
  {
    id: 8,
    title: "Final Fantasy XVI",
    imageUrl: "https://images.unsplash.com/photo-1579373903781-fd5c0c30c4cd?q=80&w=1000",
    genre: "Action RPG",
    platform: "PlayStation",
    releaseYear: 2023,
    rating: 8.7,
    status: GameStatus.WISHLIST
  },
  {
    id: 9,
    title: "Zelda: Tears of the Kingdom",
    imageUrl: "https://images.unsplash.com/photo-1605979257913-1704eb7b6246?q=80&w=1000",
    genre: "Action-Adventure",
    platform: "Nintendo Switch",
    releaseYear: 2023,
    rating: 9.8,
    status: GameStatus.FINISHED,
    playTime: 62
  },
  {
    id: 10,
    title: "Assassin's Creed Valhalla",
    imageUrl: "https://images.unsplash.com/photo-1580234811497-9df7fd2f357e?q=80&w=1000",
    genre: "Action RPG",
    platform: "Multiple",
    releaseYear: 2020,
    rating: 8.5,
    status: GameStatus.DISLIKED
  },
  {
    id: 11,
    title: "Hades",
    imageUrl: "https://images.unsplash.com/photo-1634902778384-26f8fc4ad747?q=80&w=1000",
    genre: "Roguelike",
    platform: "Multiple",
    releaseYear: 2020,
    rating: 9.3,
    status: GameStatus.FINISHED,
    playTime: 42
  },
  {
    id: 12,
    title: "Spider-Man 2",
    imageUrl: "https://images.unsplash.com/photo-1608889476561-6242cfdbf622?q=80&w=1000",
    genre: "Action-Adventure",
    platform: "PlayStation",
    releaseYear: 2023,
    rating: 9.4,
    status: GameStatus.WISHLIST
  },
  {
    id: 13,
    title: "Ghost of Tsushima",
    imageUrl: "https://images.unsplash.com/photo-1529949082-1df6c3fe622f?q=80&w=1000",
    genre: "Action-Adventure",
    platform: "PlayStation",
    releaseYear: 2020,
    rating: 9.2,
    status: GameStatus.FINISHED,
    playTime: 47
  },
  {
    id: 14,
    title: "Diablo IV",
    imageUrl: "https://images.unsplash.com/photo-1601643157091-ce5c665179ab?q=80&w=1000",
    genre: "Action RPG",
    platform: "Multiple",
    releaseYear: 2023,
    rating: 8.2,
    status: GameStatus.WISHLIST
  },
  {
    id: 15,
    title: "Forspoken",
    imageUrl: "https://images.unsplash.com/photo-1547119957-637f8679db1e?q=80&w=1000",
    genre: "Action RPG",
    platform: "PlayStation & PC",
    releaseYear: 2023,
    rating: 6.5,
    status: GameStatus.DISLIKED
  }
];

// Get recommended games based on finished games
export const getRecommendations = (games: Game[]): {game: Game, reason: string}[] => {
  const finishedGames = games.filter(game => game.status === GameStatus.FINISHED);
  const dislikedGames = games.filter(game => game.status === GameStatus.DISLIKED);
  const wishlistGames = games.filter(game => game.status === GameStatus.WISHLIST);
  
  // Genres the user enjoys
  const favoriteGenres = finishedGames.reduce<Record<string, number>>((acc, game) => {
    acc[game.genre] = (acc[game.genre] || 0) + 1;
    return acc;
  }, {});
  
  // Platforms the user has
  const userPlatforms = [...new Set(finishedGames.map(game => game.platform))].filter(Boolean) as string[];
  
  // Games to recommend (not in wishlist or finished or disliked)
  const potentialGames: Game[] = [
    {
      id: 101,
      title: "Baldur's Gate 3",
      imageUrl: "https://images.unsplash.com/photo-1598550476439-6847785fcea6?q=80&w=1000",
      genre: "RPG",
      platform: "Multiple",
      releaseYear: 2023,
      rating: 9.7,
      status: GameStatus.WISHLIST
    },
    {
      id: 102,
      title: "Starfield",
      imageUrl: "https://images.unsplash.com/photo-1502134249126-9f3755a50d78?q=80&w=1000",
      genre: "Action RPG",
      platform: "Xbox & PC",
      releaseYear: 2023,
      rating: 8.5,
      status: GameStatus.WISHLIST
    },
    {
      id: 103,
      title: "Resident Evil 4 Remake",
      imageUrl: "https://images.unsplash.com/photo-1613160717888-fcc5e3b66a28?q=80&w=1000",
      genre: "Survival Horror",
      platform: "Multiple",
      releaseYear: 2023,
      rating: 9.3,
      status: GameStatus.WISHLIST
    },
    {
      id: 104,
      title: "Metroid Prime Remastered",
      imageUrl: "https://images.unsplash.com/photo-1551103782-8ab07afd45c1?q=80&w=1000",
      genre: "Action-Adventure",
      platform: "Nintendo Switch",
      releaseYear: 2023,
      rating: 9.4,
      status: GameStatus.WISHLIST
    },
    {
      id: 105,
      title: "Hogwarts Legacy",
      imageUrl: "https://images.unsplash.com/photo-1505929040793-c59f045fb392?q=80&w=1000",
      genre: "Action RPG",
      platform: "Multiple",
      releaseYear: 2023,
      rating: 8.6,
      status: GameStatus.WISHLIST
    }
  ];
  
  // Filter out games already in the user's lists
  const userGameIds = [...finishedGames, ...wishlistGames, ...dislikedGames].map(g => g.id);
  const availableGames = potentialGames.filter(game => !userGameIds.includes(game.id));
  
  // Generate recommendations with reasons
  return availableGames.map(game => {
    // Generate a reason based on user preferences
    let reason = '';
    
    if (favoriteGenres[game.genre]) {
      reason = `Based on your interest in ${game.genre} games.`;
    } else if (game.rating && game.rating > 9) {
      reason = `Highly rated ${game.genre} game that's getting great reviews.`;
    } else if (userPlatforms.includes(game.platform || '')) {
      reason = `Available on ${game.platform}, which you already own.`;
    } else {
      reason = `A recent release that matches your general gaming interests.`;
    }
    
    return { game, reason };
  });
};

// Get statistics from game data
export const getStatistics = (games: Game[]) => {
  const finishedGames = games.filter(game => game.status === GameStatus.FINISHED);
  const wishlistGames = games.filter(game => game.status === GameStatus.WISHLIST);
  const dislikedGames = games.filter(game => game.status === GameStatus.DISLIKED);
  
  // Total playtime
  const totalPlayTime = finishedGames.reduce((total, game) => total + (game.playTime || 0), 0);
  
  // Genre statistics
  const genreStats = games.reduce<Record<string, number>>((acc, game) => {
    if (game.status === GameStatus.FINISHED) {
      acc[game.genre] = (acc[game.genre] || 0) + 1;
    }
    return acc;
  }, {});
  
  const favoriteGenre = Object.entries(genreStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  
  // Platform statistics
  const platformStats = games.reduce<Record<string, number>>((acc, game) => {
    if (game.status === GameStatus.FINISHED && game.platform) {
      acc[game.platform] = (acc[game.platform] || 0) + 1;
    }
    return acc;
  }, {});
  
  const favoritePlatform = Object.entries(platformStats).sort((a, b) => b[1] - a[1])[0]?.[0] || 'None';
  
  // Completion rate
  const completionRate = finishedGames.length / (finishedGames.length + wishlistGames.length) * 100;
  
  // Average rating of finished games
  const averageRating = finishedGames.reduce((total, game) => total + (game.rating || 0), 0) / 
                      (finishedGames.filter(game => game.rating).length || 1);
  
  return {
    totalGames: games.length,
    finishedCount: finishedGames.length,
    wishlistCount: wishlistGames.length,
    dislikedCount: dislikedGames.length,
    totalPlayTime,
    favoriteGenre,
    favoritePlatform,
    completionRate: Math.round(completionRate),
    averageRating: parseFloat(averageRating.toFixed(1)),
    genreBreakdown: Object.entries(genreStats).map(([genre, count]) => ({
      genre,
      count,
      percentage: Math.round((count / finishedGames.length) * 100)
    })).sort((a, b) => b.count - a.count),
    platformBreakdown: Object.entries(platformStats).map(([platform, count]) => ({
      platform,
      count,
      percentage: Math.round((count / finishedGames.length) * 100)
    })).sort((a, b) => b.count - a.count)
  };
};
