import { ICategoriaRepository } from '../../domain/repositories/ICategoriaRepository';
import { Categoria } from '../../domain/entities/Categoria';
import { CategoriaModel } from '../database/models/CategoriaModel';

export class CategoriaRepositoryImpl implements ICategoriaRepository {
  async findAll(): Promise<Categoria[]> {
    const categorias = await CategoriaModel.findAll();
    return categorias.map(cat => new Categoria(
      cat.id,
      cat.nombre,
      cat.descripcion
    ));
  }

  async findById(id: number): Promise<Categoria | null> {
    const categoria = await CategoriaModel.findByPk(id);
    if (!categoria) return null;
    return new Categoria(
      categoria.id,
      categoria.nombre,
      categoria.descripcion
    );
  }

  async create(categoria: Omit<Categoria, 'id'>): Promise<Categoria> {
    const created = await CategoriaModel.create({
      nombre: categoria.nombre,
      descripcion: categoria.descripcion
    });
    
    return new Categoria(
      created.id,
      created.nombre,
      created.descripcion
    );
  }

  async update(id: number, categoria: Partial<Categoria>): Promise<Categoria> {
    await CategoriaModel.update(categoria, { where: { id } });
    const updated = await CategoriaModel.findByPk(id);
    if (!updated) throw new Error('Categoría no encontrada');
    
    return new Categoria(
      updated.id,
      updated.nombre,
      updated.descripcion
    );
  }

  async delete(id: number): Promise<void> {
    await CategoriaModel.destroy({ where: { id } });
  }
}