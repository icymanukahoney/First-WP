import React, { useEffect, useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'react-bootstrap-icons';
import axios from 'axios';
import { Hourglass } from 'react-loader-spinner';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const GenreName = ({ genre }) => {
  return (
    <>
    <div className='container-genre'>
      <h2>All Artists in Genre:</h2>
      <h3> Genre: {genre.name}</h3>
    </div>
    </>
  );
};

const AllArtistsInGenre = () => {
  const [artists, setArtists] = useState([]);

  useEffect(() => {
    const endpoint = `${baseUrl}/artists?genre=7&_embed`;
    axios
      .get(endpoint)
      .then((res) => {
        setArtists(res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const renderedArtists = artists.map((artist, index) => {
    function getFeaturedImage(artist) {
      if (
        artist &&
        artist._embedded &&
        artist._embedded['wp:featuredmedia'] &&
        artist._embedded['wp:featuredmedia'][0].source_url
      ) {
        return artist._embedded['wp:featuredmedia'][0].source_url;
      } else {
        return 'https://placehold.co/600x400';
      }
    }

    return (
      <div className='artist-container item-container' key={index}>
        <Link className='artists-link' to={`/artists/${artist.id}`}>
          <img src={getFeaturedImage(artist)} alt={artist.title.rendered} />
          <h4 className='name'>{artist.title.rendered}</h4>
        </Link>
      </div>
    );
  });

  return <div className='grid-container'>{renderedArtists}</div>;
};

const Electronic = () => {
  //const { id } = useParams();
  const [genre, setGenre] = useState({});
  const navigate = useNavigate();

  // Add loading state
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const genreEndpoint = `${baseUrl}/genre/7`;
    axios
      .get(genreEndpoint)
      .then((res) => {
        setGenre(res.data);

        // Set loading to false when data is fetched
        setLoading(false); 
      })
      .catch((err) => console.error(err));
  }, []);

  if (loading) {
    return (
      <div className="loader-container">
        <Hourglass
          visible={true}
          height={80}
          width={80}
          ariaLabel="hourglass-loading"
          wrapperStyle={{}}
          wrapperClass=""
          colors={['#306cce', '#72a1ed']}
        />
      </div>
    );
  }

  return (
    <div id='artists-via-genre' className='page-container'>
      <button onClick={() => navigate(-1)}>
        <ArrowLeft /> Go Back
      </button>
      <GenreName genre={genre} />
      <AllArtistsInGenre />
    </div>
  );
};

export default Electronic

