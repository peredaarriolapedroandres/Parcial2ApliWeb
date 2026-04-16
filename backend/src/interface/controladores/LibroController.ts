import { Request, Response } from 'express';
import { ListarLibrosDisponiblesUseCase } from '../../domain/use-cases/libros/ListarLibrosDisponiblesUseCase';
import { CrearLibroUseCase } from '../../domain/use-cases/libros/CrearLibroUseCase';
import { ILibroRepository } from '../../domain/repositories/ILibroRepository';

export class LibroController {
  constructor(private libroRepository: ILibroRepository) {}

  listarTodos = async (req: Request, res: Response) => {
    try {
      const libros = await this.libroRepository.findAll();
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error al listar libros' });
    }
  };

  listarDisponibles = async (req: Request, res: Response) => {
    try {
      const useCase = new ListarLibrosDisponiblesUseCase(this.libroRepository);
      const libros = await useCase.execute();
      res.json(libros);
    } catch (error) {
      res.status(500).json({ error: 'Error al listar libros disponibles' });
    }
  };

  crear = async (req: Request, res: Response) => {
    try {
      const useCase = new CrearLibroUseCase(this.libroRepository);
      const libro = await useCase.execute(req.body);
      res.status(201).json(libro);
    } catch (error) {
      res.status(400).json({ error: 'Error al crear libro' });
    }
  };

  actualizar = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const libro = await this.libroRepository.update(id, req.body);
      res.json(libro);
    } catch (error) {
      res.status(400).json({ error: 'Error al actualizar libro' });
    }
  };

  eliminar = async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await this.libroRepository.delete(id);
      res.status(204).send();
    } catch (error) {
      res.status(400).json({ error: 'Error al eliminar libro' });
    }
  };
}