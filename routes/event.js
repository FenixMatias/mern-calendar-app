/* 
    Rutas de Eventos / Event 
    host + /api/events
*/
const { Router } = require('express');
const { createEvent, obtainEvents, updateEvent, deleteEvent } = require('../controllers/event');
const router = Router();
const { validateJWT } = require('../middlewares/validationjwt');
const { check } = require('express-validator');
const { validationField } = require('../middlewares/validationField');
const { isDate } = require('../helpers/isDate');
//Todas tienen que pasar por la validación del JWT
router.use(validateJWT);
//Obtener eventos
router.get('/', obtainEvents);
//Crear eventos
router.post('/',
            [//Middlewares
                check('title', 'El titulo es obligatorio').not().isEmpty(),
                check('start', 'La fecha de inicio es obligatoria').custom(isDate),
                check('end', 'La fecha de finalización es obligatoria').custom(isDate),
                validationField
            ], createEvent);
//Actualizar eventos
router.put('/:id',
            [//Middlewares
            check('title', 'El titulo es obligatorio').not().isEmpty(),
            check('start', 'La fecha de inicio es obligatoria').custom(isDate),
            check('end', 'La fecha de finalización es obligatoria').custom(isDate),
            validationField
        ], updateEvent);
//Eliminar eventos
router.delete('/:id', deleteEvent);

module.exports = router;
