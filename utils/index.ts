import { AutoProp } from "@/types";

export async function fetchCars(terminoDeBusqueda : string) {
    
    const response = await fetch(`/api/BusquedaDifusa?terminoDeBusqueda=${terminoDeBusqueda}`
    );

    if (response.ok) {
        const data = await response.json(); 
        console.table(data)
        return data;
    } else {
        console.error(
          "Error al obtener los datos:",
          response.status,
          response.statusText
        );
    }
    
}

// //utilizar
export const generateCarImageUrl = (car: AutoProp, angulo?: string) => {
    //key
    const url = new URL('https://cdn.imagin.studio/getimage');

    const { marca, year, modelo } = car;

    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make', marca);
    url.searchParams.append('modelFamily', modelo.split(' ')[0]);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${year}`);
    url.searchParams.append('angle', `${angulo}`);

    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value)

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    return newPathname;
}