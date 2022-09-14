/*
  Warnings:

  - Made the column `peso` on table `personaje` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `genero` MODIFY `imagen` VARCHAR(500) NOT NULL DEFAULT 'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg';

-- AlterTable
ALTER TABLE `pelicula` MODIFY `imagen` VARCHAR(500) NOT NULL DEFAULT 'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg';

-- AlterTable
ALTER TABLE `personaje` MODIFY `peso` FLOAT NOT NULL,
    MODIFY `imagen` VARCHAR(500) NOT NULL DEFAULT 'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg';
