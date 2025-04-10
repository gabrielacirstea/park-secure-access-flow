
import React from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Vehicle } from '@/lib/mockData';
import { Badge } from '@/components/ui/badge';
import { Car } from 'lucide-react';

interface VehicleCardProps {
  vehicle: Vehicle;
  onClick?: () => void;
}

const VehicleCard: React.FC<VehicleCardProps> = ({ vehicle, onClick }) => {
  return (
    <Card className="card-shadow cursor-pointer mb-4" onClick={onClick}>
      <CardHeader className="pb-2 flex flex-row justify-between items-center">
        <div className="flex items-center">
          <Car className="mr-2 text-primary" size={20} />
          <span className="font-bold">{vehicle.licensePlate}</span>
        </div>
        <Badge variant={vehicle.isRegistered ? "default" : "outline"}>
          {vehicle.isRegistered ? "Registered" : "Pending"}
        </Badge>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <p className="text-muted-foreground">Make</p>
            <p>{vehicle.make}</p>
          </div>
          <div>
            <p className="text-muted-foreground">Model</p>
            <p>{vehicle.model}</p>
          </div>
          <div className="col-span-2">
            <p className="text-muted-foreground">Color</p>
            <div className="flex items-center">
              <div 
                className="w-4 h-4 rounded-full mr-2" 
                style={{ backgroundColor: vehicle.color.toLowerCase() }}
              ></div>
              <p>{vehicle.color}</p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VehicleCard;
