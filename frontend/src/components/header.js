import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import styles from './header.module.css';

const Header = () => {
  const navigate = useNavigate();  // Usa el hook useNavigate dentro del componente

  const handleLogout = () => {
    // Elimina el token y redirige al login
    localStorage.removeItem('token');
    navigate('/login');  // Redirige a la página de login
  };

  const handleProfile = () => {
    // Redirige a la página de perfil
    navigate('/profile');
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <span className={styles.logo}>Zilto</span>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleProfile}>Perfil</button>  {/* Redirige a perfil */}
          <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
};

export default Header;
