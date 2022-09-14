-- CreateTable
CREATE TABLE `Personaje` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(100) NOT NULL,
    `edad` INTEGER NOT NULL,
    `peso` FLOAT NULL,
    `historia` VARCHAR(600) NOT NULL,
    `imagen` VARCHAR(500) NOT NULL,

    UNIQUE INDEX `Personaje_nombre_key`(`nombre`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Pelicula` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `titulo` VARCHAR(256) NOT NULL,
    `fecha_creacion` DATE NOT NULL,
    `calificacion` TINYINT UNSIGNED NOT NULL,
    `imagen` VARCHAR(500) NOT NULL,
    `idGenero` INTEGER NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Genero` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nombre` VARCHAR(50) NOT NULL,
    `imagen` VARCHAR(500) NOT NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `PersonajeEnPelicula` (
    `idPersonaje` INTEGER NOT NULL,
    `idPelicula` INTEGER NOT NULL,

    PRIMARY KEY (`idPersonaje`, `idPelicula`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `Pelicula` ADD CONSTRAINT `Pelicula_idGenero_fkey` FOREIGN KEY (`idGenero`) REFERENCES `Genero`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonajeEnPelicula` ADD CONSTRAINT `PersonajeEnPelicula_idPersonaje_fkey` FOREIGN KEY (`idPersonaje`) REFERENCES `Personaje`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PersonajeEnPelicula` ADD CONSTRAINT `PersonajeEnPelicula_idPelicula_fkey` FOREIGN KEY (`idPelicula`) REFERENCES `Pelicula`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
