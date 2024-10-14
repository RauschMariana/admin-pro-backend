/*
    Rutas: '/api/hospitals'
 */

const { Router } = require('express');
const { 
    getHospitals, 
    createHospital, 
    updateHospital, 
    deleteHospital 
} = require('../controllers/hospitals');
const { validateJWT } = require('../middlewares/validate-jwt');
const { check } = require('express-validator');
const { validateFields } = require('../middlewares/validate-field');

const router = Router();

router.get('/', getHospitals);
router.post(
    '/', 
    [
        validateJWT,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validateFields
    ], 
    createHospital);
router.put(
    '/:id',
    [
        validateJWT,
        check('name', 'El nombre del hospital es obligatorio').not().isEmpty(),
        validateFields
    ], 
    updateHospital
);

router.delete('/:id', validateJWT, deleteHospital);


module.exports = router;