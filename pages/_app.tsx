import '@/styles/globals.css'
import { CarCard, Hero, Navbar, Footer } from '@/components'
import Image from 'next/image'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import { dataPrueba } from '@/constants/datafake';
import { fetchCars } from '@/utils';

export default function Home() {
  //const allCars = await fetchCars(searchParams);

  //const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    
    <main className="overflow-hidden">
      <Navbar />
      <Hero />
      <div className='mt-12 padding-x
      padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl
          font-extrabold'>Catalogo de carros</h1>
          <p>Busca los carros que desees</p>
        </div>


        {/* {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {dataPrueba?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
          </section>
        ): (
          <div className='home__error-container'>
            <h2 className='text-black text-xl
            font-bold'>Sin resultados</h2>
            <p>{allCars?.message}</p>
          </div>
        )} */}

        
      </div>
      <Footer/>
    </main>
  )
}

