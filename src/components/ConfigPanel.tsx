import React, { useState } from 'react';
import { Settings, Bell, Send, AlertTriangle, CheckCircle } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const ConfigPanel = () => {
  const [notifications, setNotifications] = useState(true);
  const [autoRefresh, setAutoRefresh] = useState(true);
  const [alertsEnabled, setAlertsEnabled] = useState(true);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [showNotificationForm, setShowNotificationForm] = useState(false);

  const handleBroadcast = () => {
    if (notificationMessage.trim()) {
      // Simulate broadcast
      setTimeout(() => {
        setNotificationMessage('');
        setShowNotificationForm(false);
      }, 1000);
    }
  };

  return (
    <Card className="glass-card">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-secondary/20 rounded-lg flex items-center justify-center">
            <Settings className="w-4 h-4 text-secondary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Configuration</h3>
            <p className="text-sm text-muted-foreground">System controls</p>
          </div>
        </div>
      </div>

      <div className="space-y-6">
        {/* System Settings */}
        <div className="glass-panel p-4 rounded-xl">
          <h4 className="font-medium text-sm mb-4">System Settings</h4>
          <div className="space-y-4">
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
        </div>

        {/* Broadcast Notification */}
        <div className="glass-panel p-4 rounded-xl">
          <div className="flex items-center justify-between mb-4">
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
                placeholder="Enter your message to broadcast to all buses..."
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
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => setShowNotificationForm(false)}
                  className="glass-button"
                >
                  Cancel
                </Button>
              </div>
            </div>
          )}
          
          {!showNotificationForm && (
            <p className="text-xs text-muted-foreground">
              Send real-time notifications to all connected devices
            </p>
          )}
        </div>

        {/* Quick Actions */}
        <div className="glass-panel p-4 rounded-xl">
          <h4 className="font-medium text-sm mb-4">Quick Actions</h4>
          <div className="grid grid-cols-1 gap-3">
            <Button variant="outline" size="sm" className="glass-button justify-start">
              <CheckCircle className="w-4 h-4 mr-2 text-success" />
              System Health Check
            </Button>
            <Button variant="outline" size="sm" className="glass-button justify-start">
              <AlertTriangle className="w-4 h-4 mr-2 text-warning" />
              Emergency Protocol
            </Button>
            <Button variant="outline" size="sm" className="glass-button justify-start">
              <Settings className="w-4 h-4 mr-2" />
              Advanced Settings
            </Button>
          </div>
        </div>

        {/* System Status */}
        <div className="glass-panel p-4 rounded-xl">
          <h4 className="font-medium text-sm mb-4">System Status</h4>
          <div className="space-y-3">
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
              <span className="text-sm text-muted-foreground">Last Update</span>
              <span className="text-xs font-medium">2 seconds ago</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ConfigPanel;