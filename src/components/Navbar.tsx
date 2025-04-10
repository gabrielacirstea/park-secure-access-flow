
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { 
  Home, 
  Car, 
  History, 
  QrCode, 
  LogOut
} from 'lucide-react';

const Navbar: React.FC = () => {
  const { isAuthenticated, logout } = useAuth();
  const location = useLocation();

  if (!isAuthenticated) return null;

  const isActive = (path: string) => location.pathname === path;

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-2 z-10">
      <div className="flex justify-around items-center">
        <Link to="/dashboard" className={`flex flex-col items-center ${isActive('/dashboard') ? 'text-primary' : 'text-gray-500'}`}>
          <Home size={20} />
          <span className="text-xs">Home</span>
        </Link>
        <Link to="/vehicles" className={`flex flex-col items-center ${isActive('/vehicles') ? 'text-primary' : 'text-gray-500'}`}>
          <Car size={20} />
          <span className="text-xs">Vehicles</span>
        </Link>
        <Link to="/qrcode" className={`flex flex-col items-center ${isActive('/qrcode') ? 'text-primary' : 'text-gray-500'}`}>
          <QrCode size={20} />
          <span className="text-xs">Access</span>
        </Link>
        <Link to="/history" className={`flex flex-col items-center ${isActive('/history') ? 'text-primary' : 'text-gray-500'}`}>
          <History size={20} />
          <span className="text-xs">History</span>
        </Link>
        <Button 
          variant="ghost" 
          size="sm" 
          className="flex flex-col items-center text-gray-500 p-0"
          onClick={() => logout()}
        >
          <LogOut size={20} />
          <span className="text-xs">Logout</span>
        </Button>
      </div>
    </div>
  );
};

export default Navbar;
