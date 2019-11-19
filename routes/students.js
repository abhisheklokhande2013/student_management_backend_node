const express = require('express');
const router = express.Router();
const studentController = require('../controllers/students');

router.get('/', studentController.getAll);
router.post('/', studentController.create);
router.get('/:id', studentController.getById);
router.put('/update/:id', studentController.updateById);
router.delete('/remove/:id', studentController.deleteById);
module.exports = router;
