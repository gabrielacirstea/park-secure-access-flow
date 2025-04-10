
import React from 'react';
import { useAuth } from '@/context/AuthContext';
import { Navigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Navbar from '@/components/Navbar';
import ParkingSpaceCounter from '@/components/ParkingSpaceCounter';
import { mockParkingLots, mockVehicles } from '@/lib/mockData';
import { Link } from 'react-router-dom';
import { Car, History, QrCode, UserCircle } from 'lucide-react';

const Dashboard = () => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="page-container pb-20">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">ParkSecure</h1>
        <div className="flex items-center">
          <span className="mr-2 text-sm">{user?.name}</span>
          {user?.avatarUrl ? (
            <img 
              src={user.avatarUrl} 
              alt={user.name} 
              className="w-8 h-8 rounded-full" 
            />
          ) : (
            <UserCircle className="w-8 h-8" />
          )}
        </div>
      </div>

      <Card className="mb-6 bg-primary text-primary-foreground">
        <CardContent className="pt-6">
          <h2 className="text-xl font-medium mb-2">Welcome, {user?.name.split(' ')[0]}</h2>
          <p className="text-primary-foreground/80 mb-4">
            Your parking access is active
          </p>
          <div className="flex space-x-2">
            <Button 
              variant="secondary" 
              className="flex-1"
              size="sm"
              asChild
            >
              <Link to="/qrcode">
                <QrCode className="mr-1 h-4 w-4" />
                Show QR Code
              </Link>
            </Button>
          </div>
        </CardContent>
      </Card>

      <h2 className="text-xl font-semibold mb-4">Parking Availability</h2>
      <div className="space-y-4 mb-6">
        {mockParkingLots.map(lot => (
          <ParkingSpaceCounter key={lot.id} parkingLot={lot} />
        ))}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-6">
        <Card className="card-shadow">
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center">
              <Car className="mr-2 h-4 w-4" />
              My Vehicles
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-semibold">{mockVehicles.length}</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-primary"
              asChild
            >
              <Link to="/vehicles">View All</Link>
            </Button>
          </CardContent>
        </Card>

        <Card className="card-shadow">
          <CardHeader className="p-4">
            <CardTitle className="text-base flex items-center">
              <History className="mr-2 h-4 w-4" />
              Recent Activity
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 pt-0">
            <p className="text-2xl font-semibold">2 Today</p>
            <Button 
              variant="ghost" 
              size="sm" 
              className="w-full mt-2 text-primary"
              asChild
            >
              <Link to="/history">View History</Link>
            </Button>
          </CardContent>
        </Card>
      </div>

      <Navbar />
    </div>
  );
};

export default Dashboard;
