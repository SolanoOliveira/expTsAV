import { Router } from 'express';
import mainController from '../controllers/main';

const router = Router();

// Main controller
router.get('/', mainController.index);
router.get('/bemvindo/:nome', mainController.bemvindo);
router.get('/page', mainController.page);
router.get('/hb1', mainController.hb1);
router.get('/hb2', mainController.hb2);
router.get('/hb3', mainController.hb3);
router.get('/hb4', mainController.hb4);

// User controller

export default router;
