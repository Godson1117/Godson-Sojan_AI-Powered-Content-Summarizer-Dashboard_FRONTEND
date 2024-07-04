// src/App.js
import React from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="App">
      <header className="bg-gray-800 text-white p-4 text-center">
        <h1>AI Summary Dashboard</h1>
      </header>
      <main className="p-4">
        <Dashboard />
      </main>
    </div>
  );
};

export default App;
