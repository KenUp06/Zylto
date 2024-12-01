import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';  // Importa useNavigate
import apiClient from '../services/apiClient'; // Importa apiClient desde services
import styles from './workspace.module.css';
import Header from '../components/header'; 
import Footer from '../components/footer'; 
import CreateInventoryModal from '../components/create_inventory_modal';

const Workspace = () => {
  const [inventories, setInventories] = useState([]); // Estado para almacenar inventarios
  const [isModalOpen, setIsModalOpen] = useState(false); // Control del modal
  const navigate = useNavigate(); // Obtén el hook de navegación

  useEffect(() => {
    const fetchInventories = async () => {
      const token = localStorage.getItem('token'); // Obtén el token desde el almacenamiento local

      try {
        const response = await apiClient.get('/inventories', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Añade el token al header
          },
        });

        console.log('Inventarios obtenidos:', response.data); // Depuración
        setInventories(response.data); // Actualiza el estado con los datos
      } catch (error) {
        console.error('Error fetching inventories:', error.message); // Manejo de errores
      }
    };

    fetchInventories();
  }, []);

  const handleManage = (id) => {
    console.log(`Gestionando inventario con ID: ${id}`);
    // Redirige a la página de gestión de inventario
    navigate(`/inventory/${id}`);  // Aquí se redirige a la página de gestión del inventario
  };

  const handleDelete = async (id) => {
    if (window.confirm('¿Estás seguro de eliminar este inventario?')) {
      const token = localStorage.getItem('token');
      try {
        const response = await apiClient.delete(`/inventories/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        // Verificamos si la respuesta fue exitosa
        if (response.status === 200) {
          // Actualiza el estado eliminando el inventario borrado
          setInventories(inventories.filter((inventory) => inventory.idinventory !== id));
        }
      } catch (error) {
        console.error('Error deleting inventory:', error.message);
      }
    }
  };

  const handleCreateInventory = async (name) => {
    const token = localStorage.getItem('token');
    try {
        const response = await apiClient.post('/inventories', 
            { name: name },
            {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`, // Añade el token al header
                },
            }
        );

        // Si la creación es exitosa, agregar el inventario al estado
        if (response.status === 201) {
            setInventories((prevInventories) => [...prevInventories, response.data.inventory]);
        }
        setIsModalOpen(false); // Cierra el modal
    } catch (error) {
        console.error('Error creating inventory:', error.message);
    }
};


return (
  <div className={styles.workspace}>
    <Header />
    <main className={styles.main}>
      <h1 className={styles.title}>¡Bienvenido de vuelta!</h1>
      <div className={styles.grid}>
        {/* Botón de Crear Inventario como un item más en la grilla */}
        <div
          className={`${styles.card} ${styles.createCard}`}
          onClick={() => setIsModalOpen(true)}
        >
          <h2 className={styles.createText}>+ Crear Inventario</h2>
        </div>
        {inventories.length === 0 ? (
          <p>No hay inventarios disponibles</p>
        ) : (
          inventories.map((inventory) => (
            <div key={inventory.idinventory} className={styles.card}>
              <h2 className={styles.title}>{inventory.name}</h2>
              <div className={styles.buttons}>
                <button onClick={() => handleManage(inventory.idinventory)}>Gestionar</button>
                <button
                  onClick={() => handleDelete(inventory.idinventory)}
                  className={styles.deleteButton}
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </main>
    <Footer />
    {isModalOpen && (
      <CreateInventoryModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateInventory}
      />
    )}
  </div>
);
};

export default Workspace;
