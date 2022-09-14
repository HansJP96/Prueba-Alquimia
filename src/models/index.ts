import { Personaje as _Personaje } from './personaje'
import { Pelicula as _Pelicula } from './pelicula'
import { Genero as _Genero } from './genero'
import { PersonajeEnPelicula as _PersonajeEnPelicula } from './personaje_en_pelicula'
import { GeneroEnPelicula as _GeneroEnPelicula } from './genero_en_pelicula'

export namespace PrismaModel {
	export class Personaje extends _Personaje {}
	export class Pelicula extends _Pelicula {}
	export class Genero extends _Genero {}
	export class PersonajeEnPelicula extends _PersonajeEnPelicula {}
	export class GeneroEnPelicula extends _GeneroEnPelicula {}

	export const extraModels = [
		Personaje,
		Pelicula,
		Genero,
		PersonajeEnPelicula,
		GeneroEnPelicula,
	]
}
