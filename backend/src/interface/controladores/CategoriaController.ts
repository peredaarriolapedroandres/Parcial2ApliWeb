import { Request, Response } from 'express';
import {
  ListarCategoriasUseCase,
  CrearCategoriaUseCase,
  ActualizarCategoriaUseCase,
  EliminarCategoriaUseCase
} from '../../domain/use-cases/categorias/CrudCategoriaUseCases';
import { ICategoriaRepository } from '../../domain/repositories/ICategoriaRepository';

export class CategoriaController {
  constructor(private categoriaRepository: ICategoriaRepository) {}

  listar = async (req: Request, res: Response) => {
    try {
      const useCase = new ListarCategoriasUseCase(this.categoriaRepository);
      const categorias = await useCase.execute();
      res.json(categorias);
    } catch (error) {
      res.status(500).json({ error: 'Error al listar categorías' });
    }
  };

  crear = async (req: Request, res: Response) => {
    try {
      const useCase = new CrearCategoriaUseCase(this.categoriaRepository);
      const categoria = await useCase.execute(req.body);
      res.status(201).json(categoria);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear categoría' });
    }
  };

  actualizar = async (req: Request, res: Response) => {
    try {
      const useCase = new ActualizarCategoriaUseCase(this.categoriaRepository);
      const id = parseInt(req.params.id);
      const categoria = await useCase.execute(id, req.body);
      res.json(categoria);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar categoría' });
    }
  };

  eliminar = async (req: Request, res: Response) => {
    try {
      const useCase = new EliminarCategoriaUseCase(this.categoriaRepository);
      const id = parseInt(req.params.id);
      await useCase.execute(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Error al eliminar categoría' });
    }
  };
}