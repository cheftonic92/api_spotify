import axios from 'axios';

// Función para obtener el token de Spotify usando el Client ID y el Client Secret del archivo .env
export const getSpotifyToken = async () => {
  const clientId = process.env.REACT_APP_SPOTIFY_CLIENT_ID;
  const clientSecret = process.env.REACT_APP_SPOTIFY_CLIENT_SECRET;

  // URL para obtener el token
  const tokenUrl = 'https://accounts.spotify.com/api/token';

  // Parametros para la petición POST
  const params = new URLSearchParams();
  params.append('grant_type', 'client_credentials');

  // Headers necesarios para la autenticación básica
  const headers = {
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${btoa(`${clientId}:${clientSecret}`)}`, // Codificación Base64 de las credenciales
    },
  };

  try {
    // Solicitud del token de acceso
    const response = await axios.post(tokenUrl, params, headers);
    return response.data.access_token; // Retornamos el token de acceso
  } catch (error) {
    console.error('Error obteniendo el token de acceso', error);
    throw error; // Lanzamos un error en caso de fallo
  }
};

// Función para obtener datos de la banda (nombre, seguidores, popularidad, canción más popular)
export const getBandData = async (bandName, token) => {
  const searchUrl = `https://api.spotify.com/v1/search?q=${bandName}&type=artist`;

  const headers = {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  };

  try {
    const response = await axios.get(searchUrl, headers);

    // Verificamos que haya resultados
    if (!response.data.artists || response.data.artists.items.length === 0) {
      throw new Error(`No se encontró ningún artista con el nombre "${bandName}"`);
    }

    const artist = response.data.artists.items[0];

    // Verificamos que existan los datos clave
    if (!artist.name || !artist.external_urls || !artist.followers) {
      throw new Error(`Faltan datos clave para el artista "${bandName}"`);
    }

    const artistData = {
      name: artist.name,
      followers: artist.followers.total || 0,
      popularity: artist.popularity || 0,
      image: artist.images.length > 0 ? artist.images[1].url : null, // Verificamos si hay imágenes
      spotifyUrl: artist.external_urls.spotify,
      topTracks: [],
      firstAlbum: null,
      mostPopularAlbum: null,
      lastAlbum: null, // Añadimos el campo para el último álbum
    };

    // Obtener las canciones más populares
    const topTracksUrl = `https://api.spotify.com/v1/artists/${artist.id}/top-tracks?market=US`;
    const topTracksResponse = await axios.get(topTracksUrl, headers);
    artistData.topTracks = topTracksResponse.data.tracks.slice(0, 3).map(track => ({
      name: track.name,
      album: track.album.name,
      popularity: track.popularity,
      spotifyUrl: track.external_urls.spotify,
    }));

    // Obtener los álbumes del artista
    const albumsUrl = `https://api.spotify.com/v1/artists/${artist.id}/albums?include_groups=album&market=US&limit=50`;
    const albumsResponse = await axios.get(albumsUrl, headers);
    const albums = albumsResponse.data.items;

    if (albums.length > 0) {
      // Ordenar álbumes por fecha de lanzamiento para obtener el primero y el último
      const sortedAlbums = albums.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));

      // Primer álbum
      artistData.firstAlbum = {
        name: sortedAlbums[0]?.name || 'No disponible',
        releaseDate: sortedAlbums[0]?.release_date || 'No disponible',
        spotifyUrl: sortedAlbums[0]?.external_urls.spotify || '#',
      };

      // Último álbum (más reciente)
      artistData.lastAlbum = {
        name: sortedAlbums[sortedAlbums.length - 1]?.name || 'No disponible',
        releaseDate: sortedAlbums[sortedAlbums.length - 1]?.release_date || 'No disponible',
        spotifyUrl: sortedAlbums[sortedAlbums.length - 1]?.external_urls.spotify || '#',
      };

      // Encontrar el álbum con más canciones en el top 3 (como proxy para el más escuchado)
      const albumPopularity = {};
      artistData.topTracks.forEach((track) => {
        albumPopularity[track.album] = (albumPopularity[track.album] || 0) + track.popularity;
      });

      const mostPopularAlbum = Object.keys(albumPopularity).reduce((a, b) => (albumPopularity[a] > albumPopularity[b] ? a : b));
      const mostPopularAlbumData = albums.find((album) => album.name === mostPopularAlbum);

      artistData.mostPopularAlbum = {
        name: mostPopularAlbumData?.name || 'No disponible',
        releaseDate: mostPopularAlbumData?.release_date || 'No disponible',
        spotifyUrl: mostPopularAlbumData?.external_urls.spotify || '#',
      };
    }

    return artistData;
  } catch (error) {
    console.error(`Error obteniendo los datos de la banda ${bandName}`, error);
    throw error;
  }
};
