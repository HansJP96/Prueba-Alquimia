-- CreateTable
CREATE TABLE `Usuario` (
    `email` VARCHAR(100) NOT NULL,
    `primer_nombre` VARCHAR(30) NOT NULL,
    `primer_apellido` VARCHAR(30) NOT NULL,
    `contrasena` VARCHAR(256) NOT NULL,
    `salt_usuario` VARCHAR(40) NOT NULL,

    PRIMARY KEY (`email`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
