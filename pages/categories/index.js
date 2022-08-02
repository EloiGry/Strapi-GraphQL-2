import client from '../../apollo.client.js';
import Link from 'next/link'
import { GET_CATEGORIES } from "../../utils/api.js";
import { useRouter } from "next/router"

const Categories = ({categories}) => {
    const router = useRouter()
    if (router.isFallback) {
      return <div>Loading category...</div>
    }

    return (
        <div className="mt-[7rem]">
            <h1 className='p-5 font-bold'> Categories </h1>
            {categories.map(category => {
                return (
                    <div key={category.id} className='p-5'>
                        <Link href={`/categories/${category.id}`}>
                        <div className="cursor-pointer">
                            <h2 className="font-bold"> {category.attributes.name}</h2>
                            <p>{category.attributes.description}</p>
                        </div>
                        </Link>
                    </div>
                )
            })}
        </div>
    )
}

export default Categories

export async function getStaticProps() {
    const { data } = await client.query({query: GET_CATEGORIES})
    return {
      props: {
        categories: data.categories.data.slice(0, 4),
      },
   };
}