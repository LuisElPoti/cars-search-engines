
import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";
const prisma = new PrismaClient();


export default async function GET(req, res){

    try{

        const auto = req.query.auto;
        console.log(auto);

        const autoInfo = await prisma.auto.findUnique({
            where:{
                id: parseInt(auto),
            },
        });
        res.status(200).json(autoInfo); // 200 OK

    } catch (error) {
        console.error('Error al obtener la info del auto:', error); // 500 Internal Server Error
        res.status(500).json({ message: 'Internal Server Error' });
    }

}