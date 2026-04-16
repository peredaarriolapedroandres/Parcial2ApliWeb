import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../sequelize';
import { CategoriaModel } from './CategoriaModel';

export class LibroModel extends Model {
  public id!: number;
  public titulo!: string;
  public isbn!: string | null;
  public anio_publicacion!: number | null;
  public categoria_id!: number;
}

LibroModel.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    titulo: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },
    isbn: {
      type: DataTypes.STRING(20),
      unique: true,
      allowNull: true,
    },
    anio_publicacion: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    categoria_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    tableName: 'libros',
    timestamps: false,
  }
);

LibroModel.belongsTo(CategoriaModel, { foreignKey: 'categoria_id' });