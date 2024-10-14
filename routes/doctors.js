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
        check('hospital', 'El id del hospital es obligatorio').isMongoId(),
        validateFields
    ],
    createDoctor);
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre del doctor es obligatorio').not().isEmpty(),
        check('hospital', 'El id del hospital es obligatorio').isMongoId(),
        validateFields
    ], 
    updateDoctor
);
router.delete('/:id', validateJWT, deleteDoctor);


module.exports = router;