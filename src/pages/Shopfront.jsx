import {useEffect, useState} from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

import Loading from '../components/Loading'

//Product Endpoint from our env 
const productsUrl = import.meta.env.VITE_WC_PRODUCTS_URL;


const Shopfront = () => {
    const [products, setProducts] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        axios.get(`${productsUrl}`)
        .then((res) => {
            console.log(res.data)
            setProducts(res.data)
            setLoading(false)
        })
        .catch((err) => console.log(err))
    }, [])

    const Products = ({products}) => {
        console.log({products})
        const mappedProducts = products.map((product, index) => {

            function getFeaturedImage(product) {
                if (product && product.images && product.images[0] ) {
                    return product.images[0].src
                } else {
                    return 'https://placehold.co/600x400'
                }
            } // end of getFeatured Image
            return (
                <div className='product-conatiner item-container' key={index}>
                    <img className='product-image' src={getFeaturedImage(product)} alt="Product Image"/>
                    <Link className='product-link' to={`/product/${product.id}`}>
                    <h4 className='name'>{product.name}</h4>
                    </Link>
                    <h3 className='name'>
                        ${((parseFloat(product.prices.regular_price)) / 100).toFixed(2)} {product.prices.currency_code}</h3>
                    <h4 className='name'>
                        ${((parseFloat(product.prices.sale_price)) / 100).toFixed(2)} {product.prices.currency_code}</h4>
                </div>
           ) // end of map return
        }) // end of map

         // return for products
        return (
            <>
                {mappedProducts}
            </>
        )
    }// end of Products

 // shopfront return
  return (
    <div id='shop-page' className='container'>
    <h2>Shop</h2>
    <div id='product-grid' className='grid-container'>
            {loading ? <Loading/> : <Products products={products}/>}
     </div>
</div>
  )
}

export default Shopfront
