import React from 'react';
import { DonationItem } from '../types';
import { useAuth } from '../context/AuthContext';
import DonationCard from './DonationCard';

interface DonationListProps {
    donations: DonationItem[];
    onManage?: (donation: DonationItem) => void;
}

const DonationList: React.FC<DonationListProps> = ({ donations, onManage }) => {
    const { user } = useAuth();
    
    if (donations.length === 0) {
        return (
             <div className="text-center bg-white p-12 rounded-lg shadow-md">
                <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                    <path vectorEffect="non-scaling-stroke" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 13h6m-3-3v6m-9 1V7a2 2 0 012-2h6l2 2h6a2 2 0 012 2v8a2 2 0 01-2-2H5a2 2 0 01-2-2z" />
                </svg>
                <h3 className="mt-2 text-sm font-medium text-gray-900">No donations found</h3>
                <p className="mt-1 text-sm text-gray-500">Get started by making your first donation.</p>
            </div>
        );
    }
    
    return (
        <div className="space-y-6">
            {donations.map(donation => (
                <DonationCard 
                    key={donation.id} 
                    donation={donation} 
                    isAdmin={user?.role === 'admin'}
                    onManage={onManage}
                />
            ))}
        </div>
    );
};

export default DonationList;