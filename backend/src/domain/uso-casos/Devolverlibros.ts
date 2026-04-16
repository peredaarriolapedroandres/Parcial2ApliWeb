import { IReservaRepository } from '../../repositories/IReservaRepository';

export class DevolverLibroUseCase {
  constructor(private reservaRepository: IReservaRepository) {}

  async execute(id: number): Promise<void> {
    await this.reservaRepository.devolver(id);
  }
}