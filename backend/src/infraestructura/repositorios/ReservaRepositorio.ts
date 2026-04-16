import { IReservaRepository } from '../../domain/repositories/IReservaRepository';
import { Reserva } from '../../domain/entities/Reserva';
import { ReservaModel } from '../database/models/ReservaModel';
import { LibroModel } from '../database/models/LibroModel';

export class ReservaRepositoryImpl implements IReservaRepository {
  async findByUsuario(usuarioId: number): Promise<Reserva[]> {
    const reservas = await ReservaModel.findAll({
      where: { usuario_id: usuarioId },
      include: [LibroModel]
    });
    
    return reservas.map(reserva => new Reserva(
      reserva.id,
      reserva.libro_id,
      reserva.usuario_id,
      reserva.fecha_reserva,
      reserva.fecha_devolucion,
      reserva.estado
    ));
  }

  async create(data: { libro_id: number; usuario_id: number }): Promise<Reserva> {
    const created = await ReservaModel.create({
      libro_id: data.libro_id,
      usuario_id: data.usuario_id,
      estado: 'ACTIVA'
    });
    
    return new Reserva(
      created.id,
      created.libro_id,
      created.usuario_id,
      created.fecha_reserva,
      created.fecha_devolucion,
      created.estado
    );
  }

  async cancelar(id: number): Promise<void> {
    await ReservaModel.update(
      { estado: 'CANCELADA' },
      { where: { id } }
    );
  }

  async devolver(id: number): Promise<void> {
    await ReservaModel.update(
      { 
        estado: 'DEVUELTA',
        fecha_devolucion: new Date()
      },
      { where: { id } }
    );
  }

  async existsActiveReservation(libroId: number): Promise<boolean> {
    const reserva = await ReservaModel.findOne({
      where: {
        libro_id: libroId,
        estado: 'ACTIVA'
      }
    });
    return reserva !== null;
  }
}