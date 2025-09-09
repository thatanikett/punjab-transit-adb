import React, { useState } from 'react';
import { Activity, Filter, Download, AlertCircle, CheckCircle, Clock, Info } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface LogEvent {
  id: string;
  timestamp: string;
  type: 'info' | 'warning' | 'error' | 'success';
  category: string;
  message: string;
  details?: Record<string, any>;
}

const mockEvents: LogEvent[] = [
  {
    id: '1',
    timestamp: '2024-01-15T10:30:25Z',
    type: 'success',
    category: 'Fleet',
    message: 'Bus PB-001 completed route successfully',
    details: { busId: 'PB-001', route: 'Chandigarh → Ludhiana' }
  },
  {
    id: '2',
    timestamp: '2024-01-15T10:28:15Z',
    type: 'warning',
    category: 'System',
    message: 'GPS signal weak for bus PB-003',
    details: { busId: 'PB-003', signalStrength: '15%', location: 'Near Patiala' }
  },
  {
    id: '3',
    timestamp: '2024-01-15T10:25:45Z',
    type: 'info',
    category: 'Route',
    message: 'New passenger boarding at Sector 17',
    details: { stop: 'Sector 17, Chandigarh', busId: 'PB-002' }
  },
  {
    id: '4',
    timestamp: '2024-01-15T10:22:30Z',
    type: 'success',
    category: 'Maintenance',
    message: 'Bus PB-004 maintenance completed',
    details: { busId: 'PB-004', maintenanceType: 'Routine Check', duration: '45 min' }
  },
  {
    id: '5',
    timestamp: '2024-01-15T10:20:12Z',
    type: 'error',
    category: 'Payment',
    message: 'Payment gateway timeout',
    details: { gateway: 'UPI', transactionId: 'TXN123456', amount: '₹25' }
  }
];

const EventLog = () => {
  const [filter, setFilter] = useState<'all' | 'info' | 'warning' | 'error' | 'success'>('all');
  const [expandedEvent, setExpandedEvent] = useState<string | null>(null);

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'success': return <CheckCircle className="w-4 h-4 text-success" />;
      case 'warning': return <AlertCircle className="w-4 h-4 text-warning" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-destructive" />;
      default: return <Info className="w-4 h-4 text-primary" />;
    }
  };

  const getEventBadgeColor = (type: string) => {
    switch (type) {
      case 'success': return 'status-online';
      case 'warning': return 'status-warning';
      case 'error': return 'status-offline';
      default: return 'bg-primary/20 text-primary border-primary/30';
    }
  };

  const formatTimestamp = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleTimeString('en-IN', { 
      hour: '2-digit', 
      minute: '2-digit', 
      second: '2-digit' 
    });
  };

  const filteredEvents = filter === 'all' 
    ? mockEvents 
    : mockEvents.filter(event => event.type === filter);

  return (
    <div className="space-y-4">
      {/* Event Log Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <Activity className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">System Event Log</h3>
            <p className="text-sm text-muted-foreground">Real-time system monitoring</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <Button variant="outline" size="sm" className="glass-button">
            <Download className="w-4 h-4 mr-1" />
            Export
          </Button>
          <Button variant="outline" size="sm" className="glass-button">
            <Filter className="w-4 h-4 mr-1" />
            Filter
          </Button>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex space-x-1 glass-panel p-1 rounded-lg">
        {['all', 'success', 'info', 'warning', 'error'].map((type) => (
          <Button
            key={type}
            variant={filter === type ? 'default' : 'ghost'}
            size="sm"
            onClick={() => setFilter(type as any)}
            className="flex-1 capitalize"
          >
            {type === 'all' ? 'All Events' : type}
            {type !== 'all' && (
              <span className="ml-1 text-xs">
                ({mockEvents.filter(e => e.type === type).length})
              </span>
            )}
          </Button>
        ))}
      </div>

      {/* Event List */}
      <div className="glass-panel rounded-xl max-h-96 overflow-y-auto">
        <div className="space-y-1 p-4">
          {filteredEvents.map((event) => (
            <div
              key={event.id}
              className="glass-panel p-3 rounded-lg hover:bg-white/90 dark:hover:bg-white/10 transition-all duration-200 cursor-pointer"
              onClick={() => setExpandedEvent(expandedEvent === event.id ? null : event.id)}
            >
              <div className="flex items-start space-x-3">
                <div className="flex-shrink-0 mt-0.5">
                  {getEventIcon(event.type)}
                </div>
                
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center space-x-2">
                      <Badge variant="outline" className={getEventBadgeColor(event.type)}>
                        {event.category}
                      </Badge>
                      <span className="text-xs text-muted-foreground">
                        {formatTimestamp(event.timestamp)}
                      </span>
                    </div>
                  </div>
                  
                  <p className="text-sm font-medium text-foreground">{event.message}</p>
                  
                  {expandedEvent === event.id && event.details && (
                    <div className="mt-3 p-3 bg-muted/30 rounded-lg animate-fade-in">
                      <h5 className="text-xs font-medium text-muted-foreground mb-2">Event Details:</h5>
                      <div className="space-y-1">
                        {Object.entries(event.details).map(([key, value]) => (
                          <div key={key} className="flex justify-between text-xs">
                            <span className="text-muted-foreground capitalize">
                              {key.replace(/([A-Z])/g, ' $1').trim()}:
                            </span>
                            <span className="font-mono font-medium">
                              {typeof value === 'object' ? JSON.stringify(value) : value}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
        
        {filteredEvents.length === 0 && (
          <div className="text-center py-8">
            <Activity className="w-8 h-8 text-muted-foreground mx-auto mb-2" />
            <p className="text-sm text-muted-foreground">No events found for the selected filter</p>
          </div>
        )}
      </div>

      {/* Live Status Indicator */}
      <div className="flex items-center justify-center space-x-2 text-xs text-muted-foreground">
        <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
        <span>Live monitoring active • Last update: {formatTimestamp(new Date().toISOString())}</span>
        <Clock className="w-3 h-3" />
      </div>
    </div>
  );
};

export default EventLog;