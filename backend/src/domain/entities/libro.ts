export class Libro {
  constructor(
    public id: number | null,
    public titulo: string,
    public isbn: string | null,
    public anio_publicacion: number | null,
    public categoria_id: number
  ) {}
}