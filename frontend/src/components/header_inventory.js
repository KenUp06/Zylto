import React from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import jsPDF from 'jspdf'; // Importa jsPDF
import 'jspdf-autotable'; // Importa el complemento para tablas
import styles from './header_inventory.module.css';
import apiClient from '../services/apiClient'; // Cliente Axios para interactuar con el backend

const HeaderInventory = ({ idInventory }) => {
  const navigate = useNavigate(); // Usa el hook useNavigate dentro del componente

  const handleLogout = () => {
    // Elimina el token y redirige al login
    localStorage.removeItem('token');
    navigate('/login'); // Redirige a la página de login
  };

  const handleGenerateReport = async () => {
    try {
      // Solicita los datos de los artículos al backend
      const response = await apiClient.get(`/articles/inventory/${idInventory}`);
      const articles = response.data;

      // Crea un nuevo documento PDF
      const doc = new jsPDF();
      doc.text('Reporte de Inventario', 10, 10);

      // Agrega una tabla al PDF con los datos de los artículos
      doc.autoTable({
        head: [['Nombre', 'Cantidad', 'Precio Unitario', 'Precio Total']],
        body: articles.map(article => [
          article.name,
          article.amount,
          `$${article.price.toFixed(2)}`,
          `$${(article.price * article.amount).toFixed(2)}`
        ]),
        startY: 20
      });

      // Descarga el archivo PDF
      doc.save('reporte_inventario.pdf');
    } catch (error) {
      console.error('Error al generar el reporte:', error);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.navbar}>
        <span className={styles.logo}>Zylto</span>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={handleGenerateReport}>
            Generar reporte
          </button>
          <button className={styles.button}>Gestionar usuarios</button>
          <button className={styles.button}>Perfil</button>
          <button className={styles.button} onClick={handleLogout}>
            Cerrar sesión
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderInventory;
