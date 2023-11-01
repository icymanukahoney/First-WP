import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Dino = () => {

    const {id} = useParams()
    // Loading state
    const [loading, setLoading] = useState(true)
    // set a state for the post
    const [dinosaur, setDinosaur] = useState(null)
    // call useNavigate
    const navigate = useNavigate()

    // Set endpoint for a single post
    const endpoint = `${baseUrl}/dinosaurs/${id}?_embed`

    // useEffect
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setDinosaur(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [id])

    function getFeaturedImage(dinosaur) {
        if (dinosaur && dinosaur._embedded && dinosaur._embedded['wp:featuredmedia'] && dinosaur._embedded['wp:featuredmedia'][0].source_url ) {
            return dinosaur._embedded['wp:featuredmedia'][0].source_url
        } else {
            return 'https://placehold.co/600x400'
        }
    }

    if (loading) {
        return <>Loading...</>
    }


  return (
    <div className='container'>
        <button onClick={() => navigate(-1)}><ArrowLeft/>Go Back</button>
        <h2>Dinosaur</h2>
        <div key={dinosaur.slug} className='dino-container'>
            <h4 className='title'>{dinosaur.title.rendered}</h4>
            <img src={getFeaturedImage(dinosaur)} alt="" />
            <div dangerouslySetInnerHTML={{__html: dinosaur.content.rendered}}/>
            <div className='key'>Key: {dinosaur.slug}</div>
        </div>
    </div>
  )
}

export default Dino

