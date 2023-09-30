-- CreateTable
CREATE TABLE "auto" (
    "id" SERIAL NOT NULL,
    "marca" VARCHAR(80) NOT NULL,
    "modelo" VARCHAR(80) NOT NULL,
    "estado" VARCHAR(80) NOT NULL,
    "year" INTEGER NOT NULL,
    "precio" INTEGER NOT NULL,
    "color_exterior" VARCHAR(80) NOT NULL,
    "color_interior" VARCHAR(80) NOT NULL,
    "combustible" VARCHAR(80) NOT NULL,
    "transmision" VARCHAR(80) NOT NULL,
    "traccion" VARCHAR(80) NOT NULL,
    "tipo" VARCHAR(80) NOT NULL,
    "puertas" INTEGER NOT NULL,
    "pasajeros" INTEGER NOT NULL,
    "descripcion" VARCHAR(350),
    "velocidad_maxima" INTEGER NOT NULL,
    "caballos_por_minuto" INTEGER NOT NULL,

    CONSTRAINT "auto_pkey" PRIMARY KEY ("id")
);
