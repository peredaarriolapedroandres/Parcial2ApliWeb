import { IReservaRepository } from '../../repositories/IReservaRepository';
import { Reserva } from '../../entities/Reserva';

export class CrearReservaUseCase {
  constructor(private reservaRepository: IReservaRepository) {}

  async execute(data: { libro_id: number; usuario_id: number }): Promise<Reserva> {
    const existeActiva = await this.reservaRepository.existsActiveReservation(data.libro_id);
    if (existeActiva) {
      throw new Error('El libro ya está reservado actualmente');
    }
    return await this.reservaRepository.create(data);
  }
}