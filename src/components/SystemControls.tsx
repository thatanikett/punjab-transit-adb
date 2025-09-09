import React, { useState } from 'react';
import { Settings, Bell, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator 
} from '@/components/ui/dropdown-menu';

const SystemControls = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotificationForm, setShowNotificationForm] = useState(false);

  const handleBroadcast = () => {
    if (notificationMessage.trim()) {
      setTimeout(() => {
        setNotificationMessage('');
        setShowNotificationForm(false);
      }, 1000);
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="glass-button">
          <Settings className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="glass-panel border border-white/20 w-80 max-h-96 overflow-y-auto">
        <DropdownMenuLabel>System Controls</DropdownMenuLabel>
        <DropdownMenuSeparator />
        
        {/* System Settings */}
        <div className="p-4 space-y-4">
          <div className="space-y-3">
            <h4 className="font-medium text-sm">System Settings</h4>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Real-time Notifications</p>
                <p className="text-xs text-muted-foreground">Get alerts for system events</p>
              </div>
              <Switch
                checked={notifications}
                onCheckedChange={setNotifications}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Auto Refresh</p>
                <p className="text-xs text-muted-foreground">Update data every 30 seconds</p>
              </div>
              <Switch
                checked={autoRefresh}
                onCheckedChange={setAutoRefresh}
              />
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Emergency Alerts</p>
                <p className="text-xs text-muted-foreground">High priority notifications</p>
              </div>
              <Switch
                checked={alertsEnabled}
                onCheckedChange={setAlertsEnabled}
              />
            </div>
          </div>

          <DropdownMenuSeparator />

          {/* Broadcast Notification */}
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <h4 className="font-medium text-sm">Broadcast Notification</h4>
              <Button
                size="sm"
                variant="outline"
                onClick={() => setShowNotificationForm(!showNotificationForm)}
                className="glass-button"
              >
                <Bell className="w-4 h-4 mr-1" />
                {showNotificationForm ? 'Cancel' : 'New'}
              </Button>
            </div>
            
            {showNotificationForm && (
              <div className="space-y-3 animate-fade-in">
                <Input
                  placeholder="Notification title..."
                  className="glass-panel border-white/20"
                />
                <Textarea
                  placeholder="Enter your message to broadcast..."
                  value={notificationMessage}
                  onChange={(e) => setNotificationMessage(e.target.value)}
                  className="glass-panel border-white/20 resize-none"
                  rows={3}
                />
                <div className="flex space-x-2">
                  <Button
                    size="sm"
                    onClick={handleBroadcast}
                    disabled={!notificationMessage.trim()}
                    className="flex-1"
                  >
                    <Send className="w-4 h-4 mr-1" />
                    Broadcast
                  </Button>
                </div>
              </div>
            )}
          </div>

          <DropdownMenuSeparator />

          {/* Quick Actions */}
          <div className="space-y-3">
            <h4 className="font-medium text-sm">Quick Actions</h4>
            <div className="space-y-2">
              <Button variant="outline" size="sm" className="glass-button justify-start w-full">
                <CheckCircle className="w-4 h-4 mr-2 text-success" />
                System Health Check
              </Button>
              <Button variant="outline" size="sm" className="glass-button justify-start w-full">
                <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
                Emergency Protocol
              </Button>
            </div>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SystemControls;