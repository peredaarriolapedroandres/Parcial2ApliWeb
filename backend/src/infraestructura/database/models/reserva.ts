import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { LibroModel } from './LibroModel';
import { UsuarioModel } from './UsuarioModel';

export class ReservaModel extends Model {
  public id!: number;
  public libro_id!: number;
  public usuario_id!: number;
  public fecha_reserva!: Date;
  public fecha_devolucion!: Date | null;
  public estado!: string;
}

ReservaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    libro_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    usuario_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    fecha_reserva: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    fecha_devolucion: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    estado: {
      type: DataTypes.STRING(20),
      defaultValue: 'ACTIVA',
    },
  },
  {
    sequelize,
    tableName: 'reservas',
    timestamps: false,
  }
);

ReservaModel.belongsTo(LibroModel, { foreignKey: 'libro_id' });
ReservaModel.belongsTo(UsuarioModel, { foreignKey: 'usuario_id' });