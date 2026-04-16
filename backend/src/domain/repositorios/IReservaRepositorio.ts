import { Reserva } from '../entities/Reserva';

export interface IReservaRepository {
  findByUsuario(usuarioId: number): Promise<Reserva[]>;
  create(reserva: { libro_id: number; usuario_id: number }): Promise<Reserva>;
  cancelar(id: number): Promise<void>;
  devolver(id: number): Promise<void>;
  existsActiveReservation(libroId: number): Promise<boolean>;
}