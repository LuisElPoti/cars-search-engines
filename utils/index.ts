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

export async function fetchCarDetail(id : number) {  

    try {
        const response = await fetch(`/api/MostrarInfoAuto?auto=${id}`);

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

export const generateCarImageUrl2 = (car: AutoProp, angulo?: string) => {
    //key
    const url = new URL('https://cdn.imagin.studio/getimage');

    url.searchParams.append('customer','hrjavascript-mastery');
    url.searchParams.append('make', car.marca);
    url.searchParams.append('modelFamily', car.modelo);
    url.searchParams.append('zoomType', 'fullscreen');
    url.searchParams.append('modelYear', `${car.year}`);
    url.searchParams.append('angle', `${angulo}`);

    return `${url}`;
}
