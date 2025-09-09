import React from 'react';
import { Activity, Users, Clock, TrendingUp, Bus, MapPin } from 'lucide-react';
import { Card } from '@/components/ui/card';

interface KPICardProps {
  title: string;
  value: string;
  subtitle: string;
  icon: React.ReactNode;
  trend?: 'up' | 'down' | 'stable';
  trendValue?: string;
  color?: 'success' | 'warning' | 'primary';
}

const KPICard = ({ title, value, subtitle, icon, trend, trendValue, color = 'primary' }: KPICardProps) => {
  const getColorClasses = () => {
    switch (color) {
      case 'success': return 'bg-success/20 text-success border-success/30';
      case 'warning': return 'bg-warning/20 text-warning border-warning/30';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const getTrendColor = () => {
    switch (trend) {
      case 'up': return 'text-success';
      case 'down': return 'text-destructive';
      default: return 'text-muted-foreground';
    }
  };

  return (
    <div className="glass-card p-4 hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-200">
      <div className="flex items-center justify-between mb-3">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${getColorClasses()}`}>
          {icon}
        </div>
        {trend && trendValue && (
          <div className={`flex items-center space-x-1 text-xs ${getTrendColor()}`}>
            <TrendingUp className="w-3 h-3" />
            <span>{trendValue}</span>
          </div>
        )}
      </div>
      
      <div className="space-y-1">
        <h3 className="text-2xl font-bold">{value}</h3>
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{subtitle}</p>
      </div>
    </div>
  );
};

const CircularProgress = ({ percentage, color = 'primary' }: { percentage: number; color?: 'success' | 'warning' | 'primary' }) => {
  const getStrokeColor = () => {
    switch (color) {
      case 'success': return '#10B981';
      case 'warning': return '#FBBF24';
      default: return '#2A52E3';
    }
  };

  const radius = 20;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percentage / 100) * circumference;

  return (
    <div className="relative w-16 h-16">
      <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 50 50">
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke="currentColor"
          strokeWidth="4"
          className="text-muted/20"
        />
        <circle
          cx="25"
          cy="25"
          r={radius}
          fill="transparent"
          stroke={getStrokeColor()}
          strokeWidth="4"
          strokeLinecap="round"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          className="transition-all duration-1000 ease-in-out"
        />
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <span className="text-xs font-bold">{percentage}%</span>
      </div>
    </div>
  );
};

const KPIPanel = () => {
  return (
    <Card className="glass-card h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Performance KPIs</h3>
            <p className="text-sm text-muted-foreground">Real-time analytics</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto space-y-4">
        {/* Quick Stats Grid - Compact */}
        <div className="grid grid-cols-2 gap-2">
          <div className="glass-card p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Bus className="w-4 h-4 text-success" />
              <span className="text-xs font-medium">Active Buses</span>
            </div>
            <div className="text-lg font-bold">84</div>
            <div className="text-xs text-muted-foreground">of 96 total</div>
          </div>
          
          <div className="glass-card p-3">
            <div className="flex items-center space-x-2 mb-2">
              <Clock className="w-4 h-4 text-warning" />
              <span className="text-xs font-medium">Avg. Delay</span>
            </div>
            <div className="text-lg font-bold">3.2 min</div>
            <div className="text-xs text-muted-foreground">below target</div>
          </div>
          
          <div className="glass-card p-3">
            <div className="flex items-center space-x-2 mb-2">
              <MapPin className="w-4 h-4 text-primary" />
              <span className="text-xs font-medium">Coverage</span>
            </div>
            <div className="text-lg font-bold">95.8%</div>
            <div className="text-xs text-muted-foreground">operational</div>
          </div>
        </div>

        {/* System Health - Compact */}
        <div className="glass-panel p-3 rounded-xl">
          <h4 className="font-medium text-sm mb-3">System Health</h4>
          <div className="flex justify-around">
            <div className="text-center">
              <CircularProgress percentage={87} color="success" />
              <p className="text-xs font-medium">Fleet</p>
            </div>
            <div className="text-center">
              <CircularProgress percentage={93} color="primary" />
              <p className="text-xs font-medium">On-Time</p>
            </div>
          </div>
        </div>

        {/* Today's Summary - Compact */}
        <div className="glass-panel p-3 rounded-xl">
          <h4 className="font-medium text-sm mb-3">Today's Summary</h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="flex justify-between">
              <span className="text-muted-foreground">Trips</span>
              <span className="font-semibold">1,247</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Revenue</span>
              <span className="font-semibold">₹2.84L</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Peak</span>
              <span className="font-semibold">8-10 AM</span>
            </div>
            <div className="flex justify-between">
              <span className="text-muted-foreground">Incidents</span>
              <span className="font-semibold text-success">0</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default KPIPanel;