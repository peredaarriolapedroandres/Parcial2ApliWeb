import { Router } from 'express';
import { CategoriaController } from '../controllers/CategoriaController';
import { CategoriaRepositoryImpl } from '../../infrastructure/repositories/CategoriaRepositoryImpl';

const router = Router();
const categoriaRepository = new CategoriaRepositoryImpl();
const categoriaController = new CategoriaController(categoriaRepository);

router.get('/', categoriaController.listar);
router.post('/', categoriaController.crear);
router.put('/:id', categoriaController.actualizar);
router.delete('/:id', categoriaController.eliminar);

export default router;