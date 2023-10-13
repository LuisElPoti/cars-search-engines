import { useRouter } from 'next/router'
import { ArrowSmallLeftIcon, CogIcon, SquaresPlusIcon } from '@heroicons/react/24/solid'
import { MouseEventHandler, useEffect, useState } from 'react';
import { fetchCarDetail, generateCarImageUrl2 } from '@/utils';
import { AutoProp } from '@/types';
import Image from 'next/image';
import { Navbar } from '@/components';

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
    <form className='mx-4 sm:mx-10 md:mx-20 lg:mx-28 mt-10 mb-[7%] translate-y-[15%]'>
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
                  <div className='flex flex-col space-y-4 sm:space-y-0 sm:flex-row sm:items-center sm:space-x-4'>
                    <button onClick={handleButtonClick} className="rounded-md bg-indigo-600 px-2 py-1 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus:outline focus:outline-2 focus:outline-offset-2 focus:outline-indigo-600">
                      <ArrowSmallLeftIcon className='inline h-5 w-5 mr-1'/>
                      Volver
                    </button>
                    <h1 className="font-semibold leading-7 text-gray-900 sm:text-xl">{detailsCar.marca} {detailsCar.modelo}</h1>
                  </div>
                  <p className="mt-1 ml-0 sm:ml-24 text-sm leading-6 text-gray-600">
                    {detailsCar.descripcion}
                  </p>
  
                  <div className="mt-10 grid grid-cols-1 gap-4 sm:gap-0 sm:grid-cols-3">
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
  
                  <div className="bg-gray-100 rounded-xl p-4">
                  <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <div className="bg-white rounded-lg shadow">
                      <div className="flex items-center">
                        <CogIcon height={30} width={30} className="ml-4" />
                        <h1 className="ml-2 text-xl font-semibold">Especificaciones</h1>
                      </div>
                      <hr className="my-2" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="text-center py-1">Precio US$: {detailsCar.precio}</label>
                        <label className='text-center py-1'>Velocidad maxima: {detailsCar.velocidad_maxima} km/h</label>
                        <label className='text-center py-1'>Estado: {detailsCar.estado}</label>
                        <label className='text-center py-1'>Transmision: {detailsCar.transmision}</label>
                        <label className='text-center py-1'>Traccion: {detailsCar.traccion}</label>
                        <label className='text-center py-1'>Año: {detailsCar.year}</label>
                        <label className='text-center py-1'>Tipo: {detailsCar.tipo}</label>
                      </div>
                    </div>

                    <div className="bg-white rounded-lg shadow">
                      <div className="flex items-center">
                        <SquaresPlusIcon height={30} width={30} className="ml-4" />
                        <h1 className="ml-2 text-xl font-semibold">Detalles</h1>
                      </div>
                      <hr className="my-2" />
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                        <label className="text-center py-1">Caballos por minuto: {detailsCar.caballos_por_minuto}</label>
                        <label className='text-center py-1'>Combustible: {detailsCar.combustible}</label>
                        <label className='text-center py-1'>No. de pasajeros: {detailsCar.pasajeros}</label>
                        <label className='text-center py-1'>No. de puertas: {detailsCar.puertas}</label>
                        <label className='text-center py-1'>Color exterior: {detailsCar.color_exterior}</label>
                        <label className='text-center py-1'>Color interior: {detailsCar.color_interior}</label>
                      </div>
                    </div>
                  </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <>
              <div>
                {/* Contenido para cuando detailsCar no está definido */}
              </div>
            </>
          )}
        </>
      )}
    </form>
  )
  
  
}
