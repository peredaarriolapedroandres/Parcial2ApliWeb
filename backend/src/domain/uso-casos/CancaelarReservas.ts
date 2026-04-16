import { IReservaRepository } from '../../repositories/IReservaRepository';

export class CancelarReservaUseCase {
  constructor(private reservaRepository: IReservaRepository) {}

  async execute(id: number): Promise<void> {
    await this.reservaRepository.cancelar(id);
  }
}