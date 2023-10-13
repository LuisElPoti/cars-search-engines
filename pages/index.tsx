import Image from 'next/image'
import { Footer, Hero, Navbar, SearchBar } from '@/components'
import { Metadata } from 'next'
import Head from 'next/head'


export default function Home() {
  const title = 'CarSearch';
  const description = 'Explora los carros que desees';
  const logoUrl = 'car-search.ico';

  return (
    <main className='overflow-hidden'>
      <Head>
        <title>{title}</title>
        <meta name='description' content={description} />
        <link rel='icon' href={logoUrl} />
      </Head>
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
