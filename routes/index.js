const express = require('express');
const router = new express.Router();

const divisiRouter = require('./divisi')
const managerRouter = require('./manager')
const karyawanRouter = require('./karyawan')

router.use('/divisi', divisiRouter)
router.use('/manager', managerRouter)
router.use('/karyawan', karyawanRouter)

module.exports = router;