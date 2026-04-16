import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { testConnection } from './infrastructure/database/sequelize';

import libroRoutes from './interfaces/routes/libro.routes';
import reservaRoutes from './interfaces/routes/reserva.routes';
import categoriaRoutes from './interfaces/routes/categoria.routes';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middlewares
app.use(cors({ origin: 'http://localhost:4200' }));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rutas
app.use('/api/libros', libroRoutes);
app.use('/api/reservas', reservaRoutes);
app.use('/api/categorias', categoriaRoutes);

// Ruta de prueba
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'BiblioApp API funcionando correctamente' });
});

// Iniciar servidor
async function startServer() {
  await testConnection();
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`📚 Endpoints disponibles:`);
    console.log(`   - GET    /api/categorias`);
    console.log(`   - POST   /api/categorias`);
    console.log(`   - PUT    /api/categorias/:id`);
    console.log(`   - DELETE /api/categorias/:id`);
    console.log(`   - GET    /api/libros`);
    console.log(`   - GET    /api/libros/disponibles`);
    console.log(`   - POST   /api/libros`);
    console.log(`   - PUT    /api/libros/:id`);
    console.log(`   - DELETE /api/libros/:id`);
    console.log(`   - GET    /api/reservas?usuarioId=1`);
    console.log(`   - POST   /api/reservas`);
    console.log(`   - PUT    /api/reservas/:id/cancelar`);
    console.log(`   - PUT    /api/reservas/:id/devolver`);
  });
}

startServer();