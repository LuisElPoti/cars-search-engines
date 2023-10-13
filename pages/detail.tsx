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
    <div className="mx-4">
      {!isLoading ? (
        <div className="loading-indicator-container flex items-center justify-center h-screen">
        <div aria-label="Loading..." role="status">
          <svg className="animate-spin w-6 h-6 text-blue-500" viewBox="0 0 24 24">
            <path
              className="opacity-20"
              d="M12 5C8.13401 5 5 8.13401 5 12C5 15.866 8.13401 19 12 19C15.866 19 19 15.866 19 12C19 8.13401 15.866 5 12 5Z"
            ></path>
            <path
              d="M16.9497 7.05015C14.2161 4.31648 9.78392 4.31648 7.05025 7.05015C6.65973 7.44067 6.02656 7.44067 5.63604 7.05015C5.24551 6.65962 5.24551 6.02646 5.63604 5.63593C9.15076 2.12121 14.8492 2.12121 18.364 5.63593C18.7545 6.02646 18.7545 6.65962 18.364 7.05015C17.9734 7.44067 17.3403 7.44067 16.9497 7.05015Z"
            ></path>
          </svg>
        </div>
        <div className="loading-indicator ml-2">Loading...</div>
      </div>
      ) : (
        <div className="space-y-4">
          {detailsCar !== undefined ? (
            <div>
              {/* mover mas para abajo el boton, la marca y el modelo */}
              
              <div className='flex items-center space-x-4'>
              
              <div className="mb-4"> {/* Add this div with a margin */}
                <button
                  onClick={handleButtonClick}
                  className="bg-indigo-600 px-4 py-2 text-sm font-semibold text-white rounded-md"
                >
                  <ArrowSmallLeftIcon className="inline h-5 w-5 mr-1" />
                  Volver
                </button>
              </div>
              
              <h1 className="font-semibold text-2xl">
                {detailsCar.marca} {detailsCar.modelo}
              </h1>
              <p className="text-sm text-gray-600">
                {detailsCar.descripcion}
              </p>
              </div>
              <div className="grid grid-cols-1 gap-4">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                  <Image src={generateCarImageUrl2(detailsCar, '29')} alt="car model" width={500} height={500} className="object-contain" />
                  <Image src={generateCarImageUrl2(detailsCar, '33')} alt="car model" width={500} height={500} className="object-contain" />
                  <Image src={generateCarImageUrl2(detailsCar, '13')} alt="car model" width={500} height={500} className="object-contain" />
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
                        <label className="text-center py-1">Precio: {detailsCar.precio}</label>
                        <label className='text-center py-1'>Velocidad maxima: {detailsCar.velocidad_maxima}</label>
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
          ) : (
            <div>
              {/* Render something when detailsCar is undefined */}
            </div>
          )}
        </div>
      )}
    </div>
  );
  
  
}
