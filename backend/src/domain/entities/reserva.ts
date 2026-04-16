export class Reserva {
  constructor(
    public id: number | null,
    public libro_id: number,
    public usuario_id: number,
    public fecha_reserva: Date,
    public fecha_devolucion: Date | null,
    public estado: string
  ) {}
}