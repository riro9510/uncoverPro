
        import express from 'express';
        import cvrequestController from '../controllers/cvrequest.controller.js';
        import formValidator from '../validations/formJoi.js';

        const router = express.Router();
        router.post('/', formValidator ,cvrequestController.create);



        export default router;
        