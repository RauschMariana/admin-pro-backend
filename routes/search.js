/*
    Rutas: '/api/all/:search'
*/

const { Router } = require('express');
const { validateJWT } = require('../middlewares/validate-jwt');
const { getAll, getDocumentCollection } = require('../controllers/search');


const router = Router();

router.get('/:search', validateJWT, getAll);
router.get('/collection/:table/:search', validateJWT, getDocumentCollection);

module.exports = router;