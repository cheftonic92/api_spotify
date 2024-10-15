import React from 'react';
import { useState } from 'react';
import ArtistSelection from './components/ArtistSelection';
import './App.css';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { ToastContainer } from 'react-toastify';

function App() {

  const [artists, setArtists] = useState([<ArtistSelection key={0} />]);

  // Añadir una nueva caja de selección de artista
  const addArtist = () => {
    setArtists([...artists, <ArtistSelection key={artists.length} />]);
  };

  return (
    <div className="App">
      <Navbar />
      <ToastContainer />
      <h1 className='text-center mb-5 mt-3'>Compara tus artistas favoritos</h1>
      <div className="artist-container">
        {artists.map((artist) => artist)} {/* Renderizamos todas las cajas */}
      </div>
      <button className="add-artist-btn" onClick={addArtist}>
        Añadir Artista
      </button>
      <Footer />
    </div>
  );
}

export default App;
