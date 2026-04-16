import { Request, Response } from 'express';
import { CrearReservaUseCase } from '../../domain/use-cases/reservas/CrearReservaUseCase';
import { CancelarReservaUseCase } from '../../domain/use-cases/reservas/CancelarReservaUseCase';
import { DevolverLibroUseCase } from '../../domain/use-cases/reservas/DevolverLibroUseCase';
import { IReservaRepository } from '../../domain/repositories/IReservaRepository';

export class ReservaController {
  constructor(private reservaRepository: IReservaRepository) {}

  listar = async (req: Request, res: Response) => {
    try {
      const usuarioId = parseInt(req.query.usuarioId as string) || 1;
      const reservas = await this.reservaRepository.findByUsuario(usuarioId);
      res.json(reservas);
    } catch (error) {
      res.status(500).json({ error: 'Error al listar reservas' });
    }
  };

  crear = async (req: Request, res: Response) => {
    try {
      const useCase = new CrearReservaUseCase(this.reservaRepository);
      const reserva = await useCase.execute(req.body);
      res.status(201).json(reserva);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Error al crear reserva';
      res.status(400).json({ error: message });
    }
  };

  cancelar = async (req: Request, res: Response) => {
    try {
      const useCase = new CancelarReservaUseCase(this.reservaRepository);
      const id = parseInt(req.params.id);
      await useCase.execute(id);
      res.json({ message: 'Reserva cancelada exitosamente' });
    } catch (error) {
      res.status(400).json({ error: 'Error al cancelar reserva' });
    }
  };

  devolver = async (req: Request, res: Response) => {
    try {
      const useCase = new DevolverLibroUseCase(this.reservaRepository);
      const id = parseInt(req.params.id);
      await useCase.execute(id);
      res.json({ message: 'Libro devuelto exitosamente' });
    } catch (error) {
      res.status(400).json({ error: 'Error al devolver libro' });
    }
  };
}