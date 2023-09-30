"use client";

//import { SearchManufacturerProps } from '@/types'
import { Combobox, Transition } from '@headlessui/react'
import Image from 'next/image';
import { Fragment, useState } from 'react';
import { manufacturers } from '@/constants';


// const SearchManufacturer = ({ manufacturer,
// setManufacturer}: SearchManufacturerProps ) => {

//   // const [query, setQuery] = useState('')

//   // const filteredManufacturers = 
//   //   query === "" 
//   //     ? manufacturers 
//   //     : manufacturers.filter((item) => (
//   //       item.toLowerCase()
//   //       .replace(/\s+/g, "")
//   //       .includes(query.toLowerCase().replace(/\s+/g, "")      
//   //     )))

//   return (
//     <div className='search-manufacturer'>
//     </div>
//   )
// }

// export default SearchManufacturer