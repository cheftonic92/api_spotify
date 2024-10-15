import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import SearchArtist from './SearchArtist'; 
import { getSpotifyToken, getBandData } from '../service/ApiService'; 
import 'react-toastify/dist/ReactToastify.css';
import { FaPlus } from 'react-icons/fa';

const ArtistSelection = () => {
  const [showModal, setShowModal] = useState(false);
  const [artistData, setArtistData] = useState(null); 

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => setShowModal(false);

  const handleSearch = async (searchTerm) => {
    if (!searchTerm) {
      toast.error('Por favor ingresa un término de búsqueda');
      return;
    }

    try {
      const token = await getSpotifyToken(); 
      const artistData = await getBandData(searchTerm, token); 
      setArtistData(artistData); 
      handleCloseModal(); 
    } catch (error) {
      toast.error('Error al buscar el artista');
      console.error(error);
    }
  };

  return (
    <>
      <div className="artist-box">
        <div className="artist-image-container" onClick={handleOpenModal}>
          {artistData ? (
            <img
              src={artistData.image}
              alt={artistData.name}
              className="artist-image"
            />
          ) : (
            <div className="add-artist-container" onClick={handleOpenModal}>
                <FaPlus className="add-artist-icon" />
            </div>
          )}
        </div>

        {artistData && (
          <div className="artist-details">
            <p><strong>Nombre:</strong> {artistData.name}</p>
            <p><strong>Seguidores:</strong> {artistData.followers.toLocaleString()}</p>
            <p><strong>Primer Disco:</strong> {artistData.firstAlbum.name}
                {artistData.firstAlbum.releaseDate && 
                !isNaN(new Date(artistData.firstAlbum.releaseDate).getFullYear()) && 
                (<> ({new Date(artistData.firstAlbum.releaseDate).getFullYear()})</>)
                }
            </p>
            <p><strong>Último Disco:</strong> {artistData.lastAlbum.name}
                {artistData.lastAlbum.releaseDate && 
                !isNaN(new Date(artistData.lastAlbum.releaseDate).getFullYear()) && 
                (<> ({new Date(artistData.lastAlbum.releaseDate).getFullYear()})</>)
                }
            </p>
            <p><strong>Disco más escuchado:</strong> {artistData.mostPopularAlbum.name}
                {artistData.mostPopularAlbum.releaseDate && 
                !isNaN(new Date(artistData.mostPopularAlbum.releaseDate).getFullYear()) && 
                (<> ({new Date(artistData.mostPopularAlbum.releaseDate).getFullYear()})</>)
                }
            </p>
            <p><strong>Top 3 Canciones:</strong></p>
            <ul>
              {artistData.topTracks.map((track, index) => (
                <li key={index}>
                  {track.name} - <a href={track.spotifyUrl} target="_blank" rel="noopener noreferrer">Escuchar en Spotify</a>
                </li>
              ))}
            </ul>
            <p>
              <a href={artistData.spotifyUrl} target="_blank" rel="noopener noreferrer">
                Ver en Spotify
              </a>
            </p>
          </div>
        )}
      </div>

      <SearchArtist
        show={showModal}
        handleClose={handleCloseModal}
        handleSearch={handleSearch}
      />

      <ToastContainer />
    </>
  );
};

export default ArtistSelection;