"use client";

import { CustomButtonProps } from "@/types";
import Image from "next/image"

const CustomButton = ({ titulo, estilo_contenedor,
handleClick, tipo_boton, estilo_texto, icono_derecha }: CustomButtonProps) => {
  return (
    <button
      disabled={false}
      type={tipo_boton || "button"}
      className={`custom-btn ${estilo_contenedor}`}
      onClick={handleClick}
    >
       <span className={`flex-1 ${estilo_texto}`}>
         {titulo}
       </span>
       {icono_derecha && (
        <div className="relative w-6 h-6">
          <Image
           src={icono_derecha}
           alt="right icon"
           fill
           className="object-contain"
          />
        </div>
       )}
    </button>
  )
}

export default CustomButton