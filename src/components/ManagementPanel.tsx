import React, { useState } from 'react';
import { Bus, MapPin, Users, Plus, Search, Filter } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';

interface Fleet {
  id: string;
  route: string;
  status: 'active' | 'maintenance' | 'offline';
  capacity: number;
}

interface Route {
  id: string;
  name: string;
  stops: number;
  distance: string;
  activeRoutes: number;
}

const mockFleet: Fleet[] = [
  { id: 'PB-001', route: 'Route A', status: 'active', capacity: 50 },
  { id: 'PB-002', route: 'Route B', status: 'active', capacity: 50 },
  { id: 'PB-003', route: 'Route C', status: 'maintenance', capacity: 50 },
  { id: 'PB-004', route: 'Route A', status: 'active', capacity: 50 },
];

const mockRoutes: Route[] = [
  { id: 'R001', name: 'Chandigarh ↔ Ludhiana', stops: 12, distance: '98 km', activeRoutes: 3 },
  { id: 'R002', name: 'Amritsar ↔ Jalandhar', stops: 8, distance: '45 km', activeRoutes: 2 },
  { id: 'R003', name: 'Patiala ↔ Bathinda', stops: 15, distance: '110 km', activeRoutes: 1 },
];

const ManagementPanel = () => {
  const [activeTab, setActiveTab] = useState<'fleet' | 'routes'>('fleet');
  const [searchTerm, setSearchTerm] = useState('');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'status-online';
      case 'maintenance': return 'status-warning';
      case 'offline': return 'status-offline';
      default: return '';
    }
  };

  return (
    <Card className="glass-card h-full overflow-hidden flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Bus className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Management</h3>
            <p className="text-sm text-muted-foreground">Fleet & Route Control</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col space-y-4">

        {/* Tab Navigation */}
        <div className="flex space-x-1 glass-panel p-1 rounded-lg">
          <Button
            variant={activeTab === 'fleet' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('fleet')}
            className="flex-1"
          >
            <Bus className="w-4 h-4 mr-2" />
            Fleet
          </Button>
          <Button
            variant={activeTab === 'routes' ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setActiveTab('routes')}
            className="flex-1"
          >
            <MapPin className="w-4 h-4 mr-2" />
            Routes
          </Button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-3 top-3 w-4 h-4 text-muted-foreground" />
          <Input
            placeholder={`Search ${activeTab}...`}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 glass-panel border-white/20"
          />
        </div>

        {/* Content Area with Scroll */}
        <div className="flex-1 overflow-y-auto">

          {/* Fleet Tab */}
          {activeTab === 'fleet' && (
            <div className="space-y-3 h-full">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-muted-foreground">Active Fleet</h4>
                <Button size="sm" variant="outline" className="glass-button">
                  <Plus className="w-4 h-4 mr-1" />
                  Add Bus
                </Button>
              </div>
              
              <div className="space-y-2 flex-1 overflow-y-auto">
            {mockFleet.map((bus) => (
              <div key={bus.id} className="glass-panel p-3 rounded-lg hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center space-x-2">
                    <Badge variant="outline" className={getStatusColor(bus.status)}>
                      {bus.id}
                    </Badge>
                    <span className="text-sm font-medium">{bus.route}</span>
                  </div>
                  <div className={`w-2 h-2 rounded-full ${
                    bus.status === 'active' ? 'bg-success' :
                    bus.status === 'maintenance' ? 'bg-warning' : 'bg-destructive'
                  }`} />
                </div>
                
                <div className="flex items-center justify-between text-xs text-muted-foreground">
                  <div className="flex items-center space-x-1">
                    <Users className="w-3 h-3" />
                    <span>Capacity: {bus.capacity}</span>
                  </div>
                  <span className="capitalize">{bus.status}</span>
                </div>
              </div>
            ))}
              </div>
            </div>
          )}

          {/* Routes Tab */}
          {activeTab === 'routes' && (
            <div className="space-y-3 h-full">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-sm text-muted-foreground">Route Network</h4>
                <Button size="sm" variant="outline" className="glass-button">
                  <Plus className="w-4 h-4 mr-1" />
                  New Route
                </Button>
              </div>
              
              <div className="space-y-2 flex-1 overflow-y-auto">
            {mockRoutes.map((route) => (
              <div key={route.id} className="glass-panel p-3 rounded-lg hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer">
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h5 className="font-medium text-sm">{route.name}</h5>
                    <p className="text-xs text-muted-foreground">{route.id}</p>
                  </div>
                  <Badge variant="outline" className="status-online">
                    {route.activeRoutes} Active
                  </Badge>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs text-muted-foreground">
                  <div>
                    <span className="font-medium">{route.stops}</span> stops
                  </div>
                  <div>
                    <span className="font-medium">{route.distance}</span> total
                  </div>
                </div>
              </div>
            ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </Card>
  );
};

export default ManagementPanel;