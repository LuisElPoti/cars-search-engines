
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();

export default async function GET(req, res) {
    const terminoDeBusqueda = req.query.terminoDeBusqueda //req.nextUrl.searchParams.get("terminoDeBusqueda");
    console.log(terminoDeBusqueda);

    try {
        const filters = {
            OR: [],
        };

        // Valida el tipo de dato de terminoDeBusqueda
        if (terminoDeBusqueda) {
            if (!isNaN(parseInt(terminoDeBusqueda))) {
                // Si es un número entero, agrega condiciones numéricas
                filters.OR.push(
                    {
                        year: {
                            equals: parseInt(terminoDeBusqueda),
                        },
                    },
                    {
                        puertas: {
                            equals: parseInt(terminoDeBusqueda),
                        },
                    },
                    {
                        pasajeros: {
                            equals: parseInt(terminoDeBusqueda),
                        },
                    },
                    {
                        velocidad_maxima: {
                            equals: parseInt(terminoDeBusqueda),
                        },
                    },
                    {
                        caballos_por_minuto: {
                            equals: parseInt(terminoDeBusqueda),
                        },
                    },
                    {
                        precio: {
                            equals: parseInt(terminoDeBusqueda),
                        },
                    }
                );
            } 
            

            // Si es una cadena, agrega condiciones de búsqueda de texto
            filters.OR.push(
                {
                    marca: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    modelo: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    estado: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    color_exterior: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    color_interior: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    combustible: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    transmision: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    traccion: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    tipo: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                },
                {
                    descripcion: {
                        contains: terminoDeBusqueda,
                        mode: 'insensitive',
                    },
                }
            );
        }

        const autos = await prisma.auto.findMany({
            where: filters,
        });

        res.status(200).json(autos); 
    } catch (error) {
        console.error('Error al obtener los Autos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

