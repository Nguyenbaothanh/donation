import React from 'react';
import { DonationItem, DonationStatus } from '../types';

interface DonationCardProps {
    donation: DonationItem;
    isAdmin: boolean;
    onManage?: (donation: DonationItem) => void;
}

const getStatusColor = (status: DonationStatus) => {
    switch (status) {
        case DonationStatus.PENDING:
            return 'bg-yellow-100 text-yellow-800';
        case DonationStatus.APPROVED:
            return 'bg-blue-100 text-blue-800';
        case DonationStatus.DELIVERED:
            return 'bg-green-100 text-green-800';
        case DonationStatus.REJECTED:
            return 'bg-red-100 text-red-800';
        default:
            return 'bg-gray-100 text-gray-800';
    }
};

const DonationCard: React.FC<DonationCardProps> = ({ donation, isAdmin, onManage }) => {
    return (
        <div className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-xl">
            <div className="flex flex-col md:flex-row">
                <img className="h-48 w-full md:h-auto md:w-48 object-cover" src={donation.imageUrl} alt={donation.itemName} />
                <div className="p-6 flex flex-col justify-between flex-grow">
                    <div>
                        <div className="flex justify-between items-start">
                             <h3 className="text-xl font-bold text-gray-900">{donation.itemName}</h3>
                             <span className={`text-xs font-semibold mr-2 px-2.5 py-0.5 rounded-full ${getStatusColor(donation.status)}`}>
                                 {donation.status}
                             </span>
                        </div>
                        <p className="text-sm text-gray-500 mb-1">
                            Category: {donation.category} | Quantity: <span className="font-semibold">{donation.quantity}</span>
                        </p>
                        <p className="text-gray-700 mt-2 text-sm">{donation.description}</p>
                    </div>

                    {isAdmin && (
                         <div className="mt-4 p-3 bg-gray-50 rounded-md border text-sm text-gray-600 space-y-1">
                            <h4 className="text-sm font-semibold text-gray-800 mb-2">Donor Information</h4>
                            <p><strong>Name:</strong> {donation.donorName}</p>
                            <p><strong>Phone:</strong> {donation.donorPhoneNumber}</p>
                            <p><strong>Address:</strong> {donation.donorAddress}</p>
                        </div>
                    )}
                    
                    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mt-4">
                        <div className="text-sm text-gray-500">
                             {!isAdmin && <p>Donated by: {donation.donorName}</p>}
                             <p>Submitted: {donation.submittedAt.toLocaleDateString()}</p>
                        </div>
                        
                        {isAdmin && onManage && (
                           <div className="mt-4 sm:mt-0">
                                <button
                                     onClick={() => onManage(donation)}
                                     className="px-4 py-2 bg-teal-500 text-white text-sm font-semibold rounded-md hover:bg-teal-600 transition shadow"
                                >
                                     Manage
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DonationCard;