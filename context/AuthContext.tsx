
import React, { createContext, useState, useContext, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
    user: User | null;
    loading: boolean;
    login: (role: 'donor' | 'admin') => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const MOCK_DONOR_USER: User = {
    id: 'user-123',
    name: 'Jane Donor',
    email: 'jane.donor@example.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=jane.donor@example.com',
    role: 'donor',
};

const MOCK_ADMIN_USER: User = {
    id: 'admin-456',
    name: 'Admin User',
    email: 'admin@charityconnect.com',
    avatarUrl: 'https://i.pravatar.cc/150?u=admin@charityconnect.com',
    role: 'admin',
};

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUser] = useState<User | null>(null);
    const [loading, setLoading] = useState(false);

    const login = (role: 'donor' | 'admin') => {
        setLoading(true);
        // Simulate an API call
        setTimeout(() => {
            if (role === 'admin') {
                setUser(MOCK_ADMIN_USER);
            } else {
                setUser(MOCK_DONOR_USER);
            }
            setLoading(false);
        }, 1000);
    };

    const logout = () => {
        setLoading(true);
        setTimeout(() => {
            setUser(null);
            setLoading(false);
        }, 500);
    };

    return (
        <AuthContext.Provider value={{ user, loading, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }
    return context;
};
