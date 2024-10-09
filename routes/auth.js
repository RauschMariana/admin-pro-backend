/*
    Rutas: '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validateFields } = require('../middlewares/validate-field');



const router = Router();

router.post(
    '/', 
    [
        check('email', 'El correo es obligatorio').isEmail(),
        check('password', 'La contraseña es obligatoria'),
        validateFields
    ], 
    login
);


module.exports = router;