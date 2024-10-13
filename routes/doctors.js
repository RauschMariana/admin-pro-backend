/*
    Rutas: '/api/doctors'
*/

const { Router } = require('express');
const { 
    getDoctors, 
    getDoctorById, 
    createDoctor, 
    updateDoctor, 
    deleteDoctor 
} = require('../controllers/doctors');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-field');

const router = Router();

router.get('/', getDoctors);
router.get('/:id', getDoctorById);
router.post(
    '/', 
    [
        validateJWT,
        check('name', 'El nombre del doctor es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital es obligatorio').not().isEmpty(),
        check('user', 'El id del usuario es obligatorio').not().isEmpty(),
        validateFields
    ],
    createDoctor);
router.put('/:id', updateDoctor);
router.delete('/:id', deleteDoctor);


module.exports = router;