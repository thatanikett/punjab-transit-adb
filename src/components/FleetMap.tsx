import React, { useState } from 'react';
import { MapPin, Clock } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { MapContainer, TileLayer, Marker, Popup, Polyline } from 'react-leaflet';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';

// Fix for default icon path issue with Vite
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow
});
L.Marker.prototype.options.icon = DefaultIcon;

interface Bus {
  id: string;
  route: string;
  status: 'online' | 'offline' | 'delayed';
  lastUpdate: string;
  position: [number, number];
  routeCoords: [[number, number], [number, number]];
}

interface City {
  name: string;
  position: [number, number];
}

const cities: City[] = [
  { name: 'Ludhiana', position: [30.9010, 75.8573] },
  { name: 'Bathinda', position: [30.2110, 74.9455] },
  { name: 'Jalandhar', position: [31.3260, 75.5762] },
  { name: 'Chandigarh', position: [30.7333, 76.7794] },
  { name: 'Amritsar', position: [31.6340, 74.8723] },
  { name: 'Patiala', position: [30.3398, 76.3869] },
];

const mockBuses: Bus[] = [
  {
    id: 'PB-001',
    route: 'Chandigarh → Ludhiana',
    status: 'online',
    lastUpdate: '2 min ago',
    position: [30.7333, 76.7794],
    routeCoords: [[30.7333, 76.7794], [30.9010, 75.8573]]
  },
  {
    id: 'PB-002',
    route: 'Amritsar → Jalandhar',
    status: 'delayed',
    lastUpdate: '5 min ago',
    position: [31.6340, 74.8723],
    routeCoords: [[31.6340, 74.8723], [31.3260, 75.5762]]
  },
  {
    id: 'PB-003',
    route: 'Patiala → Bathinda',
    status: 'online',
    lastUpdate: '1 min ago',
    position: [30.3398, 76.3869],
    routeCoords: [[30.3398, 76.3869], [30.2110, 74.9455]]
  }
];

const FleetMap = () => {
  const [selectedBus, setSelectedBus] = useState<Bus | null>(null);
  const [routePolyline, setRoutePolyline] = useState<[number, number][]>([]);

  const handleBusClick = (bus: Bus) => {
    setSelectedBus(bus);
    setRoutePolyline(bus.routeCoords);
  };

  const handleCloseDetails = () => {
    setSelectedBus(null);
    setRoutePolyline([]);
  };

  return (
    <Card className="glass-card h-full relative overflow-hidden flex flex-col">
      {/* Map Header */}
      <div className="relative z-10 flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-primary/20 rounded-lg flex items-center justify-center">
            <MapPin className="w-4 h-4 text-primary" />
          </div>
          <div>
            <h3 className="font-semibold text-lg">Live Fleet Map</h3>
            <p className="text-sm text-muted-foreground">Real-time bus tracking across Punjab</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="flex items-center space-x-1 glass-panel px-2 py-1 rounded-lg">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse" />
            <span className="text-xs font-medium">{mockBuses.filter(b => b.status === 'online').length} Active</span>
          </div>
        </div>
      </div>

      {/* Leaflet Map */}
      <div className="h-96 rounded-xl overflow-hidden">
        <MapContainer center={[31.1471, 75.3412]} zoom={8} scrollWheelZoom={false} className="h-full w-full">
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          
          {/* City Markers */}
          {cities.map(city => (
            <Marker key={city.name} position={city.position}>
              <Popup>{city.name}</Popup>
            </Marker>
          ))}

          {/* Bus Markers */}
          {mockBuses.map(bus => (
            <Marker 
              key={bus.id} 
              position={bus.position}
              eventHandlers={{
                click: () => handleBusClick(bus),
              }}
            >
              <Popup>
                <b>{bus.id}</b><br />{bus.route}
              </Popup>
            </Marker>
          ))}

          {/* Route Polyline */}
          {routePolyline.length > 0 && (
            <Polyline positions={routePolyline} color="blue" />
          )}
        </MapContainer>
      </div>

      {/* Selected Bus Details */}
      {selectedBus && (
        <div className="mt-4 glass-panel p-4 rounded-xl animate-fade-in">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${
                selectedBus.status === 'online' ? 'bg-success' :
                selectedBus.status === 'delayed' ? 'bg-warning' : 'bg-destructive'
              }`} />
              <h4 className="font-semibold">{selectedBus.route}</h4>
            </div>
            <Button variant="ghost" size="sm" onClick={handleCloseDetails}>
              ×
            </Button>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Bus ID:</span>
              <span className="font-medium">{selectedBus.id}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Status:</span>
              <span className="font-medium capitalize">{selectedBus.status}</span>
            </div>
            <div className="flex items-center justify-between text-sm">
              <span className="text-muted-foreground">Last Update:</span>
              <div className="flex items-center space-x-1">
                <Clock className="w-3 h-3" />
                <span className="font-medium">{selectedBus.lastUpdate}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
};

export default FleetMap;