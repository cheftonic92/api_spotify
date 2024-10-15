// src/components/Navbar.js

import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa'; // Importar iconos de react-icons
import ChefTonicLogo from '../images/ChefTonic_nobg.png';
import 'bootstrap/dist/css/bootstrap.min.css'; // Asegúrate de tener Bootstrap importado en tu proyecto

const Navbar = () => {
  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light border-bottom">
      <div className="container-fluid d-flex justify-content-between align-items-center flex-nowrap">
        {/* Marca con icono */}
        <div className="navbar-brand d-flex align-items-center" to="/">
          <img
            src={ChefTonicLogo} // Usa la imagen importada
            alt="ChefTonic Logo"
            style={{ height: '60px', margin: '10px' }} // Ajusta el tamaño y el margen
          />
        </div>

        {/* Título centrado de la Navbar */}
        <div className="flex-grow-1 d-flex justify-content-center">
          <h1 className="navbar-text text-center">
            Comparación de artistas
          </h1>
        </div>

        {/* Contenedor de los iconos a la derecha */}
        <div className="d-flex">
          <a
            href="https://github.com/cheftonic92"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <FaGithub size={40} />
          </a>
          <a
            href="https://www.linkedin.com/in/antonio-barroso-s%C3%A1ez-895811ba/"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-link"
          >
            <FaLinkedin size={40} />
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
