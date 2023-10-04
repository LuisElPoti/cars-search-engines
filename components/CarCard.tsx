"use client";

import { useState } from 'react'
import Image from 'next/image';
import { AutoProp } from '@/types';
import CustomButton from './CustomButton';
import CardDetails from './CardDetails';
import { generateCarImageUrl } from '@/utils';

interface CarCardProps {
    car: AutoProp;
}


const CarCard = ({ car }: CarCardProps) => {
  const { velocidad_maxima, year, marca, modelo, transmision,
  traccion } = car;
  
  // const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='car-card group'>
        <div className='car-card__content'>
            <h2 className='car-card__content-title'>
              {marca} {modelo}
            </h2>
        </div>

        <p className='flex mt-6 text-[32px]
        font-extrabold'>
            <span className='self-start text-[14px]
            font-semibold'>
              $
            </span>
              Car Rent...   
        </p>

      <div className='relative w-full h-40 my-3
      object-contain'>
      </div>
      
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible
        w-full justify-between text-gray'>
          <div className='flex flex-col justify-center
          items-center gap-2'>
            <Image src={"/steering-wheel.svg"} width={20}
            height={20} alt='steering wheel' />
            <p className='text-[14px]'>

            </p>
          </div>
          <div className='flex flex-col justify-center
          items-center gap-2'>
            <Image src={"/tire.svg"} width={20}
            height={20} alt='tire' />
            <p className='text-[14px]'>

            </p>
          </div>
          <div className='flex flex-col justify-center
          items-center gap-2'>
            <Image src={"/gas.svg"} width={20}
            height={20} alt='gas' />
            <p className='text-[14px]'>

            </p>
          </div>
        </div>

        <div className='car-card__btn-container'>
          <CustomButton
           titulo='Ver mas'
           estilo_contenedor='w-full py-[16px]
           rounded-full bg-primary-blue'
           estilo_texto="text-white text-[14px] leading-[17px]
           font-bold"
           icono_derecha="/right-arrow.svg"
          />
        </div>
      </div>
    </div>
  )
}

export default CarCard