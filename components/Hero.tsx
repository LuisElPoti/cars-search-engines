"use client"

import Image from 'next/image';
import CustomButton from './CustomButton';
import { SearchBar } from '.';
import { preload } from 'react-dom';
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

            <p className="hero__subtitle mb-8 ">
                Car Search te ayuda a encontrar el carro que deseas
            </p>

            <SearchBar />

        </div>
        <div className="hero__image-container">
            <div className="hero__image">
                <Image src="/hero.png" alt='hero' priority={true}
                fill className='object-contain' sizes=''/>
            </div>
            
            <div className='hero__image-overlay'/>    
        </div>
    </div>
  )
}

export default Hero