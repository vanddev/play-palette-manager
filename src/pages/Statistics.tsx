
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement,
} from 'chart.js';
import { Bar, Pie } from 'react-chartjs-2';
import { Clock, Award, Gamepad, Monitor, BarChart2 } from 'lucide-react';
import { StatsCard } from '../components/StatsCard';
import { Game, getStatistics } from '../utils/gameData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ArcElement
);

interface StatisticsProps {
  games: Game[];
}

const Statistics: React.FC<StatisticsProps> = ({ games }) => {
  const stats = getStatistics(games);
  
  // Colors for charts
  const COLORS = ['#3b82f6', '#10b981', '#f97316', '#8b5cf6', '#ec4899'];
  
  // Pie chart data for genres
  const genreChartData = {
    labels: stats.genreBreakdown.map(item => item.genre),
    datasets: [
      {
        data: stats.genreBreakdown.map(item => item.count),
        backgroundColor: COLORS,
        borderWidth: 0,
      },
    ],
  };
  
  // Bar chart data for platforms
  const platformChartData = {
    labels: stats.platformBreakdown.map(item => item.platform),
    datasets: [
      {
        label: 'Games',
        data: stats.platformBreakdown.map(item => item.count),
        backgroundColor: '#3b82f6',
        borderRadius: 4,
      },
    ],
  };
  
  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: 'bottom' as const,
      },
    },
  };
  
  const barChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };
  
  return (
    <div className="animate-fade-in">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-3">Your Gaming Statistics</h1>
        <p className="text-muted-foreground">
          Track your gaming habits, preferences, and accomplishments.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
        <StatsCard
          title="Games Played"
          value={stats.finishedCount}
          icon={<Gamepad className="h-5 w-5" />}
        />
        
        <StatsCard
          title="Total Play Time"
          value={`${stats.totalPlayTime} hrs`}
          icon={<Clock className="h-5 w-5" />}
        />
        
        <StatsCard
          title="Completion Rate"
          value={`${stats.completionRate}%`}
          icon={<Award className="h-5 w-5" />}
        />
        
        <StatsCard
          title="Average Rating"
          value={stats.averageRating}
          icon={<Star className="h-5 w-5" />}
        />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-10">
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-xl font-medium mb-6">Genre Breakdown</h2>
          <div className="h-80">
            {stats.genreBreakdown.length > 0 ? (
              <Pie data={genreChartData} options={chartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
        </div>
        
        <div className="glass-card rounded-lg p-6">
          <h2 className="text-xl font-medium mb-6">Platform Distribution</h2>
          <div className="h-80">
            {stats.platformBreakdown.length > 0 ? (
              <Bar data={platformChartData} options={barChartOptions} />
            ) : (
              <div className="h-full flex items-center justify-center">
                <p className="text-muted-foreground">No data available</p>
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="glass-card rounded-lg p-6">
        <h2 className="text-xl font-medium mb-6">Gaming Summary</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-3">Favorite Genre</h3>
            <div className="glass-card rounded-md p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Gamepad className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{stats.favoriteGenre}</p>
                <p className="text-sm text-muted-foreground">
                  {stats.genreBreakdown[0]?.count || 0} games
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Favorite Platform</h3>
            <div className="glass-card rounded-md p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Monitor className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{stats.favoritePlatform}</p>
                <p className="text-sm text-muted-foreground">
                  {stats.platformBreakdown[0]?.count || 0} games
                </p>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Gaming Status</h3>
            <div className="glass-card rounded-md p-4">
              <div className="grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-lg font-bold text-green-600">{stats.finishedCount}</p>
                  <p className="text-xs text-muted-foreground">Finished</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-blue-600">{stats.wishlistCount}</p>
                  <p className="text-xs text-muted-foreground">Wishlist</p>
                </div>
                <div>
                  <p className="text-lg font-bold text-red-600">{stats.dislikedCount}</p>
                  <p className="text-xs text-muted-foreground">Disliked</p>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-medium mb-3">Average Playing Time</h3>
            <div className="glass-card rounded-md p-4 flex items-center gap-4">
              <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-5 w-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">
                  {stats.finishedCount > 0 
                    ? `${Math.round(stats.totalPlayTime / stats.finishedCount)} hours per game` 
                    : 'No data yet'}
                </p>
                <p className="text-sm text-muted-foreground">
                  Based on {stats.finishedCount} finished games
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// Add this import since it's used in StatsCard but wasn't imported
const Star = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={className}
  >
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
  </svg>
);

export default Statistics;
