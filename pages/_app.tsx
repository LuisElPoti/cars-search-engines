import '@/styles/globals.css'
import { CarCard, CustomFilter, Hero, SearchBar, Navbar, Footer } from '@/components'
//import { fetchCars } from '@/utils'
import { Console } from 'console';
import Image from 'next/image'
import "primereact/resources/themes/lara-light-indigo/theme.css";     
import "primereact/resources/primereact.min.css";                                       
import { fuels, yearsOfProduction } from '@/constants';
import React from 'react';

import { fetchCars } from '@/utils';

export default function Home() {
  //const allCars = await fetchCars(searchParams);

  // const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;
  //const isDataEmpty = !Array.isArray(allCars) || allCars.length < 1 || !allCars;

  return (

    <main>

      <Navbar />
      <Hero />
      <div className='mt-12 padding-x
      padding-y max-width' id='discover'>
        <div className='home__text-container'>
          <h1 className='text-4xl
          font-extrabold'>Catalogo de carros</h1>
          <p>Explora los carros que desees</p>
          <p>Busca los carros que desees</p>
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
              {dataPrueba?.map((car) => (
                <CarCard car={car} />
              ))}
            </div>
@@ -52,8 +41,9 @@ export default function Home() {
          </div>
        )} */}


        
      </div>
      <Footer/>
    </main>
  )
}