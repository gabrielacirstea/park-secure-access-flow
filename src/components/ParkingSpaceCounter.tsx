
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { ParkingLot } from '@/lib/mockData';

interface ParkingSpaceCounterProps {
  parkingLot: ParkingLot;
}

const ParkingSpaceCounter: React.FC<ParkingSpaceCounterProps> = ({ parkingLot }) => {
  const occupancyPercentage = Math.round(
    ((parkingLot.totalSpaces - parkingLot.availableSpaces) / parkingLot.totalSpaces) * 100
  );
  
  const getStatusColor = (percentage: number) => {
    if (percentage > 90) return 'text-red-500';
    if (percentage > 70) return 'text-orange-500';
    return 'text-green-500';
  };

  return (
    <Card className="card-shadow">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">{parkingLot.name}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-between items-center mb-2">
          <span className={getStatusColor(occupancyPercentage)}>
            {parkingLot.availableSpaces} spaces available
          </span>
          <span className="text-sm text-muted-foreground">
            {occupancyPercentage}% occupied
          </span>
        </div>
        <Progress value={occupancyPercentage} className="h-2" />
      </CardContent>
    </Card>
  );
};

export default ParkingSpaceCounter;
