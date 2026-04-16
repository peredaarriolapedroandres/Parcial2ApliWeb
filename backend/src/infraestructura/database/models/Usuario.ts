import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class UsuarioModel extends Model {
  public id!: number;
  public nombre!: string;
  public email!: string;
}

UsuarioModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
    },
  },
  {
    sequelize,
    tableName: 'usuarios',
    timestamps: false,
  }
);