
        import express from 'express';
        import formularioController from '../controllers/formulario.controller.js';
        const router = express.Router();

        // CREATE
        router.post('/', formularioController.create);

        // READ ALL
        router.get('/', formularioController.getAll);

        // READ ONE
        router.get('/:id', formularioController.getById);

        // UPDATE
        router.put('/:id', formularioController.update);

        // DELETE
        router.delete('/:id', formularioController.remove);


        export default router;
        