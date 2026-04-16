import { ILibroRepository } from '../../repositories/ILibroRepository';
import { Libro } from '../../entities/Libro';

export class CrearLibroUseCase {
  constructor(private libroRepository: ILibroRepository) {}

  async execute(data: Omit<Libro, 'id'>): Promise<Libro> {
    return await this.libroRepository.create(data);
  }
}