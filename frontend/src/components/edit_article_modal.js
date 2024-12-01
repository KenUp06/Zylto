import React, { useState } from "react";
import styles from "./edit_article_modal.module.css";

const EditArticleModal = ({ isOpen, onClose, onEdit, article }) => {
    const [formData, setFormData] = useState({
        name: article.name || "",
        amount: article.amount || 0,
        price: article.price || 0,
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: name === "amount" || name === "price" ? Number(value) : value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (formData.name && formData.amount > 0 && formData.price > 0) {
            onEdit(formData);
            onClose();
        } else {
            console.error("Datos inválidos. Por favor, revisa los campos.");
        }
    };

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Editar Artículo</h2>
                <form onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label htmlFor="name">Nombre</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="amount">Cantidad</label>
                        <input
                            type="number"
                            id="amount"
                            name="amount"
                            value={formData.amount}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label htmlFor="price">Precio</label>
                        <input
                            type="number"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className={styles.buttons}>
                        <button type="submit" className={styles.saveButton}>Guardar</button>
                        <button type="button" className={styles.cancelButton} onClick={onClose}>
                            Cancelar
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditArticleModal;
