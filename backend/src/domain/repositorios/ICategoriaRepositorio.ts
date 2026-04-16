import { Categoria } from '../entities/Categoria';

export interface ICategoriaRepository {
  findAll(): Promise<Categoria[]>;
  findById(id: number): Promise<Categoria | null>;
  create(categoria: Omit<Categoria, 'id'>): Promise<Categoria>;
  update(id: number, categoria: Partial<Categoria>): Promise<Categoria>;
  delete(id: number): Promise<void>;
}