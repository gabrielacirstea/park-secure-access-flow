
import React from 'react';
import { AccessRecord, Vehicle, mockVehicles } from '@/lib/mockData';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowUpRight, ArrowDownLeft } from 'lucide-react';
import { format } from 'date-fns';

interface AccessHistoryItemProps {
  accessRecord: AccessRecord;
}

const AccessHistoryItem: React.FC<AccessHistoryItemProps> = ({ accessRecord }) => {
  // Find vehicle info
  const vehicle = mockVehicles.find(v => v.id === accessRecord.vehicleId);
  
  // Format the timestamp
  const formattedDate = format(new Date(accessRecord.timestamp), 'MMM dd, yyyy');
  const formattedTime = format(new Date(accessRecord.timestamp), 'h:mm a');
  
  return (
    <Card className="mb-3 card-shadow">
      <CardContent className="p-4">
        <div className="flex items-start">
          <div className={`p-2 rounded-full mr-3 ${accessRecord.type === 'entry' ? 'bg-green-100' : 'bg-red-100'}`}>
            {accessRecord.type === 'entry' ? (
              <ArrowDownLeft className="text-green-600" size={20} />
            ) : (
              <ArrowUpRight className="text-red-600" size={20} />
            )}
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <h4 className="font-medium">
                  {accessRecord.type === 'entry' ? 'Entered' : 'Exited'} {accessRecord.location}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {vehicle?.licensePlate} • {vehicle?.make} {vehicle?.model}
                </p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{formattedTime}</p>
                <p className="text-xs text-muted-foreground">{formattedDate}</p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default AccessHistoryItem;
