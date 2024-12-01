import React from 'react';
import styles from './home.module.css'; // Importamos el archivo de estilos de manera modular
import Footer from '../components/footer';

function Home() {
  return (
    <div className={styles.container}> {/* Usamos la clase con el módulo CSS */}
      <header className={styles.header}>
        <div className={styles.logo}>
          <h1>Inventarios</h1>
        </div>
        <nav>
          <ul className={styles.navList}>
            <li><a href="/" className={styles.navLink}>Inicio</a></li>
            <li><a href="/about" className={styles.navLink}>Acerca de</a></li>
            <li><a href="/contactus" className={styles.navLink}>Contacto</a></li>
          </ul>
        </nav>
      </header>

      <main className={styles.main}>
        <div className={styles.mainContent}>
          <h2>Bienvenido a Zylto - Sistema de Gestión de Inventarios</h2>
          <p>Administra tus inventarios de manera eficiente y sencilla.</p>
          <div className={styles.buttons}>
            <a href="login" className={styles.btn}>Iniciar sesión</a>
            <a href="register" className={styles.btn}>Registrarse</a>
          </div>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Home;
