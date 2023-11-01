import {useState, useEffect} from 'react'
import axios from 'axios'
import { Hourglass } from 'react-loader-spinner'; // import loading component from spinner 
import { Helmet } from 'react-helmet';

const baseUrl = import.meta.env.VITE_WP_API_BASEURL

const Home = () => {
  // Loading state
  const [loading, setLoading] = useState(true)
  // Posts state - they change based on the posts on the API
  const [posts, setPosts] = useState(null)

  const endpoint = `${baseUrl}/posts?_embed`

  useEffect(() => {
    axios.get(`${endpoint}`)
    .then((res) => {
      console.log(res.data)
      setPosts(res.data)
      setLoading(false)
    })
    .catch((err) => console.log(err))
  }, [])

  const Posts = ({posts}) => {
    const mappedPosts = posts.map((post, index) => {
      return (
        <div key={post.slug + "-" + index} className='post-container'>
          <h4 className='title'>{post.title.rendered}</h4>
          <div dangerouslySetInnerHTML={{__html: post.excerpt.rendered}}/>
          <div>Key: {post.slug + "-" + index}</div>
          <li key={post.slug + "-" + index}>
            <a href={`#/post/${post.id}`}>Read More</a>
          </li>
        </div>
      )
    })

    return (
      <>
        {mappedPosts}
      </>
    )
  }

  // RETURN OF THE HOME COMPONENT
  return (
    <>
  <Helmet>
<title>My page title - Home</title>
<meta name="description" content="This is desctriotion of my home page"/>
<meta name="keywords" content="keyword1, keyword2, keyword3"/>
{/*Additional meta tags eg Twitter? Social Media Share tags */}
{/*FACEBOOK */}
<meta property="og:title" content="Facebook open Graph Meta Tag example"/>
<meta property="og:image" content="Facebook open Graph Meta Tag example"/>


    </Helmet>
    <div className='container'>
      <div className='loading-container'>
        {loading && (
          <div className='hourglass-container'>
            <Hourglass visible={true} height={80} width={80} />
          </div>
        )}
      </div>
      <h2>Posts</h2>
      <div id='homeCont'>
        {!loading && <Posts posts={posts} />}
      </div>
    </div>
  </>
  );
}

export default Home