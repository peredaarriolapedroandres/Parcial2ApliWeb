import { DataTypes } from 'sequelize';
import { sequelize } from '../database/sequelize';

export const LibroModel = sequelize.define('libros', {
  titulo: DataTypes.STRING,
  disponible: DataTypes.BOOLEAN
}, { timestamps: false });