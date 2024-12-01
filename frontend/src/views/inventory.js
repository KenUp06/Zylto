import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'; // Para obtener el id del inventario
import apiClient from '../services/apiClient'; // Cliente de Axios
import styles from './inventory.module.css';
import HeaderInventory from '../components/header_inventory'; // Encabezado del inventario
import CreateArticleModal from '../components/create_article_modal'; // Modal para crear artículo
import EditArticleModal from '../components/edit_article_modal'; // Modal para editar artículo
import jsPDF from 'jspdf';
import 'jspdf-autotable'; // Para usar tablas automáticamente

const Inventory = () => {
    const { id } = useParams(); // Obtiene el id del inventario de la URL
    const [articles, setArticles] = useState([]);
    const [isCreateModalOpen, setCreateModalOpen] = useState(false);
    const [isEditModalOpen, setEditModalOpen] = useState(false);
    const [selectedArticle, setSelectedArticle] = useState(null);

    useEffect(() => {
        const fetchArticles = async () => {
            try {
                const response = await apiClient.get(`/articles/inventory/${id}`);
                setArticles(response.data);
            } catch (error) {
                console.error("Error al obtener artículos:", error);
            }
        };

        if (id) {
            fetchArticles();
        }
    }, [id]);

    const generatePDF = () => {
        if (articles.length === 0) {
            alert("No hay artículos disponibles para generar el reporte.");
            return;
        }
    
        const doc = new jsPDF();
    
        // Título del reporte
        doc.setFontSize(18);
        doc.text('Reporte de Inventario', 10, 10);
    
        // Encabezados y filas de la tabla
        const tableColumn = ['Nombre', 'Cantidad', 'Precio Unitario', 'Precio Total'];
        const tableRows = articles.map(article => [
            article.name, // Ajusta estos campos a lo que recibes del backend
            article.amount,
            `$${article.price.toFixed(2)}`,
            `$${(article.price * article.amount).toFixed(2)}`
        ]);
    
        console.log("Artículos:", articles);

        // Generación de la tabla
        doc.autoTable({
            head: [tableColumn],
            body: tableRows,
            startY: 20, // Posición donde comienza la tabla
            theme: 'grid' // Tema de tabla
        });
    
        // Guarda el PDF
        doc.save('reporte_inventario.pdf');
    };

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
            const response = await apiClient.post(`/articles`, articleData);
            setArticles([...articles, { ...articleData, idarticle: response.data.articleId }]);
            setCreateModalOpen(false);
        } catch (error) {
            console.error("Error al crear artículo:", error);
        }
    };

    const handleEditClick = (article) => {
        setSelectedArticle(article);
        setEditModalOpen(true);
    };

    const handleEditArticle = async (updatedArticle) => {
        try {
            const updatedData = {
                ...updatedArticle,
                idinventory: selectedArticle.idinventory // Asegúrate de incluir el idinventory
            };
            await apiClient.put(`/articles/${selectedArticle.idarticle}`, updatedData);
            setArticles(prev =>
                prev.map(article =>
                    article.idarticle === selectedArticle.idarticle
                        ? { ...article, ...updatedArticle }
                        : article
                )
            );
            setEditModalOpen(false);
            setSelectedArticle(null);
        } catch (error) {
            console.error("Error al actualizar el artículo:", error);
        }
    };

    return (
        <div>
            <HeaderInventory generatePDF={generatePDF} />
            <main className={styles.main}>
                <div className={styles.tableContainer}>
                    <table className={styles.articleTable}>
                        <thead>
                            <tr>
                                <th>Nombre</th>
                                <th>Cantidad</th>
                                <th>Precio Unitario</th>
                                <th>Precio Total</th>
                                <th>Acciones</th>
                            </tr>
                        </thead>
                        <tbody>
                            {articles.map(article => (
                                <tr key={article.idarticle}>
                                    <td>{article.name}</td>
                                    <td>{article.amount}</td>
                                    <td>${article.price}</td>
                                    <td>${article.price * article.amount}</td>
                                    <td>
                                        <button onClick={() => handleEditClick(article)}>✏️</button>
                                        <button onClick={() => handleDeleteArticle(article.idarticle)}>🗑️</button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <button
                        className={styles.createArticleButton}
                        onClick={() => setCreateModalOpen(true)}
                    >
                        Crear Artículo
                    </button>
                </div>
            </main>

            {/* Modal para crear un artículo */}
            <CreateArticleModal
                isOpen={isCreateModalOpen}
                onClose={() => setCreateModalOpen(false)}
                onCreate={handleCreateArticle}
                idinventory={id} // Pasa el id del inventario al modal
            />

            {/* Modal para editar un artículo */}
            {selectedArticle && (
                <EditArticleModal
                    isOpen={isEditModalOpen}
                    onClose={() => setEditModalOpen(false)}
                    onEdit={handleEditArticle}
                    article={selectedArticle}
                />
            )}
        </div>
    );
};

export default Inventory;
