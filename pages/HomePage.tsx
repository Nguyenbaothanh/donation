
import React from 'react';
import { useAuth } from '../context/AuthContext';

type Page = 'home' | 'donate' | 'history' | 'admin' | 'login';

interface HomePageProps {
    onNavigate: (page: Page) => void;
}

const HomePage: React.FC<HomePageProps> = ({ onNavigate }) => {
    const { user } = useAuth();
    return (
        <div className="text-center">
            <div className="bg-white rounded-lg shadow-xl p-8 md:p-12 lg:p-16 max-w-4xl mx-auto">
                <h1 className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-4">
                    Welcome to <span className="text-teal-500">Charity Connect</span>
                </h1>
                <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
                    Your contribution can make a world of difference. We bridge the gap between your generosity and those in need.
                </p>
                <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
                    <button 
                        onClick={() => onNavigate(user ? 'donate' : 'login')}
                        className="bg-teal-500 text-white font-bold py-3 px-8 rounded-full hover:bg-teal-600 transform hover:scale-105 transition-all duration-300 ease-in-out shadow-lg"
                    >
                        Donate Now
                    </button>
                    <button 
                        onClick={() => onNavigate(user ? 'history' : 'login')}
                        className="bg-gray-200 text-gray-800 font-bold py-3 px-8 rounded-full hover:bg-gray-300 transform hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        View My Donations
                    </button>
                </div>
            </div>
             <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-teal-600 mb-2">Easy Giving</h3>
                    <p className="text-gray-600">Our simple donation process makes it easy for you to give items to those who need them most.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-teal-600 mb-2">Track Your Impact</h3>
                    <p className="text-gray-600">See the status of your donations and know when your contributions have been received.</p>
                </div>
                 <div className="bg-white p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-bold text-teal-600 mb-2">Transparent Process</h3>
                    <p className="text-gray-600">We ensure that your donations are managed efficiently and reach their intended recipients.</p>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
