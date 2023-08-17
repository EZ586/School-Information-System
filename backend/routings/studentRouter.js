const express = require('express');
const app = express();

const router = express.Router();
const studentController = require('../controllers/studentController');

// GET /students
router.get('/', studentController.getStudent);

// POST /students/create
router.post('/create', studentController.create_Student);

// Test GET
router.get('/studTest', studentController.stud_Test);

// POST /students/commit
router.post('/commit', studentController.insert_Student);

// POST /students/pass
router.post('/pass', studentController.stud_pass);

// POST /students/info
router.post('/info', studentController.stud_info);

// POST /students/grades
router.post('/grades', studentController.getStudGrades);


app.use(router)

module.exports = router;