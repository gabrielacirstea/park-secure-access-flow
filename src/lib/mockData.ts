
export interface User {
  id: string;
  name: string;
  email: string;
  role: 'employee' | 'admin';
  avatarUrl?: string;
}

export interface Vehicle {
  id: string;
  userId: string;
  licensePlate: string;
  make: string;
  model: string;
  color: string;
  isRegistered: boolean;
}

export interface AccessRecord {
  id: string;
  userId: string;
  vehicleId: string;
  timestamp: string;
  type: 'entry' | 'exit';
  location: string;
}

export interface ParkingLot {
  id: string;
  name: string;
  totalSpaces: number;
  availableSpaces: number;
}

// Mock data
export const mockUser: User = {
  id: '1',
  name: 'John Doe',
  email: 'john.doe@company.com',
  role: 'employee',
  avatarUrl: 'https://ui-avatars.com/api/?name=John+Doe'
};

export const mockVehicles: Vehicle[] = [
  {
    id: '1',
    userId: '1',
    licensePlate: 'ABC-1234',
    make: 'Toyota',
    model: 'Camry',
    color: 'Blue',
    isRegistered: true
  },
  {
    id: '2',
    userId: '1',
    licensePlate: 'XYZ-5678',
    make: 'Honda',
    model: 'Civic',
    color: 'Silver',
    isRegistered: true
  }
];

export const mockAccessHistory: AccessRecord[] = [
  {
    id: '1',
    userId: '1',
    vehicleId: '1',
    timestamp: '2025-04-10T08:30:00',
    type: 'entry',
    location: 'Main Gate'
  },
  {
    id: '2',
    userId: '1',
    vehicleId: '1',
    timestamp: '2025-04-10T17:45:00',
    type: 'exit',
    location: 'Main Gate'
  },
  {
    id: '3',
    userId: '1',
    vehicleId: '2',
    timestamp: '2025-04-09T09:15:00',
    type: 'entry',
    location: 'South Gate'
  },
  {
    id: '4',
    userId: '1',
    vehicleId: '2',
    timestamp: '2025-04-09T18:30:00',
    type: 'exit',
    location: 'South Gate'
  }
];

export const mockParkingLots: ParkingLot[] = [
  {
    id: '1',
    name: 'Main Parking',
    totalSpaces: 100,
    availableSpaces: 37
  },
  {
    id: '2',
    name: 'Executive Parking',
    totalSpaces: 20,
    availableSpaces: 8
  },
  {
    id: '3',
    name: 'Visitor Parking',
    totalSpaces: 30,
    availableSpaces: 15
  }
];
