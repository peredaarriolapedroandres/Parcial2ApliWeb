import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';

export class CategoriaModel extends Model {
  public id!: number;
  public nombre!: string;
  public descripcion!: string | null;
}

CategoriaModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    nombre: {
      type: DataTypes.STRING(100),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
  },
  {
    sequelize,
    tableName: 'categorias',
    timestamps: false,
  }
);