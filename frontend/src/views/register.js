import React, { useState } from 'react';
import styles from './register.module.css'; // Importamos los estilos con CSS Modules

const Register = () => {
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    username: '',
    email: '',
    password: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Evita la recarga de la página
    try {
      const response = await fetch('http://localhost:5000/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        alert(data.message || 'Usuario registrado con éxito');
      } else {
        const error = await response.json();
        alert(error.message || 'Error al registrar usuario');
      }
    } catch (err) {
      alert('Error al conectar con el servidor');
    }
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Registro</h2>
      <form onSubmit={handleSubmit} className={styles.form}>
        <label htmlFor="nombre" className={styles.label}>Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label htmlFor="apellido" className={styles.label}>Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label htmlFor="apodo" className={styles.label}>Apodo:</label>
        <input
          type="text"
          id="apodo" name="username"
          value={formData.username}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label htmlFor="email" className={styles.label}>Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <label htmlFor="password" className={styles.label}>Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className={styles.input}
          required
        />

        <button type="submit" className={styles.submitBtn}>Registrarse</button>
      </form>
    </div>
  );
};

export default Register;