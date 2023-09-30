"use client"

import {Fragment, useState} from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { Listbox, Transition } from '@headlessui/react'
import { CustomFilterProp } from '@/types'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Router from 'next/router'
import { type } from 'os'
//import { updateSearchParams } from '@/utils'

const CustomFilter = ({ titulo, opciones}: CustomFilterProp) => {

  // const router = useRouter();
  // const [selected, setSelected] = useState(options[0]);

  // const handleUpdateParams = (e: {title: string, value: string}) => {
    
  //   const newPathName = updateSearchParams(title, e.value.toLowerCase());
    
  //   router.push(newPathName, {scroll:false});
  // }

  return (
    <div className='w-fit'>
      <Listbox>
        <div className='relative w-fit z-10'>
          <Listbox.Button className="custom-filter__btn">
            <span className='block truncate'></span>
            <Image src="/chevron-up-down.svg"
              width={20}
              height={20}
              className='ml-4 object-contain'
              alt='chevron up down'
            />
          </Listbox.Button>
          <Transition
            as={Fragment}
            leave='transition ease-in duration-100'
            leaveFrom='opacity-100'
            leaveTo='opacity-0' 
            >
              <Listbox.Options className="custom-filter__options">
                {opciones.map((opciones) => (
                  <Listbox.Option
                    key={opciones.titulo}
                    value={opciones}
                    className={({ active }) => `relative cursor-default select-none py-2 px-4 ${active ? 'bg-primary-blue text-white' :
                    'text-gray-900' }`}
                  >
                  </Listbox.Option>
                ))}
              </Listbox.Options>
          </Transition>
        </div>
      </Listbox>
    </div>
  )
}

export default CustomFilter