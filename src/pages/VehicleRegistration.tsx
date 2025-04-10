
import React, { useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { mockVehicles } from '@/lib/mockData';
import Navbar from '@/components/Navbar';
import VehicleCard from '@/components/VehicleCard';
import { Car, Plus } from 'lucide-react';
import { toast } from 'sonner';

const VehicleRegistration = () => {
  const { isAuthenticated } = useAuth();
  const [showAddForm, setShowAddForm] = useState(false);
  const [licensePlate, setLicensePlate] = useState('');
  const [make, setMake] = useState('');
  const [model, setModel] = useState('');
  const [color, setColor] = useState('');
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, this would send data to the backend
    toast.success('Vehicle registration request submitted');
    setShowAddForm(false);
    // Reset form
    setLicensePlate('');
    setMake('');
    setModel('');
    setColor('');
  };

  return (
    <div className="page-container pb-20">
      <h1 className="page-header">My Vehicles</h1>
      
      {!showAddForm && (
        <div className="mb-6">
          <Button 
            onClick={() => setShowAddForm(true)}
            className="w-full"
          >
            <Plus className="mr-2 h-4 w-4" /> Add Vehicle
          </Button>
        </div>
      )}

      {showAddForm ? (
        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-lg">Register New Vehicle</CardTitle>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="licensePlate" className="text-sm font-medium">
                  License Plate
                </label>
                <Input
                  id="licensePlate"
                  value={licensePlate}
                  onChange={(e) => setLicensePlate(e.target.value)}
                  placeholder="ABC-1234"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="make" className="text-sm font-medium">
                  Make
                </label>
                <Input
                  id="make"
                  value={make}
                  onChange={(e) => setMake(e.target.value)}
                  placeholder="Toyota"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="model" className="text-sm font-medium">
                  Model
                </label>
                <Input
                  id="model"
                  value={model}
                  onChange={(e) => setModel(e.target.value)}
                  placeholder="Camry"
                  required
                />
              </div>
              
              <div className="space-y-2">
                <label htmlFor="color" className="text-sm font-medium">
                  Color
                </label>
                <Input
                  id="color"
                  value={color}
                  onChange={(e) => setColor(e.target.value)}
                  placeholder="Blue"
                  required
                />
              </div>
              
              <div className="flex space-x-2 pt-2">
                <Button 
                  type="button" 
                  variant="outline" 
                  className="flex-1"
                  onClick={() => setShowAddForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="flex-1">
                  Register
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      ) : (
        <>
          {mockVehicles.length > 0 ? (
            <div>
              {mockVehicles.map((vehicle) => (
                <VehicleCard 
                  key={vehicle.id} 
                  vehicle={vehicle} 
                  onClick={() => toast.info(`Vehicle details for ${vehicle.licensePlate}`)}
                />
              ))}
            </div>
          ) : (
            <Card className="text-center p-6">
              <div className="flex justify-center mb-4">
                <Car className="h-12 w-12 text-muted-foreground" />
              </div>
              <h3 className="text-lg font-medium mb-2">No Vehicles Registered</h3>
              <p className="text-muted-foreground mb-4">
                Add your first vehicle to access the parking facilities
              </p>
              <Button onClick={() => setShowAddForm(true)}>
                <Plus className="mr-2 h-4 w-4" /> Add Vehicle
              </Button>
            </Card>
          )}
        </>
      )}
      
      <Navbar />
    </div>
  );
};

export default VehicleRegistration;
