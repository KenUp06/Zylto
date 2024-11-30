import React from 'react';
import './home.css'; // Archivo de estilos específico para la vista Home

function Home() {
  return (
    <div>
      <header>
        <div className="logo">
          <h1>Inventarios</h1>
        </div>
        <nav>
          <ul>
            <li><a href="/">Inicio</a></li>
            <li><a href="/about">Acerca de</a></li>
            <li><a href="/contactus">Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <div className="main-content">
          <h2>Bienvenido a Zylto - Sistema de Gestión de Inventarios</h2>
          <p>Administra tus inventarios de manera eficiente y sencilla.</p>
          <div className="buttons">
            <a href="login" className="btn">Iniciar sesión</a>
            <a href="register" className="btn">Registrarse</a>
          </div>
        </div>
      </main>

      <footer>
        <p>&copy; 2024 Inventarios. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
}

export default Home;