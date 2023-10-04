import { MouseEventHandler } from "react";
export interface CustomButtonProps { //boton multiusos
    titulo: string;
    estilo_contenedor?: string;
    handleClick?: MouseEventHandler<HTMLButtonElement>;
    tipo_boton?: "button" | "submit";
    estilo_texto?: string;
    icono_derecha?: string;
    es_disabled?: boolean;
}

export interface AutoProp { //info adicional desplegada en el modal
    id: number;
    velocidad_maxima: number;
    estado: string;
    pasajeros: number;
    traccion: string;
    puertas: number;
    caballos_por_minuto: number;
    combustible: string;
    precio: number;
    marca: string;
    modelo: string;
    transmision: string; 
    year: number;
    color_exterior: string;
    color_interior: string;
    tipo: string;
    descripcion: string;
}

export interface CarInfo{
    item: AutoProp;
    refIndex: number;
}

export interface FilterProp { //buscador y filtros
    marca: string;
    year: number;
    combustible: string;
    modelo: string;
}

export interface OpcionProp {  //opciones de los filtros
    titulo: string;
    valor: string;
}

export interface CustomFilterProp {  //opciones de los filtros
    titulo: string;
    opciones: OpcionProp[];
}