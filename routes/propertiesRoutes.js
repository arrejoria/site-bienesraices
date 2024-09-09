import express from 'express'
import { body } from 'express-validator'  
import {admin, createProperty, save} from '../controllers/propertiesController.js'
import secureRoute from '../middleware/secureRoute.js';

const router = express.Router();

router.get('/my-properties', secureRoute, admin)
router.get('/property/create',secureRoute, createProperty)

router.post('/property/create', 
    body('prop_title').notEmpty().withMessage('El titulo del anuncio es obligatorio'), 
    body('description')
        .isLength({max:3000}).withMessage('La descripción tiene un max permitido de 3.000 caracteres'),
    body('currency')
        .notEmpty().withMessage('Obligatorio'),
    body('amount')
        .notEmpty().withMessage('Obligatorio'),
    body('category')
        .isNumeric().withMessage('Obligatorio'),
    body('rooms')
        .isNumeric().withMessage('Obligatorio'),
    body('bathrooms')
        .isNumeric().withMessage('Obligatorio'),
    body('bedrooms')
        .isNumeric().withMessage('Obligatorio'),
    body('lat')
        .notEmpty().withMessage('Necesitas señalar la ubicación del inmueble'),
    save
)



export default router;