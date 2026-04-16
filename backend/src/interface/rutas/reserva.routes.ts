import { Router } from 'express';
import { ReservaController } from '../controllers/ReservaController';
import { ReservaRepositoryImpl } from '../../infrastructure/repositories/ReservaRepositoryImpl';

const router = Router();
const reservaRepository = new ReservaRepositoryImpl();
const reservaController = new ReservaController(reservaRepository);

router.get('/', reservaController.listar);
router.post('/', reservaController.crear);
router.put('/:id/cancelar', reservaController.cancelar);
router.put('/:id/devolver', reservaController.devolver);

export default router;