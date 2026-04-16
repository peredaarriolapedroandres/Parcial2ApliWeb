import { ILibroRepository } from '../../repositories/ILibroRepository';
import { Libro } from '../../entities/Libro';

export class ListarLibrosDisponiblesUseCase {
  constructor(private libroRepository: ILibroRepository) {}

  async execute(): Promise<Libro[]> {
    return await this.libroRepository.findDisponibles();
  }
}