/*
    Rutas: '/api/uploads/' 
*/

const { Router } = require('express');
const fileUpload = require('express-fileupload');

const { validateJWT } = require('../middlewares/validate-jwt');
const { uploadFile, returnImage } = require('../controllers/uploads');


const router = Router();

router.use(fileUpload());

router.put('/:type/:id', validateJWT, uploadFile);

router.get('/:type/:img', returnImage);

module.exports = router;