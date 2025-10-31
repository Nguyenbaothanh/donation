
import React, { useState, useEffect } from 'react';
import { getDonationsByUserId } from '../services/donationService';
import { useAuth } from '../context/AuthContext';
import { DonationItem } from '../types';
import DonationList from '../components/DonationList';

const HistoryPage: React.FC = () => {
    const [donations, setDonations] = useState<DonationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { user } = useAuth();

    useEffect(() => {
        const fetchDonations = async () => {
            if (!user) return;
            try {
                setLoading(true);
                const userDonations = await getDonationsByUserId(user.id);
                setDonations(userDonations);
            } catch (err) {
                setError('Failed to fetch donation history.');
            } finally {
                setLoading(false);
            }
        };

        fetchDonations();
    }, [user]);

    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div></div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-6xl mx-auto">
             <h1 className="text-3xl font-bold text-gray-900 mb-6">My Donation History</h1>
             <DonationList donations={donations} />
        </div>
    );
};

export default HistoryPage;
