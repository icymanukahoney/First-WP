import {useEffect, useState} from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL
console.log(baseUrl);

const Artists = () => {
    const [loading, setLoading] = useState(true)
    const [artists, setArtists] = useState(null)

    const endpoint = `${baseUrl}/artists?_embed`

    useEffect(() => {
        axios.get(endpoint)
        .then((res) => {
            console.log(res.data)
            setArtists(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Artists = ({artists}) => {
        const mappedArtists = artists.map((artist, index) => {
            return (
                <div key={artist.slug + "-" + index} className='artist-container'>
                    <h4 className='title'>{artist.title.rendered}</h4>
                    <div dangerouslySetInnerHTML={{__html: artist.excerpt.rendered}}/>
                    <li>
                        <a href={`#/artists/${artist.id}`}>Read More...</a>
                    </li>
                </div>
            )
        })
        return (
            <>
                {mappedArtists}
            </>
        )
    }



  return (
    <div>
    <h2>Artists:</h2>
    <div>
        {loading ? <p>Loading...</p> : <Artists artists={artists}/>}
    </div>
</div>
  )
}

export default Artists
