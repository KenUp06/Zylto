import React, { useState } from 'react';
import './register.css'; // Estilos específicos del formulario

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
    <div className="container">
      <h2>Registro</h2>
      <form onSubmit={handleSubmit}>
        <label htmlFor="nombre">Nombre:</label>
        <input
          type="text"
          id="nombre"
          name="firstname"
          value={formData.firstname}
          onChange={handleChange}
          required
        />

        <label htmlFor="apellido">Apellido:</label>
        <input
          type="text"
          id="apellido"
          name="lastname"
          value={formData.lastname}
          onChange={handleChange}
          required
        />

        <label htmlFor="apodo">Apodo:</label>
        <input
          type="text"
          id="apodo"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />

        <label htmlFor="email">Correo Electrónico:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />

        <label htmlFor="password">Contraseña:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />

        <button type="submit">Registrarse</button>
      </form>
    </div>
  );
};

export default Register;