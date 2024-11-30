import React from 'react';
import styles from './create_article_modal.module.css';

const CreateArticleModal = ({ isOpen, onClose, onCreate }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const articleData = {
            name: e.target.name.value.trim(),
            amount: Number(e.target.quantity.value), // Cambiar 'quantity' por 'amount'
            price: Number(e.target.unitPrice.value), // Cambiar 'unitPrice' por 'price'
            idinventory: 39, // ID de inventario estático o dinámico según contexto
        };
        if (articleData.name && articleData.amount > 0 && articleData.price > 0) {
            onCreate(articleData);
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Crear Artículo</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="name">Nombre</label>
                    <input 
                        type="text" 
                        id="name" 
                        name="name" 
                        placeholder="Nombre del artículo" 
                        required 
                    />
                    <label htmlFor="quantity">Cantidad</label>
                    <input 
                        type="number" 
                        id="quantity" 
                        name="quantity" 
                        placeholder="Cantidad" 
                        min="1" 
                        required 
                    />
                    <label htmlFor="unitPrice">Precio Unitario</label>
                    <input 
                        type="number" 
                        id="unitPrice" 
                        name="unitPrice" 
                        placeholder="Precio unitario" 
                        min="0.01" 
                        step="0.01" 
                        required 
                    />
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.createButton}>Crear</button>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>Cancelar</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CreateArticleModal;
