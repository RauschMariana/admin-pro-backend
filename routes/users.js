/*
    Rutas: '/api/users'
 */

const { Router } = require('express');
const { check } = require('express-validator');
const { getUsers, createUser, updateUser, deleteUser } = require('../controllers/users');
const { validateFields } = require('../middlewares/validate-field');
const { validateJWT } = require('../middlewares/validate-jwt');



const router = Router();

router.get('/', validateJWT, getUsers);
router.post(
    '/', 
    [
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check(
                'password', 
                'La contraseña es obligatoria', 
                'La contraseña debe ser de al menos 6 caracteres').isLength({ min: 6 }  
            ),
        validateFields
    ], 
    createUser
);
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre es obligatorio').not().isEmpty(),
        check('email', 'El correo es obligatorio').isEmail(),
        check('role', 'El rol es obligatorio').not().isEmpty(),
        validateFields
    ],
    updateUser
);

router.delete('/:id', validateJWT, deleteUser);


module.exports = router;