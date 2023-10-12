import { useRouter } from 'next/router'
import { ArrowSmallLeftIcon, CogIcon, SquaresPlusIcon } from '@heroicons/react/24/solid'
import { MouseEventHandler, useEffect, useState } from 'react';
import { fetchCarDetail, generateCarImageUrl2 } from '@/utils';
import { AutoProp } from '@/types';
import Image from 'next/image';


export default function Detail() {
  const router = useRouter();
  const [detailsCar, setDetailsCar] = useState<AutoProp>()
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleButtonClick = (event: any) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    router.push('/'); // Realiza la redirección a la página principal
  };

  useEffect(() => {
    async function initializeCarDetails() {
      const { id } = router.query;
      setIsLoading(false);

      if (id !== undefined && !Array.isArray(id)) {
        
        const car = await fetchCarDetail(Number.parseInt(id));
        setDetailsCar(car);
        setIsLoading(true);
      }
    }

    initializeCarDetails();
  }, [router.query]);


  return (
    
    <form className='ml-28 mr-28 translate-y-[15%] mb-[7%]'>
      {!isLoading ? (
        <div className="loading-indicator-container">
          <div aria-label="Loading..." role="status">
            <svg className="animate-spin w-6 h-6 fill-blue-500" viewBox="3 3 18 18">
              <path className="opacity-20" d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5ZM3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12Z">
              </path>
              <path d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z">
              </path>
            </svg>
          </div>
          <div className="loading-indicator ml-2">Loading...</div>
        </div>
      ) : (
        <>
          {detailsCar !== undefined ? (
          <>
            <div className="space-y-12">
              <div className="border-gray-900/10 pb-12">
                <div className='flex items-center space-x-4'>
                  <button onClick={handleButtonClick}
                  className="rounded-md bg-indigo-600 px-2 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                  >
                    <ArrowSmallLeftIcon className='inline h-5 w-5 mr-1'/>
                    Volver
                  </button>
                  <h1 className="font-semibold leading-7 text-gray-900">{detailsCar.marca} {detailsCar.modelo}</h1>
                  
                </div>
                <p className="mt-1 ml-24 text-sm leading-6 text-gray-600">
                    {detailsCar.descripcion}
                </p>
                
                <div className="mt-10 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="col-span-1">
                      <Image src={generateCarImageUrl2(detailsCar, '29')} alt='car model' height={1000} width={1000} priority className='object-contain' />
                    </div>
                    <div className="col-span-1">
                      <Image src={generateCarImageUrl2(detailsCar, '33')} alt='car model' height={1000} width={1000} priority className='object-contain' />
                    </div>
                    <div className="col-span-1">
                      <Image src={generateCarImageUrl2(detailsCar, '13')} alt='car model' height={1000} width={1000} priority className='object-contain' />
                    </div>
                  </div>

                  <div className=" h-[315px] rounded-xl bg-gray-100">
     
                      <div className="ml-5 mr-5 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-2">
                        
                        <div className="mt-5 bg-white rounded-lg shadow col-span-1">
                            <div className="flex">
                              <div className="flex-1 py-5 pl-5 overflow-hidden">
                                  <CogIcon height={30} width={30} className='absolute'/>
                                  <h1 className="ml-8 mt-0.5 text-2xl font-semibold leading-none">Especificaciones</h1>
                              </div>
                            </div>
                            <hr className=' mx-7'></hr>
                            <div className="px-5 pb-5">
                              
                              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                                <label className='text-center w-full py-2 text-base'>Precio: {detailsCar.precio}</label>
                                <label className='text-center w-full py-2 text-base'>Velocidad maxima: {detailsCar.velocidad_maxima}</label>
                                <label className='text-center w-full py-2 text-base'>Estado: {detailsCar.estado}</label>
                                <label className='text-center w-full py-2 text-base'>Transmision: {detailsCar.transmision}</label>
                                <label className='text-center w-full py-2 text-base'>Traccion: {detailsCar.traccion}</label>
                                <label className='text-center w-full py-2 text-base'>Año: {detailsCar.year}</label>
                                <label className='text-center w-full py-2 text-base'>Tipo: {detailsCar.tipo}</label>
                              </div>

                            </div>  
                            
                        </div>
                        

                        <div className='col-span-1'>
                          <div className="mt-5 col-span-2 bg-white rounded-lg shadow h-[270px]">
                            <div className="flex">
                              <div className="flex-1 py-5 pl-5 overflow-hidden">
                                  <SquaresPlusIcon height={30} width={30} className='absolute'/>
                                  <h1 className="ml-8 mt-0.5 text-2xl font-semibold leading-none">Detalles</h1>
                              </div>
                              <div className="flex-none pt-2.5 pr-2.5 pl-1"></div>
                            </div>
                            <hr className=' mx-7'></hr>

                            <div className="px-5 pb-5">                           
                              <div className="grid gap-2 grid-cols-1 sm:grid-cols-2">
                                <label className='text-center w-full py-2 text-base'>Caballos por minuto: {detailsCar.caballos_por_minuto}</label>
                                <label className='text-center w-full py-2 text-base'>Combustible: {detailsCar.combustible}</label>
                                <label className='text-center w-full py-2 text-base'>No. de pasajeros: {detailsCar.pasajeros}</label>
                                <label className='text-center w-full py-2 text-base'>No. de puertas: {detailsCar.puertas}</label>
                                <label className='text-center w-full py-2 text-base'>Color exterior: {detailsCar.color_exterior}</label>
                                <label className='text-center w-full py-2 text-base'>Color interior: {detailsCar.color_interior}</label>
                              </div>                             
                            </div>

                          </div>
                        </div>
                        
                      </div>
  
                  </div>       

                </div>


                {/* <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                    <div className="sm:col-span-3 mb-3">
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Velocidad máxima: {detailsCar.velocidad_maxima}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Estado: {detailsCar.estado}
                      </label>
                    </div>
  
                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        No. de pasajeros: {detailsCar.pasajeros}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Tracción: {detailsCar.traccion}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        No. de puertas: {detailsCar.puertas}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Caballos por minuto: {detailsCar.caballos_por_minuto}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Combustible: {detailsCar.combustible}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Año: {detailsCar.year}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Transmición: {detailsCar.transmision}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Color exterior: {detailsCar.color_exterior}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Color interior: {detailsCar.color_interior}
                      </label>
                    </div>

                    <div className="sm:col-span-3 mb-3" >
                      <label className="block text-sm font-medium leading-6 text-gray-900">
                        Tipo: {detailsCar.tipo}
                      </label>
                    </div>
                </div> */}
                  
              </div>
            </div>
          </>
          ) : (
            <>
              <div>
              
              </div>
            </>
          )}
        </>
      )}

    </form>
  )
}
