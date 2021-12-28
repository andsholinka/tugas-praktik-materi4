const express = require('express');
const managerController = require('../controllers/manager')
const router = new express.Router();

router.get('/', managerController.getManager)

router.get('/:id', managerController.getManagerById)

router.post('/', managerController.createManager)

router.put('/:id', managerController.updateManager)

router.delete('/:id', managerController.deleteManagerById)

module.exports = router;