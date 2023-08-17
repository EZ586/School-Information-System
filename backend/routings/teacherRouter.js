const express = require('express');
const app = express();

const router = express.Router();
const teacherController = require('../controllers/teacherController.js');

// GET /teachers
router.get('/', teacherController.getTeacher);

// POST /teachers/create
router.post('/create', teacherController.insert_teacher);

// POST /teachers/pass
router.post('/pass', teacherController.teacher_pass);

// POST /teachers/info
router.post('/info', teacherController.teacher_info);


app.use(router)

module.exports = router;