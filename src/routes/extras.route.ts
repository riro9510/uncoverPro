
        import express from 'express';
        import extrasController from '../controllers/extras.controller.js';
        const router = express.Router();

        router.get('/', extrasController.getAll);



        export default router;
        