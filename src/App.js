import './App.css';
import Header from './components/header/header';
import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import AppointmentRoutes from './routes';

function App() {
  return (
    <div className="App">
      <Header />
      <BrowserRouter basename='/appointment'
      >
        <AppointmentRoutes/>
      </BrowserRouter>
    </div>
  );
}

export default App;
