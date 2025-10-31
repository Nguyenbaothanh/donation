import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

type Page = 'home' | 'donate' | 'history' | 'admin' | 'login';

interface HeaderProps {
    onNavigate: (page: Page) => void;
    currentPage: Page;
}

const NavLink: React.FC<{
    onClick: () => void;
    isActive: boolean;
    children: React.ReactNode;
}> = ({ onClick, isActive, children }) => (
    <button
        onClick={onClick}
        className={`px-3 py-2 rounded-md text-sm font-medium transition-colors ${
            isActive
                ? 'bg-teal-500 text-white'
                : 'text-gray-700 hover:bg-gray-200 hover:text-gray-900'
        }`}
    >
        {children}
    </button>
);

const Header: React.FC<HeaderProps> = ({ onNavigate, currentPage }) => {
    const { user, logout } = useAuth();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const renderNavLinks = (isMobile: boolean = false) => {
        const closeMenu = isMobile ? () => setIsMenuOpen(false) : () => {};

        if (!user) return null;

        if (user.role === 'admin') {
            return <NavLink onClick={() => { onNavigate('admin'); closeMenu(); }} isActive={currentPage === 'admin'}>Admin Panel</NavLink>
        }

        return (
            <>
                <NavLink onClick={() => { onNavigate('donate'); closeMenu(); }} isActive={currentPage === 'donate'}>Donate</NavLink>
                <NavLink onClick={() => { onNavigate('history'); closeMenu(); }} isActive={currentPage === 'history'}>My History</NavLink>
            </>
        )
    }

    return (
        <nav className="bg-white shadow-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex items-center">
                        <div className="flex-shrink-0 cursor-pointer" onClick={() => onNavigate('home')}>
                             <svg className="h-8 w-8 text-teal-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v.01M12 6v-1h4v1m-4 0h-4v-1h4v1zm0 6.01V13m0 .01v-.01m0 2.01V15m0 .01v-.01m0-10a9 9 0 11-9 9h4.586a1 1 0 00.707-.293l2-2a1 1 0 000-1.414l-2-2a1 1 0 00-.707-.293H3a9 9 0 019-9z" />
                             </svg>
                        </div>
                        <span className="ml-2 font-bold text-xl text-gray-800">Charity Connect</span>
                        <div className="hidden md:block">
                            <div className="ml-10 flex items-baseline space-x-4">
                                {renderNavLinks()}
                            </div>
                        </div>
                    </div>
                    <div className="hidden md:block">
                        {user ? (
                            <div className="ml-4 flex items-center md:ml-6 relative">
                                <span className="text-gray-700 mr-3">Welcome, {user.name.split(' ')[0]}!</span>
                                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="max-w-xs bg-gray-800 rounded-full flex items-center text-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-white">
                                    <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                                </button>
                                {isProfileOpen && (
                                     <div className="origin-top-right absolute right-0 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5" style={{top: '100%'}}>
                                        <button onClick={() => { logout(); onNavigate('home'); setIsProfileOpen(false); }} className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Sign out</button>
                                    </div>
                                )}
                            </div>
                        ) : (
                            <button onClick={() => onNavigate('login')} className="bg-teal-500 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition">
                                Sign In
                            </button>
                        )}
                    </div>
                    <div className="-mr-2 flex md:hidden">
                        <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="bg-gray-100 inline-flex items-center justify-center p-2 rounded-md text-gray-700 hover:text-white hover:bg-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-white">
                            <span className="sr-only">Open main menu</span>
                            {isMenuOpen ? (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
                            ) : (
                                <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                            )}
                        </button>
                    </div>
                </div>
            </div>

            {isMenuOpen && (
                <div className="md:hidden">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                         {user ? (
                             <>
                                {renderNavLinks(true)}
                                <div className="border-t border-gray-200 my-2"></div>
                                 <div className="flex items-center px-3 py-2">
                                     <img className="h-8 w-8 rounded-full" src={user.avatarUrl} alt="" />
                                     <span className="ml-3 text-sm font-medium text-gray-700">{user.name}</span>
                                 </div>
                                <button onClick={() => { logout(); onNavigate('home'); setIsMenuOpen(false); }} className="block w-full text-left px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:bg-gray-200">Sign out</button>
                             </>
                         ) : (
                            <button onClick={() => {onNavigate('login'); setIsMenuOpen(false);}} className="block w-full text-left bg-teal-500 text-white px-3 py-2 rounded-md text-sm font-medium hover:bg-teal-600 transition">
                                Sign In
                            </button>
                         )}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Header;