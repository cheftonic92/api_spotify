import React, { useState, useRef, useEffect } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';

const SearchArtist = ({ show, handleClose, handleSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const inputRef = useRef(null); // Referencia para el input

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    handleSearch(searchTerm); // Llamamos a la función de búsqueda con el término ingresado
  };

  // Usamos useEffect para enfocar el input cuando se abra el modal
  useEffect(() => {
    if (show && inputRef.current) {
      inputRef.current.focus();
    }
  }, [show]);

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Buscar Artista/Banda</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form onSubmit={handleSubmit} className="search-form">
          <Form.Group controlId="formSearchArtist" className="d-flex">
            <Form.Control
              ref={inputRef} // Referencia para enfocar el input
              type="text"
              placeholder="Buscar..."
              value={searchTerm}
              onChange={handleChange}
              className="me-2" // Espaciado a la derecha para el botón
            />
            <Button variant="primary" type="submit">
              Buscar
            </Button>
          </Form.Group>
        </Form>
      </Modal.Body>
    </Modal>
  );
};

export default SearchArtist;
