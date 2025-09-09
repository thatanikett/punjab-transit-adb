import React, { useState } from 'react';
import { 
  Bus, Bell, Moon, Sun, Monitor, User, ChevronDown, Settings, 
  BarChart3, Map, Cog, Activity, Users, MessageSquare 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useTheme } from './ThemeProvider';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import SystemControls from './SystemControls';
import SystemStatus from './SystemStatus';

const Navbar = () => {
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState('dashboard');

  const navigationTabs = [
    { id: 'dashboard', label: 'Dashboard', icon: BarChart3 },
    { id: 'fleet', label: 'Fleet', icon: Map },
    { id: 'analytics', label: 'Analytics', icon: Activity },
    { id: 'communications', label: 'Communications', icon: MessageSquare },
  ];

  const getThemeIcon = () => {
    switch (theme) {
      case 'light':
        return <Sun className="w-4 h-4" />;
      case 'dark':
        return <Moon className="w-4 h-4" />;
      default:
        return <Monitor className="w-4 h-4" />;
    }
  };

  return (
    <div className="relative z-10">
      {/* Top Bar */}
      <header className="w-full bg-gradient-to-r from-slate-900 via-blue-900 to-indigo-900 dark:from-black dark:via-slate-800 dark:to-gray-900 border-b border-blue-500/20">
        <div className="w-full px-6 py-3">
          <div className="flex items-center justify-between">
            {/* Logo and Title */}
            <div className="flex items-center space-x-4">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
                <Bus className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-white">
                  Punjab Transit
                </h1>
                <p className="text-blue-200 text-xs">
                  Command Center
                </p>
              </div>
            </div>
            
            {/* Right Section */}
            <div className="flex items-center space-x-2">
              {/* System Status */}
              <div className="flex items-center space-x-2 bg-black/20 backdrop-blur-sm px-3 py-1.5 rounded-lg border border-blue-500/20">
                <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
                <span className="text-xs font-medium text-white hidden sm:inline">Online</span>
              </div>

              {/* Notifications */}
              <div className="relative">
                <Button variant="ghost" size="icon" className="bg-black/20 backdrop-blur-sm border border-blue-500/20 hover:bg-blue-500/20 text-white h-8 w-8">
                  <Bell className="w-4 h-4" />
                  <Badge className="absolute -top-1 -right-1 w-4 h-4 p-0 flex items-center justify-center text-xs bg-red-500 text-white">
                    3
                  </Badge>
                </Button>
              </div>

              {/* Theme Toggle */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="bg-black/20 backdrop-blur-sm border border-blue-500/20 hover:bg-blue-500/20 text-white h-8 w-8">
                    {getThemeIcon()}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-900/95 backdrop-blur-lg border border-blue-500/20 text-white">
                  <DropdownMenuLabel className="text-blue-200">Theme</DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-blue-500/20" />
                  <DropdownMenuItem onClick={() => setTheme("light")} className="hover:bg-blue-500/20 text-white">
                    <Sun className="w-4 h-4 mr-2" />
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("dark")} className="hover:bg-blue-500/20 text-white">
                    <Moon className="w-4 h-4 mr-2" />
                    Dark
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => setTheme("system")} className="hover:bg-blue-500/20 text-white">
                    <Monitor className="w-4 h-4 mr-2" />
                    System
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* System Status & Controls */}
              <SystemStatus />
              <SystemControls />

              {/* User Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="bg-black/20 backdrop-blur-sm border border-blue-500/20 hover:bg-blue-500/20 px-2 py-1 h-8">
                    <div className="flex items-center space-x-2">
                      <Avatar className="w-6 h-6">
                        <AvatarImage src="/placeholder.svg" alt="Admin" />
                        <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white text-xs">
                          AD
                        </AvatarFallback>
                      </Avatar>
                      <ChevronDown className="w-3 h-3 text-blue-200" />
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-slate-900/95 backdrop-blur-lg border border-blue-500/20 text-white w-48">
                  <DropdownMenuLabel className="text-blue-200">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium text-white">Admin User</p>
                      <p className="text-xs text-blue-300">admin@punjab.gov.in</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="bg-blue-500/20" />
                  <DropdownMenuItem className="hover:bg-blue-500/20 text-white">
                    <User className="w-4 h-4 mr-2" />
                    Profile
                  </DropdownMenuItem>
                  <DropdownMenuItem className="hover:bg-blue-500/20 text-white">
                    <Settings className="w-4 h-4 mr-2" />
                    Settings
                  </DropdownMenuItem>
                  <DropdownMenuSeparator className="bg-blue-500/20" />
                  <DropdownMenuItem className="text-red-400 hover:bg-red-500/20">
                    Log out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation Tabs */}
      <nav className="w-full bg-gradient-to-r from-slate-800 via-blue-800 to-indigo-800 dark:from-gray-900 dark:via-slate-900 dark:to-black border-b border-blue-500/10">
        <div className="w-full px-6">
          <div className="flex space-x-1">
            {navigationTabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`flex items-center space-x-2 px-4 py-3 text-sm font-medium transition-all duration-200 border-b-2 ${
                    activeTab === tab.id
                      ? 'text-white border-blue-400 bg-blue-500/20'
                      : 'text-blue-200 border-transparent hover:text-white hover:border-blue-300 hover:bg-blue-500/10'
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{tab.label}</span>
                </button>
              );
            })}
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;