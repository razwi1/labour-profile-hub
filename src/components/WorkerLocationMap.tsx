import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Users } from "lucide-react";

interface Worker {
  id: number;
  name: string;
  role: string;
  location: {
    lat: number;
    lng: number;
    address: string;
  };
  status: 'active' | 'break' | 'offline';
}

interface WorkerLocationMapProps {
  workers: Worker[];
  theme: "dark" | "light";
}

const WorkerLocationMap = ({ workers, theme }: WorkerLocationMapProps) => {
  const activeWorkers = workers.filter(w => w.status === 'active');

  // Dynamic styles based on theme
  const headerTextColor = theme === "dark" ? "text-white" : "text-black";
  const badgeVariant = theme === "dark" ? "secondary" : "secondary";

  return (
    <Card className="bg-transparent shadow-none">
      <CardHeader>
        <CardTitle className={`flex items-center gap-2 ${headerTextColor}`}>
          <MapPin className="w-5 h-5" />
          Live Worker Locations
          <Badge variant={badgeVariant} className="ml-auto">
            <Users className="w-3 h-3 mr-1" />
            {activeWorkers.length} Active
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="relative h-64 bg-muted rounded-lg overflow-hidden">
          {/* Site boundary */}
          <div className="absolute inset-4 border-2 border-dashed border-primary/30 rounded bg-primary/5">
            <div className="absolute top-2 left-2 text-xs text-muted-foreground font-medium">
              Construction Site - Block A
            </div>

            {/* Worker markers */}
            {workers.map((worker, index) => (
              <div
                key={worker.id}
                className="absolute group cursor-pointer"
                style={{
                  left: `${20 + (index * 15) % 60}%`,
                  top: `${30 + (index * 12) % 40}%`,
                }}
              >
                <div className={`w-3 h-3 rounded-full border-2 border-white shadow-sm ${
                  worker.status === 'active' ? 'bg-green-500' :
                  worker.status === 'break' ? 'bg-yellow-500' : 'bg-gray-400'
                }`}>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
                  <div className="font-medium">{worker.name}</div>
                  <div className="text-gray-300">{worker.role}</div>
                  <div className="text-gray-300">{worker.location.address}</div>
                </div>
              </div>
            ))}

            {/* Legend (static colors) */}
            <div className="absolute bottom-2 right-2 bg-white/90 backdrop-blur-sm rounded p-2 text-xs space-y-1">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500"></div>
                <span className="text-gray-700">Active</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-yellow-500"></div>
                <span className="text-gray-700">Break</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-gray-400"></div>
                <span className="text-gray-700">Offline</span>
              </div>
            </div>
          </div>
        </div>

        {/* Quick stats */}
        <div className="mt-4 grid grid-cols-3 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-green-600">{activeWorkers.length}</div>
            <div className="text-xs text-gray-500">Active Workers</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {workers.filter(w => w.status === 'break').length}
            </div>
            <div className="text-xs text-gray-500">On Break</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">
              {workers.filter(w => w.status === 'offline').length}
            </div>
            <div className="text-xs text-gray-500">Offline</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default WorkerLocationMap;
