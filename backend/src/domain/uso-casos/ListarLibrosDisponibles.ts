import { LibroRepository } from '../repositories/LibroRepository';

export class ListarLibrosDisponibles {
  constructor(private repo: LibroRepository) {}

  execute() {
    return this.repo.findDisponibles();
  }
}