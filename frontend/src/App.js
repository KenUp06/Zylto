import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './views/login.js';

function App() {
  return (
      <Router>
          <Routes>
              <Route path="/login" element={<Login />} />
          </Routes>
      </Router>
  );
}

export default App;