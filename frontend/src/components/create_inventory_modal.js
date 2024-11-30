import React from 'react';
import styles from './create_inventory_modal.module.css';

const CreateInventoryModal = ({ isOpen, onClose, onCreate }) => {
    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        const inventoryName = e.target.inventoryName.value.trim();
        if (inventoryName) {
            onCreate(inventoryName); // Llama a la función onCreate pasando el nombre del inventario
        }
    };

    return (
        <div className={styles.modalOverlay}>
            <div className={styles.modal}>
                <h2>Crear Inventario</h2>
                <form onSubmit={handleSubmit}>
                    <label htmlFor="inventoryName">Nombre del Inventario</label>
                    <input 
                        type="text" 
                        id="inventoryName" 
                        name="inventoryName" 
                        placeholder="Escribe el nombre" 
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

export default CreateInventoryModal;
