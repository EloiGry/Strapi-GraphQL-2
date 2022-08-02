import client from "../apollo.client.js";
import { GET_PRODUCTS } from "../utils/api.js";
import ProductsList from "../components/ProductsList.jsx";

export default function Home({ products }) {
  console.count()
  return (
    <div className="mt-[7rem]">
      <h1> Nos nouveautés à découvrir </h1>
      <ProductsList products={products}/>
    </div>
  )
}

export async function getStaticProps() {
  const { data } = await client.query({query: GET_PRODUCTS})
  
  return {
    props: {
      products: data.products.data.slice(0, 4),
    },
 };
}
