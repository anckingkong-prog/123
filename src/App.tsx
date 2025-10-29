import { useState, useEffect } from 'react';
import { GraduationCap, Building2, Wallet, ShieldCheck, Home } from 'lucide-react';
import LandingPage from './components/LandingPage';
import InstitutionDashboard from './components/InstitutionDashboard';
import StudentWallet from './components/StudentWallet';
import VerificationPortal from './components/VerificationPortal';
import { PageView } from './types/credential';

function App() {
  const [currentView, setCurrentView] = useState<PageView>('landing');

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.get('verify')) {
      setCurrentView('verify');
    }
  }, []);

  if (currentView === 'landing') {
    return <LandingPage onGetStarted={() => setCurrentView('institution')} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <nav className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center cursor-pointer" onClick={() => setCurrentView('landing')}>
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <span className="ml-2 text-xl font-bold text-gray-900">
                Academic Credentials
              </span>
            </div>
            <div className="flex space-x-1">
              <button
                onClick={() => setCurrentView('landing')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  currentView === 'landing'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Home className="w-4 h-4 mr-2" />
                Home
              </button>
              <button
                onClick={() => setCurrentView('institution')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  currentView === 'institution'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Building2 className="w-4 h-4 mr-2" />
                Institution
              </button>
              <button
                onClick={() => setCurrentView('student')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  currentView === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Student
              </button>
              <button
                onClick={() => setCurrentView('verify')}
                className={`px-4 py-2 rounded-lg font-medium transition-colors flex items-center ${
                  currentView === 'verify'
                    ? 'bg-blue-600 text-white'
                    : 'text-gray-600 hover:bg-gray-100'
                }`}
              >
                <ShieldCheck className="w-4 h-4 mr-2" />
                Verify
              </button>
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {currentView === 'institution' && <InstitutionDashboard />}
        {currentView === 'student' && <StudentWallet />}
        {currentView === 'verify' && <VerificationPortal />}
      </main>

      <footer className="bg-white border-t border-gray-200 mt-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="text-center text-sm text-gray-600">
            <p className="mb-2">
              Blockchain-Based Academic Credentials Platform
            </p>
            <p className="text-xs text-gray-500">
              Powered by Ethereum Sepolia, IPFS, and Soulbound Tokens
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
