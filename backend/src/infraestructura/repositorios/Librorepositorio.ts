import { ILibroRepository } from '../../domain/repositories/ILibroRepository';
import { Libro } from '../../domain/entities/Libro';
import { LibroModel } from '../database/models/LibroModel';
import { ReservaModel } from '../database/models/ReservaModel';
import { Op } from 'sequelize';

export class LibroRepositoryImpl implements ILibroRepository {
  async findAll(): Promise<Libro[]> {
    const libros = await LibroModel.findAll();
    return libros.map(libro => new Libro(
      libro.id,
      libro.titulo,
      libro.isbn,
      libro.anio_publicacion,
      libro.categoria_id
    ));
  }

  async findById(id: number): Promise<Libro | null> {
    const libro = await LibroModel.findByPk(id);
    if (!libro) return null;
    return new Libro(
      libro.id,
      libro.titulo,
      libro.isbn,
      libro.anio_publicacion,
      libro.categoria_id
    );
  }

  async findDisponibles(): Promise<Libro[]> {
    const reservasActivas = await ReservaModel.findAll({
      where: { estado: 'ACTIVA' }
    });
    
    const librosReservadosIds = reservasActivas.map(r => r.libro_id);
    
    const libros = await LibroModel.findAll({
      where: {
        id: {
          [Op.notIn]: librosReservadosIds.length > 0 ? librosReservadosIds : [0]
        }
      }
    });
    
    return libros.map(libro => new Libro(
      libro.id,
      libro.titulo,
      libro.isbn,
      libro.anio_publicacion,
      libro.categoria_id
    ));
  }

  async create(libro: Omit<Libro, 'id'>): Promise<Libro> {
    const created = await LibroModel.create({
      titulo: libro.titulo,
      isbn: libro.isbn,
      anio_publicacion: libro.anio_publicacion,
      categoria_id: libro.categoria_id
    });
    
    return new Libro(
      created.id,
      created.titulo,
      created.isbn,
      created.anio_publicacion,
      created.categoria_id
    );
  }

  async update(id: number, libro: Partial<Libro>): Promise<Libro> {
    await LibroModel.update(libro, { where: { id } });
    const updated = await LibroModel.findByPk(id);
    if (!updated) throw new Error('Libro no encontrado');
    
    return new Libro(
      updated.id,
      updated.titulo,
      updated.isbn,
      updated.anio_publicacion,
      updated.categoria_id
    );
  }

  async delete(id: number): Promise<void> {
    await LibroModel.destroy({ where: { id } });
  }
}