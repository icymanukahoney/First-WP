import {useState, useEffect} from 'react'
import axios from 'axios'

const baseUrl = import.meta.env.VITE_WP_API_BASEURL;

const Dinosaur = () => {

    // Loading state
  const [loading, setLoading] = useState(true)
  // Dino state - they change based on the posts on the API
  const [dinosaurs, setDinosaurs] = useState(null)

  const endpoint = `${baseUrl}/dinosaurs?_embed`

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res)
      setDinosaurs(res.data)
      setLoading(false)
    })
    .catch((err) => console.log(err))
  }, [])

  const Dinosaurs = ({ dinosaurs }) => {
    
    const mappedDinosaurs = dinosaurs.map((dinosaur, index) => {
      const type = dinosaur.acf.dinosaur_type
        //console.log("Dinosaurs data:", dinosaurs);
      return (
        <div key={dinosaur.slug + "-" + index} className="post-container">
          <h4 className="title">{dinosaur.title.rendered}</h4>
          <div dangerouslySetInnerHTML={{__html: dinosaur.excerpt.rendered}} />
          <div>Key: {dinosaur.slug + "-" + index}</div>
          <p>{type.toUpperCase()}</p>
          <li key={dinosaur.slug + "-" + index}>
            <a href={`#/dinosaur/${dinosaur.id}`}>Read More...</a>
          </li>
        </div>
      )
    })
    
    console.log({ mappedDinosaurs });
    
    return (
      <>
        {/* All our dinos are here! */}
        {mappedDinosaurs}
      </>
    )
  }


  return (
    <div className='container'>
      <h2>Dinosaurs</h2>
      <div id='dinosCont'>
        {loading ? <p>Loading...</p> : <Dinosaurs dinosaurs={dinosaurs}/>}
      </div>
    </div>
  )
}

export default Dinosaur