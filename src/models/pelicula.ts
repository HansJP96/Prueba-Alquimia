import { PersonajeEnPelicula } from './personaje_en_pelicula'
import { GeneroEnPelicula } from './genero_en_pelicula'

export class Pelicula {
	id: number

	titulo: string

	fecha_creacion: Date

	calificacion: number

	imagen: string =
		'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg'

	personajes: PersonajeEnPelicula[]

	generos: GeneroEnPelicula[]
}
