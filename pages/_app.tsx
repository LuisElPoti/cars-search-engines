import '@/styles/globals.css'
import { CarCard, Hero, Navbar, Footer, SearchBar } from '@/components'
//import { fetchCars } from '@/utils'
import Image from 'next/image'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       

import { fetchCars } from '@/utils';

export default function Home() {
  //const allCars = await fetchCars(searchParams);

  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (

    <main className='overflow-hidden'>

      <Navbar />
      <Hero />
      <div className='mt-12 padding-x
      padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl
          font-extrabold'>Catálogo de carros</h1>
          <p>Explora los carros que desees</p>

        </div>

        <SearchBar />
        
      </div>
      <Footer/>
    </main>
  )
}