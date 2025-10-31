import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { getDonations, updateDonationStatus, updateDonationQuantity } from '../services/donationService';
import { DonationItem, DonationStatus } from '../types';
import DonationList from '../components/DonationList';

const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode }> = ({ title, value, icon }) => (
    <div className="bg-white p-6 rounded-lg shadow-md flex items-center">
        <div className="bg-teal-100 text-teal-500 rounded-full p-3 mr-4">
            {icon}
        </div>
        <div>
            <p className="text-sm font-medium text-gray-500">{title}</p>
            <p className="text-2xl font-bold text-gray-900">{value}</p>
        </div>
    </div>
);

const AdminDashboard: React.FC = () => {
    const [donations, setDonations] = useState<DonationItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [managingDonation, setManagingDonation] = useState<DonationItem | null>(null);
    const [editQuantity, setEditQuantity] = useState(0);

    const fetchDonations = useCallback(async () => {
        try {
            setLoading(true);
            const allDonations = await getDonations();
            setDonations(allDonations);
        } catch (err) {
            setError('Failed to fetch donations.');
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        fetchDonations();
    }, [fetchDonations]);

    const handleOpenManageModal = (donation: DonationItem) => {
        setManagingDonation(donation);
        setEditQuantity(donation.quantity);
    };

    const handleCloseManageModal = () => {
        setManagingDonation(null);
    };

    const handleStatusUpdate = async (id: string, status: DonationStatus) => {
        try {
            await updateDonationStatus(id, status);
            fetchDonations(); // Refresh the list after update
            handleCloseManageModal();
        } catch (err) {
            alert('Failed to update status. Please try again.');
        }
    };

    const handleQuantityUpdate = async () => {
        if (!managingDonation) return;
        if (editQuantity < 0) {
            alert('Quantity cannot be negative.');
            return;
        }
        try {
            await updateDonationQuantity(managingDonation.id, editQuantity);
            fetchDonations(); // Refresh the list
            handleCloseManageModal();
        } catch (err) {
            alert('Failed to update quantity. Please try again.');
        }
    };
    
    const summaryStats = useMemo(() => {
        const totalDonations = donations.length;
        const totalItems = donations.reduce((sum, d) => sum + d.quantity, 0);
        const pendingCount = donations.filter(d => d.status === DonationStatus.PENDING).length;
        const uniqueDonors = new Set(donations.map(d => d.donorId)).size;
        
        return { totalDonations, totalItems, pendingCount, uniqueDonors };
    }, [donations]);

    const categoryStats = useMemo(() => {
        const stats: { [key: string]: { count: number; totalItems: number } } = {};
        donations.forEach(d => {
            if (!stats[d.category]) {
                stats[d.category] = { count: 0, totalItems: 0 };
            }
            stats[d.category].count++;
            stats[d.category].totalItems += d.quantity;
        });
        return Object.entries(stats).sort(([,a],[,b]) => b.totalItems - a.totalItems);
    }, [donations]);


    if (loading) {
        return <div className="flex justify-center items-center h-64"><div className="animate-spin rounded-full h-16 w-16 border-b-2 border-teal-500"></div></div>;
    }

    if (error) {
        return <div className="text-center text-red-500">{error}</div>;
    }

    return (
        <div className="max-w-7xl mx-auto space-y-8">
            <div>
                <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
                <p className="text-gray-600">Overview of all charitable activities.</p>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Donations" value={summaryStats.totalDonations} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>} />
                <StatCard title="Total Items Donated" value={summaryStats.totalItems} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" /></svg>} />
                <StatCard title="Pending Review" value={summaryStats.pendingCount} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>} />
                <StatCard title="Unique Donors" value={summaryStats.uniqueDonors} icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21a6 6 0 00-9-5.197m0 0A5.995 5.995 0 0012 12a5.995 5.995 0 00-3-5.197M15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>} />
            </div>

            {/* Category Breakdown */}
             <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Donations by Category</h2>
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th scope="col" className="px-6 py-3">Category</th>
                                <th scope="col" className="px-6 py-3">Total Items</th>
                                <th scope="col" className="px-6 py-3"># of Donations</th>
                            </tr>
                        </thead>
                        <tbody>
                            {categoryStats.map(([category, stats]) => (
                                <tr key={category} className="bg-white border-b hover:bg-gray-50">
                                    <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">{category}</th>
                                    <td className="px-6 py-4">{stats.totalItems}</td>
                                    <td className="px-6 py-4">{stats.count}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            <div>
                 <h2 className="text-2xl font-bold text-gray-900 mb-4">Manage Donations</h2>
                 <p className="text-gray-600 mb-6">Review and manage all incoming donations.</p>
                 <DonationList
                    donations={donations}
                    onManage={handleOpenManageModal}
                 />
            </div>

            {managingDonation && (
                <div className="fixed inset-0 bg-black bg-opacity-60 z-50 flex items-center justify-center p-4" aria-modal="true" role="dialog">
                    <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl max-h-[90vh] flex flex-col">
                        <div className="p-6 border-b flex justify-between items-center sticky top-0 bg-white z-10">
                            <h2 className="text-2xl font-bold text-gray-900">Manage Donation</h2>
                            <button onClick={handleCloseManageModal} className="text-gray-500 hover:text-gray-800 text-3xl font-light leading-none">&times;</button>
                        </div>
                        <div className="p-6 space-y-6 overflow-y-auto">
                            <div>
                                <h3 className="text-lg font-semibold text-gray-800 border-b pb-2 mb-3">{managingDonation.itemName}</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                                    <p><strong>Category:</strong> {managingDonation.category}</p>
                                    <p><strong>Current Quantity:</strong> {managingDonation.quantity}</p>
                                    <p><strong>Status:</strong> {managingDonation.status}</p>
                                    <p><strong>Submitted:</strong> {managingDonation.submittedAt.toLocaleDateString()}</p>
                                    <p className="md:col-span-2"><strong>Description:</strong> {managingDonation.description}</p>
                                </div>
                            </div>
                            <div className="p-4 bg-gray-50 rounded-md border text-sm text-gray-600 space-y-2">
                                <h4 className="text-base font-semibold text-gray-800">Donor Information</h4>
                                <p><strong>Name:</strong> {managingDonation.donorName}</p>
                                <p><strong>Phone:</strong> {managingDonation.donorPhoneNumber}</p>
                                <p><strong>Address:</strong> {managingDonation.donorAddress}</p>
                            </div>
                        </div>
                        <div className="p-6 bg-gray-50 border-t mt-auto">
                            <h3 className="text-lg font-semibold text-gray-800 mb-3">Actions</h3>
                            {managingDonation.status === DonationStatus.PENDING && (
                                 <div className="flex space-x-3">
                                    <button onClick={() => handleStatusUpdate(managingDonation.id, DonationStatus.APPROVED)} className="flex-1 px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Approve</button>
                                    <button onClick={() => handleStatusUpdate(managingDonation.id, DonationStatus.REJECTED)} className="flex-1 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Reject</button>
                                 </div>
                            )}
                            {[DonationStatus.APPROVED, DonationStatus.DELIVERED].includes(managingDonation.status) && (
                                <div className="flex flex-wrap items-center gap-3">
                                    <label htmlFor="edit-quantity" className="text-sm font-medium text-gray-700">Update Quantity:</label>
                                    <input
                                        type="number"
                                        id="edit-quantity"
                                        value={editQuantity}
                                        onChange={(e) => setEditQuantity(parseInt(e.target.value, 10))}
                                        className="w-24 px-2 py-1 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
                                        min="0"
                                    />
                                    <button onClick={handleQuantityUpdate} className="px-4 py-2 bg-blue-500 text-white text-sm rounded-md hover:bg-blue-600 transition disabled:bg-gray-400 disabled:cursor-not-allowed" disabled={editQuantity === managingDonation.quantity}>Save Changes</button>
                                </div>
                            )}
                             {![DonationStatus.PENDING, DonationStatus.APPROVED, DonationStatus.DELIVERED].includes(managingDonation.status) && (
                                <p className="text-sm text-gray-500">No actions available for this status.</p>
                             )}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default AdminDashboard;