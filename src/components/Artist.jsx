import {useState, useEffect} from 'react'
import {useParams, useNavigate, Link} from "react-router-dom"
import {ArrowLeft} from 'react-bootstrap-icons'
import axios from 'axios'
import { Helmet } from 'react-helmet'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Genres = ({artist}) => {
    const [taxonomies, setTaxonomies] = useState([])

    useEffect(() => {
        if (!artist) {
            return
        }

        const taxonomyEndpoint = artist._links["wp:term"][0].href

        axios.get(`${taxonomyEndpoint}`)
        .then((res) => {
            console.log('artist taxonomy call')
            setTaxonomies(res.data)
        })
        .catch((err) => console.log(err))
    }, [artist])

   const renderedTaxonomies = taxonomies.map((taxonomy, index) => {
        return (
            <Link to={`/genre/${taxonomy.id}`} key={index}>
                <span className='taxonomy-term-pill'>
                    {taxonomy.name}
                </span>
            </Link>
        )
   })
   return (
    <div>
        {renderedTaxonomies}
    </div>
)
}

const Artist = () => {
    const [artist, setArtist] = useState(null)
    const [loading, setLoading] = useState(true)
    const {id} = useParams()
    

    const navigate = useNavigate()

    const endpoint = `${baseUrl}/artists/${id}?_embed`

    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            console.log(res.data)
            setArtist(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    // set images
    function getFeaturedImage(artist) {
        if (artist && artist._embedded && artist._embedded['wp:featuredmedia'] && artist._embedded['wp:featuredmedia'][0].source_url ) {
            return artist._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }
    if (loading) {
        return <>Loading...</>
    }

    //const keywords = {
   //     keyword1: artist.acf.keyword1,
    //    keyword2: artist.acf.keyword2,
     //   keyword3: artist.acf.keyword3
   //     }

  return (

   <>
   <Helmet>
    <title>{artist.title.rendered}</title>
    <meta name='description' content={artist.acf.description}/>
    <meta name='keywords' content={`${artist.acf.keyword1}, ${artist.acf.keyword2}, ${artist.acf.keyword3}`}/>
 

   </Helmet>


    <div className='container-artist'>
        <button onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        <h2>Single Artist:</h2>
        <div key={artist.slug} className='post-container-artist'>
            <h4 className='title'>{artist.title.rendered}</h4>
            <img src={getFeaturedImage(artist)} alt="Post featured Image"/>
            <Genres artist={artist}/>
            <div dangerouslySetInnerHTML={{__html: artist.content.rendered}}/>
        </div>
    </div>
   </>
  )
}

export default Artist