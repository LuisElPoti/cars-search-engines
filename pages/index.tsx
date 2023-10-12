import Image from 'next/image'
import { Footer, Hero, Navbar, SearchBar } from '@/components'
import { Metadata } from 'next'



export default function Home() {
  return (
    <main className='overflow-hidden'>
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
    </main>
  )
}
