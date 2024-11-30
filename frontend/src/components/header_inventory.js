import React from 'react';
import { useNavigate } from 'react-router-dom';  // Importa el hook useNavigate
import styles from './header_inventory.module.css';

const HeaderInventory = () => {
  const navigate = useNavigate();  // Usa el hook useNavigate dentro del componente

  const handleLogout = () => {
    // Elimina el token y redirige al login
    localStorage.removeItem('token');
    navigate('/login');  // Redirige a la página de login
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <span className={styles.logo}>Zylto</span>
        <div className={styles.buttons}>
          <button className={styles.button}>Generar reporte</button>
          <button className={styles.button}>Gestionar usuarios</button>
          <button className={styles.button}>Perfil</button>
          <button className={styles.button} onClick={handleLogout}>Cerrar sesión</button>
        </div>
      </div>
    </header>
  );
};

export default HeaderInventory;
