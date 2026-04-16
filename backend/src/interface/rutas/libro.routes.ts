import { Router } from 'express';
import { LibroController } from '../controllers/LibroController';
import { LibroRepositoryImpl } from '../../infrastructure/repositories/LibroRepositoryImpl';

const router = Router();
const libroRepository = new LibroRepositoryImpl();
const libroController = new LibroController(libroRepository);

router.get('/', libroController.listarTodos);
router.get('/disponibles', libroController.listarDisponibles);
router.post('/', libroController.crear);
router.put('/:id', libroController.actualizar);
router.delete('/:id', libroController.eliminar);

export default router;