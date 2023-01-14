/* 
    Rutas de Usuarios / Auth 
    host + /api/auth
*/
const { Router } = require('express');
const { check } = require('express-validator');
const router = Router();
const { createUser, loginUser, renewToken } = require('../controllers/auth');
const { validationField } = require('../middlewares/validationField');
const { validateJWT } = require('../middlewares/validationjwt');

router.post('/register',
            [//Middlewares
                check('name', 'El nombre es obligatorio').not().isEmpty(),
                check('email', 'El email es obligatorio').not().isEmpty(),
                check('email', 'El email no es valido').isEmail(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                check('password', 'El password debe tener un minimo de 8 caracteres').isLength({min: 8}),
                validationField
            ],
            createUser);

router.post('/',
            [//Middlewares
                check('email', 'El email es obligatorio').not().isEmpty(),
                check('email', 'El email no es valido').isEmail(),
                check('password', 'El password es obligatorio').not().isEmpty(),
                check('password', 'El password debe tener un minimo de 8 caracteres').isLength({min: 8}),
                validationField
            ],
            loginUser);

router.get('/renew', validateJWT, renewToken);


module.exports = router;