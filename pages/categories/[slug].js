import client from '../../apollo.client.js';
import { GET_CATEGORIES, GET_CATEGORY } from "../../utils/api.js";
import { useRouter } from "next/router"
import ProductsList from '../../components/ProductsList'

const Categories = ({category}) => {
    const router = useRouter()
    if (router.isFallback) {
      return <div>Loading category...</div>
    }
    console.log(category);
    return (
        <div className="mt-[7rem]">
            <h1 className='p-5 font-bold'> {category.attributes.name} </h1> 
            <ProductsList products={category.attributes.products.data} />
        </div>
    )
}

export default Categories

export async function getStaticPaths() {
    const { data } = await client.query({query: GET_CATEGORIES})
    const paths = data.categories.data.map(category => {
        return {
            params : {slug: category.id}
        }
    })
    return {
      paths,
      fallback: false
   };
}

export async function getStaticProps({params}) {
  const { data } = await client.query({query: GET_CATEGORY, variables: {id : params.slug}})
  return {
    props: {
      category: data.category.data,
    },
 };
}


