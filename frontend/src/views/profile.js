import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa el hook useNavigate
import apiClient from '../services/apiClient'; // Importa apiClient para hacer solicitudes
import styles from './profile.module.css';

const Profile = () => {
  const [user, setUser] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [updatedUser, setUpdatedUser] = useState({}); // Estado para los datos actualizados
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        navigate('/login'); // Si no hay token, redirige a login
        return;
      }

      try {
        const response = await apiClient.get('/users/me', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUser(response.data);
        setUpdatedUser(response.data); // Inicializa los datos para el modo de edición
      } catch (error) {
        console.error('Error fetching user data:', error.message);
        navigate('/login'); // Si ocurre un error, redirige a login
      }
    };

    fetchUserData();
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    if (!token) return;

    try {
      const response = await apiClient.put('/users/me', updatedUser, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUser(updatedUser); // Actualiza los datos del usuario en el estado
        setEditMode(false); // Sale del modo de edición
      }
    } catch (error) {
      console.error('Error updating user data:', error.message);
    }
  };

  return (
    <div className={styles.profile}>
      <h1>Mi Perfil</h1>
      {user ? (
        <div className={styles.profileContainer}>
          <div className={styles.profileData}>
            <div>
              <label>Nombre:</label>
              {editMode ? (
                <input
                  type="text"
                  name="firstname"
                  value={updatedUser.firstname || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.firstname}</p>
              )}
            </div>
            <div>
              <label>Apellido:</label>
              {editMode ? (
                <input
                  type="text"
                  name="lastname"
                  value={updatedUser.lastname || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.lastname}</p>
              )}
            </div>
            <div>
              <label>Nombre de usuario:</label>
              {editMode ? (
                <input
                  type="text"
                  name="username"
                  value={updatedUser.username || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.username}</p>
              )}
            </div>
            <div>
              <label>Correo electrónico:</label>
              {editMode ? (
                <input
                  type="email"
                  name="email"
                  value={updatedUser.email || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.email}</p>
              )}
            </div>
            <div>
              <label>Teléfono:</label>
              {editMode ? (
                <input
                  type="text"
                  name="phone"
                  value={updatedUser.phone || ''}
                  onChange={handleChange}
                />
              ) : (
                <p>{user.phone}</p>
              )}
            </div>
          </div>

          <div className={styles.buttons}>
            {editMode ? (
              <>
                <button className={styles.saveButton} onClick={handleUpdate}>
                  Guardar Cambios
                </button>
                <button className={styles.cancelButton} onClick={() => setEditMode(false)}>
                  Cancelar
                </button>
              </>
            ) : (
              <button className={styles.editButton} onClick={() => setEditMode(true)}>
                Editar
              </button>
            )}
          </div>
        </div>
      ) : (
        <p>Cargando...</p>
      )}
    </div>
  );
};

export default Profile;
