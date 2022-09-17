/*
  Warnings:

  - You are about to drop the column `idGenero` on the `pelicula` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE `Pelicula` DROP FOREIGN KEY `Pelicula_idGenero_fkey`;

-- AlterTable
ALTER TABLE `Pelicula` DROP COLUMN `idGenero`,
    MODIFY `fecha_creacion` DATETIME(0) NOT NULL;

-- CreateTable
CREATE TABLE `GeneroEnPelicula` (
    `idGenero` INTEGER NOT NULL,
    `idPelicula` INTEGER NOT NULL,

    PRIMARY KEY (`idGenero`, `idPelicula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `GeneroEnPelicula` ADD CONSTRAINT `GeneroEnPelicula_idGenero_fkey` FOREIGN KEY (`idGenero`) REFERENCES `Genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `GeneroEnPelicula` ADD CONSTRAINT `GeneroEnPelicula_idPelicula_fkey` FOREIGN KEY (`idPelicula`) REFERENCES `Pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
