import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Importa useParams para acceder al id del inventario
import apiClient from '../services/apiClient';  // Importamos el cliente de Axios
import styles from './inventory.module.css';
import HeaderInventory from '../components/header_inventory';  // Importamos el nuevo header
import CreateArticleModal from '../components/create_article_modal'; // Importamos la ventana modal

const Inventory = () => {
  const { id } = useParams();  // Obtenemos el id del inventario de la URL
  const [articles, setArticles] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false); // Estado para la ventana modal

  useEffect(() => {
    const fetchArticles = async () => {
      try {
        const response = await apiClient.get(`/articles/inventory/${id}`);  // Enviamos el id del inventario en la petición
        setArticles(response.data);
      } catch (error) {
        console.error("Error al obtener artículos:", error);
      }
    };

    if (id) {
      fetchArticles();  // Solo intentamos obtener artículos si el id está disponible
    }
  }, [id]);  // Dependencia de useEffect: cuando el id cambia, vuelve a hacer la petición

  const handleDeleteArticle = async (articleId) => {
    try {
      await apiClient.delete(`/articles/${articleId}`);
      setArticles(articles.filter(article => article.idarticle !== articleId));
    } catch (error) {
      console.error("Error al eliminar artículo:", error);
    }
  };

  const handleCreateArticle = async (articleData) => {
    try {
        console.log("Enviando datos al backend:", articleData); // Agrega un log aquí
        const response = await apiClient.post(`/articles`, articleData);
        setArticles([...articles, { ...articleData, idarticle: response.data.articleId }]);
        setModalOpen(false);
    } catch (error) {
        console.error("Error al crear artículo:", error);
    }
};


  return (
    <div>
      <HeaderInventory />
      <main className={styles.main}>
        <h2>Artículos en Inventario: {id}</h2>  {/* Mostramos el id del inventario */}
        <div className={styles.articleList}>
          {articles.map(article => (
            <div key={article.idarticle} className={styles.articleCard}>
              <span>{article.name}</span>
              <span>{article.amount}</span> {/* Cambiar quantity por amount */}
              <span>${article.price}</span> {/* Cambiar unitPrice por price */}
              <button onClick={() => {/* Función para editar */}}>✏️</button>
              <button onClick={() => handleDeleteArticle(article.idarticle)}>🗑️</button>
            </div>
          ))}
        </div>

        <button 
          className={styles.createArticleButton} 
          onClick={() => setModalOpen(true)} // Abre la ventana modal
        >
          Crear Artículo
        </button>
      </main>
      <CreateArticleModal 
    isOpen={isModalOpen} 
    onClose={() => setModalOpen(false)} 
    onCreate={handleCreateArticle} 
    idinventory={id} // Asegúrate de que 'id' sea el ID correcto
/>

    </div>
  );
};

export default Inventory;
