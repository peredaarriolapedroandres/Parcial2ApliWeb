import { ICategoriaRepository } from '../../repositories/ICategoriaRepository';
import { Categoria } from '../../entities/Categoria';

export class ListarCategoriasUseCase {
  constructor(private repository: ICategoriaRepository) {}
  
  async execute(): Promise<Categoria[]> {
    return await this.repository.findAll();
  }
}

export class CrearCategoriaUseCase {
  constructor(private repository: ICategoriaRepository) {}
  
  async execute(data: Omit<Categoria, 'id'>): Promise<Categoria> {
    return await this.repository.create(data);
  }
}

export class ActualizarCategoriaUseCase {
  constructor(private repository: ICategoriaRepository) {}
  
  async execute(id: number, data: Partial<Categoria>): Promise<Categoria> {
    return await this.repository.update(id, data);
  }
}

export class EliminarCategoriaUseCase {
  constructor(private repository: ICategoriaRepository) {}
  
  async execute(id: number): Promise<void> {
    await this.repository.delete(id);
  }
}