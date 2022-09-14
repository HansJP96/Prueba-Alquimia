import { GeneroEnPelicula } from './genero_en_pelicula'

export class Genero {
	id: number

	nombre: string

	imagen: string =
		'https://whetstonefire.org/wp-content/uploads/2020/06/image-not-available.jpg'

	peliculas: GeneroEnPelicula[]
}
