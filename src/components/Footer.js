// src/components/Footer.js

import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="footer mt-auto py-3 bg-light mb-0">
      <div className="container text-center">
        <span className="text-muted">© 2024 Gestión de Proyectos. Todos los derechos reservados.</span>
        <div className="d-flex justify-content-center mt-2">
          <a href="https://github.com/cheftonic92" target="_blank" rel="noopener noreferrer" className="me-3">
            <FaGithub size={20} />
          </a>
          <a href="https://www.linkedin.com/in/antonio-barroso-s%C3%A1ez-895811ba/" target="_blank" rel="noopener noreferrer">
            <FaLinkedin size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
