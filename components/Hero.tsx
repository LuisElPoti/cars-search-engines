"use client"

import Image from 'next/image';
import CustomButton from './CustomButton';
//import { config } from '@fortawesome/fontawesome-svg-core'
//import '@fortawesome/fontawesome-svg-core/styles.css'
//config.autoAddCss = false

const Hero = () => {
  const handleScroll = () => {

  }

  return (
    <div className ="hero">
        <div className="flex-1 pt-36 padding-x">
            <h1 className="hero__title">
                Encuentra tu carro, rapido y facil
            </h1>

            <p className="hero__subtitle">
                Blababababababababb
            </p>

            <CustomButton
             titulo="Explorar Carros"
             estilo_contenedor="bg-primary-blue
             text-white rounded-full nt-10"
             handleClick={handleScroll}
            />

        </div>
        <div className="hero__image-container">
            <div className="hero__image">
                <Image src="/hero.png" alt='hero'
                fill className='object-contain'/>
            </div>
            
            <div className='hero__image-overlay'/>    
        </div>
    </div>
  )
}

export default Hero