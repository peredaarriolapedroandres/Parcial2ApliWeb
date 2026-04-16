import { Libro } from '../entities/Libro';

export interface ILibroRepository {
  findAll(): Promise<Libro[]>;
  findById(id: number): Promise<Libro | null>;
  findDisponibles(): Promise<Libro[]>;
  create(libro: Omit<Libro, 'id'>): Promise<Libro>;
  update(id: number, libro: Partial<Libro>): Promise<Libro>;
  delete(id: number): Promise<void>;
}