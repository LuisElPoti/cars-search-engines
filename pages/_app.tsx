// import '@/styles/globals.css'
// import { CarCard, Hero, Navbar, Footer, SearchBar } from '@/components'
// //import { fetchCars } from '@/utils'
// import Image from 'next/image'
// import "primereact/resources/themes/lara-light-indigo/theme.css";     
// import "primereact/resources/primereact.min.css";                                       


// export default function Home() {
//   //const allCars = await fetchCars(searchParams);

//   // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

//   return (

//     <main className='overflow-hidden'>
      
      
//     </main>
//   )
// }
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import Layout from '@/components/Layout'

export default function App({ Component, pageProps }: AppProps) {
  return ( 
        
    <div>
      <Layout>
        <Component {...pageProps} />
      </Layout>
      
    </div>
  )

}