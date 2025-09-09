import React, { useState } from 'react';
import { Activity, ChevronDown, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import FleetMap from './FleetMap';
import ManagementPanel from './ManagementPanel';
import KPIPanel from './KPIPanel';
import ConfigPanel from './ConfigPanel';
import EventLog from './EventLog';
import Navbar from './Navbar';
import punjabBackground from '@/assets/punjab-background.jpg';

const Dashboard = () => {
  const [isEventLogOpen, setIsEventLogOpen] = useState(false);

  return (
    <div 
      className="min-h-screen relative overflow-hidden bg-gradient-to-br from-background via-background to-muted"
      style={{
        backgroundImage: `url(${punjabBackground})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed'
      }}
    >
      {/* Enhanced Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background/30 via-background/50 to-background/70 dark:from-background/70 dark:via-background/80 dark:to-background/90 backdrop-blur-sm" />
      
      {/* Navbar */}
      <Navbar />

      {/* Main Dashboard Grid - Full Width */}
      <div className="relative z-10 px-6 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 h-[calc(100vh-140px)]">
          
          {/* Management Panel - Left */}
          <div className="lg:col-span-1 space-y-4">
            <ManagementPanel />
          </div>

          {/* Main Map Area - Center */}
          <div className="lg:col-span-2">
            <FleetMap />
          </div>

          {/* KPI Panel - Right */}
          <div className="lg:col-span-1 space-y-4">
            <KPIPanel />
          </div>
        </div>
      </div>

      {/* Event Log Drawer - Bottom */}
      <div className={`fixed bottom-0 left-0 right-0 z-20 transition-transform duration-300 ${
        isEventLogOpen ? 'translate-y-0' : 'translate-y-full'
      }`}>
        <div className="glass-panel border-t border-white/20 rounded-t-2xl">
          <div className="px-6">
            <Button
              variant="ghost"
              onClick={() => setIsEventLogOpen(!isEventLogOpen)}
              className="w-full py-3 text-sm font-medium hover:bg-transparent"
            >
              <div className="flex items-center justify-center space-x-2">
                <Activity className="w-4 h-4" />
                <span>System Event Log</span>
                {isEventLogOpen ? (
                  <ChevronDown className="w-4 h-4" />
                ) : (
                  <ChevronUp className="w-4 h-4" />
                )}
              </div>
            </Button>
            
            {isEventLogOpen && (
              <div className="pb-6">
                <EventLog />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Toggle Event Log Button - When Closed */}
      {!isEventLogOpen && (
        <Button
          variant="ghost"
          onClick={() => setIsEventLogOpen(true)}
          className="fixed bottom-4 left-1/2 transform -translate-x-1/2 glass-panel border border-white/20 z-10"
        >
          <Activity className="w-4 h-4 mr-2" />
          View Event Log
          <ChevronUp className="w-4 h-4 ml-2" />
        </Button>
      )}
    </div>
  );
};

export default Dashboard;