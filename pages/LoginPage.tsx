import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { User } from '../types';

type Page = 'home' | 'donate' | 'history' | 'admin' | 'login';
interface LoginPageProps {
    onNavigate: (page: Page) => void;
}

const MOCK_ACCOUNTS: { donor: User; admin: User } = {
    donor: {
        id: 'user-123',
        name: 'Jane Donor',
        email: 'jane.donor@example.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=jane.donor@example.com',
        role: 'donor',
    },
    admin: {
        id: 'admin-456',
        name: 'Admin User',
        email: 'admin@charityconnect.com',
        avatarUrl: 'https://i.pravatar.cc/150?u=admin@charityconnect.com',
        role: 'admin',
    },
};

const GoogleIcon = () => (
    <svg className="w-6 h-6 mr-3" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
        <path fill="#4285F4" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z"/>
        <path fill="#34A853" d="M43.611 20.083L42 20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" clipPath="url(#g)"/>
        <path fill="#FBBC05" d="M24 4v8h-7.961C14.158 8.154 18.941 4 24 4z"/>
        <path fill="#EA4335" d="M24 36c5.223 0 9.651-3.343 11.303-8H24v-8H4.389C6.034 30.657 12.7 36 24 36z"/>
        <path fill="none" d="M0 0h48v48H0z"/>
    </svg>
);


const LoginPage: React.FC<LoginPageProps> = ({ onNavigate }) => {
    const { login, loading } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleLogin = (role: 'donor' | 'admin') => {
        login(role);
        setIsModalOpen(false);
        onNavigate(role === 'admin' ? 'admin' : 'home');
    };

    return (
        <>
            <div className="flex items-center justify-center" style={{ minHeight: 'calc(100vh - 128px)' }}>
                <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-lg text-center">
                    <h2 className="text-3xl font-bold text-gray-900 mb-2">Welcome!</h2>
                    <p className="text-gray-600 mb-8">Sign in to continue your journey of giving.</p>
                    <div className="space-y-4">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            disabled={loading}
                            className="w-full inline-flex justify-center items-center py-3 px-4 border border-gray-300 rounded-lg shadow-sm bg-white text-base font-medium text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-teal-500 transition-all disabled:opacity-50"
                        >
                            <GoogleIcon />
                            {loading ? 'Signing in...' : 'Sign in with Google'}
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
                    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-sm">
                        <div className="flex justify-between items-center mb-4">
                            <h3 className="text-lg font-bold">Choose an account</h3>
                            <button onClick={() => setIsModalOpen(false)} className="text-gray-500 hover:text-gray-800">&times;</button>
                        </div>
                        <div className="space-y-3">
                           <div
                                onClick={() => handleLogin('donor')}
                                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer border"
                           >
                                <img src={MOCK_ACCOUNTS.donor.avatarUrl} alt="Donor" className="w-10 h-10 rounded-full" />
                                <div className="ml-3">
                                    <p className="font-semibold text-gray-800">{MOCK_ACCOUNTS.donor.name}</p>
                                    <p className="text-sm text-gray-500">{MOCK_ACCOUNTS.donor.email}</p>
                                </div>
                           </div>
                            <div
                                onClick={() => handleLogin('admin')}
                                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer border"
                            >
                                <img src={MOCK_ACCOUNTS.admin.avatarUrl} alt="Admin" className="w-10 h-10 rounded-full" />
                                <div className="ml-3">
                                    <p className="font-semibold text-gray-800">{MOCK_ACCOUNTS.admin.name}</p>
                                    <p className="text-sm text-gray-500">{MOCK_ACCOUNTS.admin.email}</p>
                                </div>
                           </div>
                        </div>
                         <p className="text-xs text-gray-400 mt-4 text-center">This is a simulated sign-in. Click an account to proceed.</p>
                    </div>
                </div>
            )}
        </>
    );
};

export default LoginPage;