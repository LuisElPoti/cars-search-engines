import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
import Fuse from 'fuse.js';
const prisma = new PrismaClient();

export default async function GET(req, res) {
    const terminoDeBusqueda = req.query.terminoDeBusqueda;

    try {
        const autos = await prisma.auto.findMany();

        // Obtén todos los campos del modelo "auto" excluyendo "id"
        const camposDeBusqueda = Object.keys(autos[0]).filter((campo) => campo !== 'id');

        // Configuración de Fuse para buscar en todos los campos excluyendo "id"
        const options = {
            keys: camposDeBusqueda,
            threshold: 0.4,
        };

        const fuse = new Fuse(autos, options);

        const searchResults = fuse.search(terminoDeBusqueda);

        if (searchResults.length > 0) {
            res.status(200).json(searchResults);
        } else {
            const suggestions = fuse.search(terminoDeBusqueda, { limit: 5 });
            res.status(404).json({ message: 'No se encontraron resultados', suggestions });
        }
    } catch (error) {
        console.error('Error al obtener los Autos:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
