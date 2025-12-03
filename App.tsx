import React, { useState } from 'react';
import LandingPage from './components/LandingPage';
import Dashboard from './components/Dashboard';
import { ViewState } from './types';

const App: React.FC = () => {
  const [view, setView] = useState<ViewState>('landing');

  // Simple "Routing" logic
  const navigateToDashboard = () => setView('dashboard');
  const navigateToLanding = () => setView('landing');

  return (
    <>
      {view === 'landing' ? (
        <LandingPage onGetStarted={navigateToDashboard} />
      ) : (
        <Dashboard onLogout={navigateToLanding} />
      )}
    </>
  );
};

export default App;