const express = require('express');
const karyawanController = require('../controllers/karyawan')
const router = new express.Router();

router.get('/', karyawanController.getKaryawan)

router.get('/:id', karyawanController.getKaryawanById)

router.post('/', karyawanController.createKaryawan)

router.put('/:id', karyawanController.updateKaryawan)

router.delete('/:id', karyawanController.deleteKaryawanById)

module.exports = router;