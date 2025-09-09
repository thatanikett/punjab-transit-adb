import React from 'react';
import { Activity } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

const SystemStatus = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass-button">
          <Activity className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-panel border border-white/20 w-64">
        <DropdownMenuLabel>System Status</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Database</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs font-medium text-success">Operational</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">API Services</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs font-medium text-success">Operational</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">GPS Tracking</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs font-medium text-success">Operational</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">Message Queue</span>
            <div className="flex items-center space-x-2">
              <div className="w-2 h-2 bg-success rounded-full" />
              <span className="text-xs font-medium text-success">Operational</span>
            </div>
          </div>
          
          <div className="border-t pt-3 mt-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Last Update</span>
              <span className="text-xs font-medium">2 seconds ago</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-muted-foreground">Uptime</span>
              <span className="text-xs font-medium">99.9%</span>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SystemStatus;