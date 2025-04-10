
import React, { useState, useEffect } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import { Card, CardContent } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { mockVehicles } from '@/lib/mockData';
import { QrCode } from 'lucide-react';

const QRCodeAccess = () => {
  const { user, isAuthenticated } = useAuth();
  const [qrValue, setQrValue] = useState('');
  const [selectedVehicle, setSelectedVehicle] = useState(mockVehicles[0]?.id || '');
  const [accessType, setAccessType] = useState('entry');

  useEffect(() => {
    if (user && selectedVehicle) {
      // In a real app, this would be an encrypted or signed token
      const qrData = JSON.stringify({
        userId: user.id,
        vehicleId: selectedVehicle,
        type: accessType,
        timestamp: new Date().toISOString(),
        // In a real app, add a digital signature or token here
      });
      setQrValue(btoa(qrData)); // Simple base64 encoding
    }
  }, [user, selectedVehicle, accessType]);

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const vehicle = mockVehicles.find(v => v.id === selectedVehicle);

  return (
    <div className="page-container pb-20">
      <h1 className="page-header">Parking Access</h1>

      <Tabs defaultValue="entry" className="mb-6" onValueChange={setAccessType}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="entry">Entry</TabsTrigger>
          <TabsTrigger value="exit">Exit</TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="mb-6">
        <label htmlFor="vehicle-select" className="text-sm font-medium block mb-2">
          Select Vehicle
        </label>
        <Select 
          value={selectedVehicle} 
          onValueChange={setSelectedVehicle}
        >
          <SelectTrigger>
            <SelectValue placeholder="Select a vehicle" />
          </SelectTrigger>
          <SelectContent>
            {mockVehicles.map(vehicle => (
              <SelectItem key={vehicle.id} value={vehicle.id}>
                {vehicle.licensePlate} - {vehicle.make} {vehicle.model}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {vehicle ? (
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="mb-4">
              <h3 className="text-lg font-medium mb-1">
                {accessType === 'entry' ? 'Entry' : 'Exit'} QR Code
              </h3>
              <p className="text-sm text-muted-foreground mb-4">
                Scan at the {accessType === 'entry' ? 'entrance' : 'exit'} gate
              </p>
              
              <div className="bg-white p-4 rounded-lg inline-block shadow-lg mb-4">
                {qrValue ? (
                  <img
                    src={`https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=${qrValue}`}
                    alt="Access QR Code"
                    className="w-56 h-56 max-w-full"
                  />
                ) : (
                  <div className="w-56 h-56 flex items-center justify-center bg-gray-100">
                    <QrCode className="h-12 w-12 text-gray-400" />
                  </div>
                )}
              </div>
              
              <div className="text-sm">
                <p className="font-medium">{vehicle.licensePlate}</p>
                <p className="text-muted-foreground">
                  {vehicle.make} {vehicle.model} • {vehicle.color}
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      ) : (
        <Card className="p-6 text-center">
          <p>Please select a vehicle to generate QR code</p>
        </Card>
      )}
      
      <Navbar />
    </div>
  );
};

export default QRCodeAccess;
