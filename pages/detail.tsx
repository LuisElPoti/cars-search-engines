import { useRouter } from 'next/router'
import { BackwardIcon, PhotoIcon, UserCircleIcon} from '@heroicons/react/24/solid'
import { MouseEventHandler, useEffect, useState } from 'react';
import { fetchCarDetail, generateCarImageUrl2 } from '@/utils';
import { AutoProp } from '@/types';
import Image from 'next/image';


export default function Detail() {
  const router = useRouter();
  const [detailsCar, setDetailsCar] = useState<AutoProp>()

  const handleButtonClick = (event: any) => {
    event.preventDefault(); // Evita el comportamiento predeterminado del botón
    router.push('/'); // Realiza la redirección a la página principal
  };

  useEffect(() => {
    async function initializeCarDetails() {
      const { id } = router.query;

      if (id !== undefined && !Array.isArray(id)) {
        
        const car = await fetchCarDetail(Number.parseInt(id));
        setDetailsCar(car);
        
      }
    }

    initializeCarDetails();
  }, [router.query]);


  return (
    
    <form className='ml-28 mr-28'>
      {detailsCar !== undefined ? (
        <>
          <div className="space-y-12">
            <div className="border-b border-gray-900/10 pb-12">
              <div className='flex items-center space-x-4'>
                <button onClick={handleButtonClick}
                className="rounded-md bg-indigo-600 px-2 py-1 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Volver
                </button>
                <h2 className="text-base font-semibold leading-7 text-gray-900">{detailsCar.marca} {detailsCar.modelo}</h2>
                
              </div>
              <p className="mt-1 ml-20 text-sm leading-6 text-gray-600">
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
                <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                  <div className="sm:col-span-3 mb-3">
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Caballos por minuto: {detailsCar.caballos_por_minuto}
                    </label>                
                  </div>

                  <div className="sm:col-span-3 mb-3">
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
                      Combustible: {detailsCar.combustible}
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
                      Precio: {detailsCar.precio}
                    </label>
                  </div>

                  <div className="sm:col-span-3 mb-3" >
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      No. de puertas: {detailsCar.puertas}
                    </label>
                  </div>

                  <div className="sm:col-span-3 mb-3" >
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tipo: {detailsCar.tipo}
                    </label>
                  </div>

                  <div className="sm:col-span-3 mb-3" >
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Tracción: {detailsCar.traccion}
                    </label>
                  </div>

                  <div className="sm:col-span-3 mb-3" >
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Transmisión: {detailsCar.transmision}
                    </label>
                  </div>

                  <div className="sm:col-span-3 mb-3" >
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Velocidad máxima: {detailsCar.velocidad_maxima}
                    </label>
                  </div>

                  <div className="sm:col-span-3 mb-3" >
                    <label className="block text-sm font-medium leading-6 text-gray-900">
                      Año: {detailsCar.year}
                    </label>
                  </div>
                </div>
                
              </div>
            </div>
          </div>  
        </>
      ) : (
        <>
          <div>
            
          </div>
        </>
      )}
        
    </form>


  )
}
