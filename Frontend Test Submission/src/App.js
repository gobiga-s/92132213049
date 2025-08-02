// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import URLShortener from './components/URLShortener';
import Stats from './components/stats';

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<URLShortener />} />
      <Route path="/stats" element={<Stats />} />
    </Routes>
  </Router>
);

export default App;
