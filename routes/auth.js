/*
    Rutas: '/api/login'
 */
const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
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

router.post(
    '/google', 
    [
        check('token', 'El token de Google es obligatorio').not().isEmpty(),
        validateFields
    ], 
    googleSignIn
);


module.exports = router;