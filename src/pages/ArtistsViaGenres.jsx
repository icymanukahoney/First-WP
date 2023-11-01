import {useEffect, useState} from 'react'
import {Link, useParams, useNavigate} from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const GenreName = ({genre}) => {
    return (
        <>
            <h2>All Artists in Genre:</h2>
            <h3>Genre: {genre.name}</h3>
        </>
    )
}

const AllArtistsInGenre = ({params}) => {
    const [artists, setArtists] = useState([])

    const endpoint = `${baseUrl}/artists?genre=${params.id}&_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setArtists(res.data)
        })
        .catch((err) => console.log(err))
    }, [endpoint])

    const renderedArtists = artists.map((artist, index) => {
        function getFeaturedImage(artist) {
            if (artist && artist._embedded && artist._embedded['wp:featuredmedia'] && artist._embedded['wp:featuredmedia'][0].source_url ) {
                return artist._embedded['wp:featuredmedia'][0].source_url
            } else {
                return 'https://placehold.co/600x400'
            }
        }
        return (
            <div className='artist-container item-container' key={index}>
                <Link className='artists-link' to={`/artists/${artist.id}`}>
                    <img src={getFeaturedImage(artist)} alt={artist.title.rendered} />
                    <h4 className='name'>{artist.title.rendered}</h4>
                </Link>
            </div>
        )
    })

    return (
        <>
         {renderedArtists}
        </>
    )
}

const ArtistsViaGenres = () => {
    const [genre, setGenre] = useState({})
    const params = useParams()
    const navigate = useNavigate()

    const genreEndpoint = `${baseUrl}/genre/${params.id}`

    useEffect(() => {
        axios.get(`${genreEndpoint}`)
        .then((res) => {
            setGenre(res.data)
        })
        .catch((err) => console.log(err))
    }, [genreEndpoint])

  return (
    <div id="artists-via-genre" className='page-container'>
        <button onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        <GenreName genre={genre}/>
        <div id="artists-grid" className='grid-container'>
            <AllArtistsInGenre params={params}/>
        </div>
    </div>
  )
}

export default ArtistsViaGenres
