
import React from 'react';
import DonationForm from '../components/DonationForm';

const DonatePage: React.FC = () => {
    return (
        <div className="max-w-2xl mx-auto">
             <div className="bg-white rounded-lg shadow-xl p-8">
                <h1 className="text-3xl font-bold text-gray-900 mb-2">Make a Donation</h1>
                <p className="text-gray-600 mb-6">Fill out the form below to donate items. Your generosity is greatly appreciated!</p>
                <DonationForm />
            </div>
        </div>
    );
};

export default DonatePage;
