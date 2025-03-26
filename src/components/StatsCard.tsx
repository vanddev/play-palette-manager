
import React from 'react';

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  description?: string;
  trend?: {
    value: number;
    isPositive: boolean;
  };
}

export const StatsCard: React.FC<StatsCardProps> = ({
  title,
  value,
  icon,
  description,
  trend,
}) => {
  return (
    <div className="glass-card rounded-lg p-6 animate-scale-in">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          
          {trend && (
            <div className="flex items-center gap-1 mt-1">
              <div
                className={`flex items-center text-xs ${
                  trend.isPositive ? 'text-green-600' : 'text-red-600'
                }`}
              >
                <span className={`mr-1 ${trend.isPositive ? 'rotate-0' : 'rotate-180'}`}>
                  ▲
                </span>
                <span>{Math.abs(trend.value)}%</span>
              </div>
              <span className="text-xs text-muted-foreground">vs last month</span>
            </div>
          )}
          
          {description && (
            <p className="text-sm text-muted-foreground mt-2">{description}</p>
          )}
        </div>
        
        <div className="h-10 w-10 rounded-full flex items-center justify-center bg-primary/10 text-primary">
          {icon}
        </div>
      </div>
    </div>
  );
};
