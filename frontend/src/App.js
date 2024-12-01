import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import ProtectedRoute from './services/ProtectedRoute.js';
import Login from './views/login.js';
import Home from './views/home.js';
import Register from './views/register.js';
import Workspace from './views/workspace.js';
import Inventory from './views/inventory.js';
import Profile from './views/profile.js';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/workspace"
          element={
            <ProtectedRoute>
              <Workspace />
            </ProtectedRoute>
          }
        />
        <Route 
          path="/inventory/:id" 
          element={
            <ProtectedRoute>
              <Inventory />
            </ProtectedRoute>
          } />

        <Route 
          path="/profile" // Nueva ruta para el perfil
          element={
            <ProtectedRoute>
              <Profile /> {/* Página de perfil */}
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;