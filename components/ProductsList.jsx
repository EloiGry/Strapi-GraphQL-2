import Image from 'next/image'
import Link from "next/link"

const ProductsList = ({ products }) => {
  return (
    <>
      {products.map(product => {
        return (
          <Link href={`/products/${product.id}`} key={product.id}>
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
          </Link>  
        )
      })}
  </>
  )
}

export default ProductsList