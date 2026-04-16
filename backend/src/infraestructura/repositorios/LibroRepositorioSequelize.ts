import { LibroRepository } from '../../domain/repositories/LibroRepository';
import { LibroModel } from '../database/models/LibroModel';

export class LibroRepositorySequelize implements LibroRepository {
  async findDisponibles() {
    return await LibroModel.findAll({ where: { disponible: true } });
  }

  async reservarLibro(id: number) {
    await LibroModel.update({ disponible: false }, { where: { id } });
  }
}
