"use client";

import { useState } from 'react'
import Image from 'next/image';
import { AutoProp, CarInfo } from '@/types';
import CustomButton from './CustomButton';
import { generateCarImageUrl } from '@/utils';
import {useRouter, usePathname} from 'next/navigation'
import Link from 'next/link';

interface CarCardProps {
    car: CarInfo;
}

const CarCard = ({ car }: CarCardProps) => {
  const { item } = car;
  const router = useRouter();

  return (
    <div className='car-card group'>
        <div className='car-card__content'>
            <h2 className='car-card__content-title'>
              {item.marca} {item.modelo}
            </h2>
        </div>

        <p className='flex mt-6 text-[32px]
        font-extrabold'>
            <span className='self-start text-[14px]
            font-semibold'>
              $
            </span>
              {item.precio}  
        </p>

      <div className='relative w-full h-40 my-3
      object-contain'>
        <Image src={generateCarImageUrl(car)} alt='car model' fill priority
        
        className='object-contain'/>
      </div>
      
      <div className='relative flex w-full mt-2'>
        <div className='flex group-hover:invisible
        w-full justify-between text-gray'>
          <div className='flex flex-col justify-center
          items-center gap-2'>
            <Image src={"/steering-wheel.svg"} width={20}
            height={20} alt='steering wheel' />
            <p className='text-[14px]'>
            {item.transmision}
            </p>
          </div>
          <div className='flex flex-col justify-center
          items-center gap-2'>
            <Image src={"/tire.svg"} width={20}
            height={20} alt='tire' />
            <p className='text-[14px]'>
            {item.traccion}
            </p>
          </div>
          <div className='flex flex-col justify-center
          items-center gap-2'>
            <Image src={"/gas.svg"} width={20}
            height={20} alt='gas' />
            <p className='text-[14px]'>
            {item.caballos_por_minuto} CPM
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
           handleClick={() => router.push(`/detail?id=${item.id}`)}
          />
        </div>
        
      </div>
    </div>
  )
}

export default CarCard