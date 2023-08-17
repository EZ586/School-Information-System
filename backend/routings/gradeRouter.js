const express = require('express');
const app = express();

const router = express.Router();
const gradeController = require('../controllers/gradeController.js');

// POST /grades
router.post('/', gradeController.getGrades);

// PUT /grades/edit
router.put('/edit', gradeController.edit_grade);




app.use(router)

module.exports = router;