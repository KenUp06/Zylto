import React from 'react';
import { Navigate } from 'react-router-dom';

// Componente que verifica si el usuario está autenticado
const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem('token'); // Verificar el token en el localStorage

  if (!token) {
    // Si no hay token, redirige al usuario a la página de inicio de sesión
    return <Navigate to="/login" />;
  }

  // Si el token existe, renderiza los hijos (rutas protegidas)
  return children;
};

export default ProtectedRoute;