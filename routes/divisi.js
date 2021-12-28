const express = require('express');
const divisiController = require('../controllers/divisi')
const router = new express.Router();

router.get('/', divisiController.getDivisi)

router.get('/:id', divisiController.getDivisiById)

router.post('/', divisiController.createDivisi)

router.put('/:id', divisiController.updateDivisi)

router.delete('/:id', divisiController.deleteDivisiById)

module.exports = router;