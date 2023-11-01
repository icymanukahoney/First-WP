import {useState, useEffect} from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import {ArrowLeft} from 'react-bootstrap-icons'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Post = () => {
    const {id} = useParams()
    // Loading state
    const [loading, setLoading] = useState(true)
    // set a state for the post
    const [post, setPost] = useState(null)
    // call useNavigate
    const navigate = useNavigate()

    // Set endpoint for a single post
    const endpoint = `${baseUrl}/posts/${id}?_embed`

    // useEffect
    useEffect(() => {
        axios.get(`${endpoint}`)
        .then((res) => {
            setPost(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [id])

    function getFeaturedImage(post) {
        if (post && post._embedded && post._embedded['wp:featuredmedia'] && post._embedded['wp:featuredmedia'][0].source_url ) {
            return post._embedded['wp:featuredmedia'][0].source_url
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
        <h2>Single Post</h2>
        <div key={post.slug} className='post-container-post'>
            <h4 className='title'>{post.title.rendered}</h4>
            <img src={getFeaturedImage(post)} alt="" />
            <div dangerouslySetInnerHTML={{__html: post.content.rendered}}/>
            <div className='key'>Key: {post.slug}</div>
        </div>
    </div>
  )
}

export default Post


