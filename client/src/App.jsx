import React from 'react';
import { Route, Routes } from 'react-router-dom';
import HomePage from './components/HomePage';
import RegisterPage from './components/RegisterPage';
import ClaimPage from './components/ClaimPage';
import InvestorPage from './components/InvestorPage';
import { InsuranceProvider } from './InsuranceContext.jsx';

const App = () => {
  return (
    <InsuranceProvider>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/claim" element={<ClaimPage />} />
        <Route path="/investor" element={<InvestorPage />} />
      </Routes>
    </InsuranceProvider>
  );
};

export default App;
