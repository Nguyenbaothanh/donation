import React, { useState } from 'react';
import { AuthProvider, useAuth } from './context/AuthContext';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import DonatePage from './pages/DonatePage';
import HistoryPage from './pages/HistoryPage';
import AdminDashboard from './pages/AdminDashboard';

type Page = 'home' | 'donate' | 'history' | 'admin' | 'login';

const AppContent: React.FC = () => {
    const [currentPage, setCurrentPage] = useState<Page>('home');
    const { user, loading } = useAuth();

    const navigate = (page: Page) => {
        if (!user && (page === 'donate' || page === 'history' || page === 'admin')) {
            setCurrentPage('login');
        } else {
            setCurrentPage(page);
        }
    };
    
    const renderPage = () => {
        if (loading) {
             return <div className="flex justify-center items-center h-screen"><div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div></div>;
        }

        if (!user) {
            return <LoginPage onNavigate={navigate} />;
        }

        switch (currentPage) {
            case 'home':
                return <HomePage onNavigate={navigate} />;
            case 'donate':
                // Redirect admin from donate page to their dashboard
                return user.role === 'admin' ? <AdminDashboard /> : <DonatePage />;
            case 'history':
                return <HistoryPage />;
            case 'admin':
                return user.role === 'admin' ? <AdminDashboard /> : <HomePage onNavigate={navigate} />;
            default:
                return <HomePage onNavigate={navigate} />;
        }
    };

    return (
        <div className="bg-gray-50 min-h-screen font-sans text-gray-800">
            <Header onNavigate={navigate} currentPage={currentPage} />
            <main className="p-4 md:p-8">
                {renderPage()}
            </main>
        </div>
    );
};

const App: React.FC = () => {
    return (
        <AuthProvider>
            <AppContent />
        </AuthProvider>
    );
};

export default App;