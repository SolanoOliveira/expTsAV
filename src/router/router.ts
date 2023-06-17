import { Router } from 'express';
import mainController from '../controllers/main';

const router = Router();

// Main controller
router.get('/', mainController.index);
router.get('/about', mainController.about);
router.get('/ui', mainController.ui);

export default router;
