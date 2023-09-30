import { CarCard, CustomFilter, Hero, SearchBar } from '@/components'
//import { fetchCars } from '@/utils'
import { Console } from 'console';
import Image from 'next/image'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import { fuels, yearsOfProduction } from '@/constants';
import React from 'react';



export default function Home() {

  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (
    <main className="overflow-hidden">
      <Hero />

      <div className='mt-12 padding-x
      padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl
          font-extrabold'>Catalogo de carros</h1>
          <p>Explora los carros que desees</p>
        </div>

        <div className='home__filters'>
          <SearchBar />
          
          <div
          className='home__filter-container'>
            <CustomFilter titulo="combustible" opciones={fuels}/>
            <CustomFilter titulo="year" opciones={yearsOfProduction}/>
          </div>
        </div>

        {/* {!isDataEmpty ? (
          <section>
            <div className='home__cars-wrapper'>
              {allCars?.map((car) => (
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
    </main>
  )
}

