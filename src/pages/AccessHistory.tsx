
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import Navbar from '@/components/Navbar';
import AccessHistoryItem from '@/components/AccessHistoryItem';
import { mockAccessHistory } from '@/lib/mockData';
import { format } from 'date-fns';

const AccessHistory = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  // Group access records by date
  const groupedRecords: Record<string, typeof mockAccessHistory> = {};
  
  mockAccessHistory.forEach(record => {
    const date = format(new Date(record.timestamp), 'yyyy-MM-dd');
    if (!groupedRecords[date]) {
      groupedRecords[date] = [];
    }
    groupedRecords[date].push(record);
  });

  // Sort dates in descending order
  const sortedDates = Object.keys(groupedRecords).sort((a, b) => 
    new Date(b).getTime() - new Date(a).getTime()
  );

  return (
    <div className="page-container pb-20">
      <h1 className="page-header">Access History</h1>
      
      {sortedDates.map(date => (
        <div key={date} className="mb-6">
          <h2 className="text-sm font-medium text-muted-foreground mb-3">
            {format(new Date(date), 'EEEE, MMMM d, yyyy')}
          </h2>
          <div>
            {groupedRecords[date]
              .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
              .map(record => (
                <AccessHistoryItem key={record.id} accessRecord={record} />
              ))
            }
          </div>
        </div>
      ))}

      {sortedDates.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No access records found</p>
        </div>
      )}
      
      <Navbar />
    </div>
  );
};

export default AccessHistory;
