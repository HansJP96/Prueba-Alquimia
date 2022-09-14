import { PersonajeEnPelicula } from './personaje_en_pelicula'

export class Personaje {
	id: number

	nombre: string

	edad: number

	peso: number

	historia: string

	imagen: string =
		'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg'

	peliculas: PersonajeEnPelicula[]
}
