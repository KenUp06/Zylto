import React from 'react';
import apiClient from '../services/apiClient'; // Cliente Axios
import styles from './modal.module.css'; // Estilos del Modal

const DeleteArticleModal = ({ closeModal, articleId, refreshArticles }) => {
  const handleDelete = async () => {
    try {
      await apiClient.delete(`/articles/${articleId}`); // Llamada para eliminar artículo
      refreshArticles(); // Refrescamos la lista de artículos
      closeModal(); // Cerramos el modal
    } catch (error) {
      console.error('Error al eliminar el artículo', error);
    }
  };

  return (
    <div className={styles.modalOverlay}>
      <div className={styles.modal}>
        <h2>Eliminar Artículo</h2>
        <p>¿Estás seguro de que deseas eliminar este artículo?</p>
        <div className={styles.modalButtons}>
          <button type="button" onClick={closeModal}>Cancelar</button>
          <button type="button" onClick={handleDelete}>Eliminar</button>
        </div>
      </div>
    </div>
  );
};

export default DeleteArticleModal;
