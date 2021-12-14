const express = require('express');
const router = express.Router();
const migosController = require('../controllers/migosController');

router.route('/').get(migosController.getAllMigos).post(migosController.createMigos);
router.route('/:id').get(migosController.getMigos).patch(migosController.updateMigos).delete(migosController.deleteMigos);

module.exports = router;