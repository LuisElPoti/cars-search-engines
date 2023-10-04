import { AutoProp, CarInfo } from "@/types";

export async function fetchCars(terminoDeBusqueda : string) {  
    
    try {
        const response = await fetch(`/api/BusquedaDifusa?terminoDeBusqueda=${terminoDeBusqueda}`);

        if (response.ok) {
            const data = await response.json(); 
            return data;
        } else {
            console.error(
            "Error al obtener los datos:",
            response.status,
            response.statusText
            );
        }
    } catch(error) {
        console.error("Error al obtener los datos:", error);
    }
}   

// //utilizar
export const generateCarImageUrl = (car: CarInfo, angulo?: string) => {
    //key
    const url = new URL('https://cdn.imagin.studio/getimage');

    const {item} = car;

    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make', item.marca);
    url.searchParams.append('modelFamily', item.modelo);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${item.year}`);
    url.searchParams.append('angle', `${angulo}`);

    return `${url}`;
}

export const updateSearchParams = (type: string, value: string) => {

    const searchParams = new URLSearchParams(window.location.search);

    searchParams.set(type, value)

    const newPathname = `${window.location.pathname}?${searchParams.toString()}`

    return newPathname;
}