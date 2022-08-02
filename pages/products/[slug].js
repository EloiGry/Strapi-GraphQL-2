import client from '../../apollo.client.js';
import { useMutation } from '@apollo/client';
import { GET_PRODUCTS, GET_PRODUCT, CREATE_CART_LOGOUT } from "../../utils/api.js";
import { useRouter } from "next/router"
import Image from 'next/image.js';
import { useEffect } from 'react';

const Product = ({product}) => {
  const [createCart, { data, error }] = useMutation(CREATE_CART_LOGOUT)
    const router = useRouter()
    if (router.isFallback) {
      return <div>Loading category...</div>
    }
    const handleSubmit = (id) => {
      if (!localStorage.getItem('cart')) {
        createCart({
          variables : {products: [id]}
      })
      }
    }

    useEffect(() => {
      if (data && !localStorage.getItem('cart')) {
        localStorage.setItem('cart', data.createCart.data.id)
      }
    }, [data])
    

    return (
      <div className="mt-[7rem]">
        <div className='p-5 cursor-pointer'> 
          <h3 className="font-bold"> {product.attributes.name} </h3>
          <p> {product.attributes.price}€</p>
          <p> {product.attributes.description} </p>
          <Image 
              src={"http://localhost:1337" + product.attributes.image.data.attributes.url}
              width={product.attributes.image.data.attributes.width}
              height={product.attributes.image.data.attributes.height}
          />
        </div>
        <button className='border p-2 m-5' onClick={() => handleSubmit(product.id)}> Ajouter au panier </button>
      </div>
    )
}

export default Product




export async function getStaticPaths() {
    const { data } = await client.query({query: GET_PRODUCTS})
    const paths = data.products.data.map(product => {
        return {
            params : {slug: product.id}
        }
    })
    return {
      paths,
      fallback: false
   };
}

export async function getStaticProps({params}) {
  const { data } = await client.query({query: GET_PRODUCT, variables: {id : params.slug}})
  return {
    props: {
      product: data.product.data,
    },
 };
}