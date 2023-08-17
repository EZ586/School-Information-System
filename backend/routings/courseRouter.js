const express = require('express');
const app = express();

const router = express.Router();
const courseController = require('../controllers/courseController.js');

// GET /courses/coursesID
router.get('/coursesID', courseController.getCoursesID);

// POST /courses/create
router.post('/create', courseController.insert_course);

// POST /courses/info
router.post('/info', courseController.course_info);

// PUT /courses/edit
router.put('/edit', courseController.edit_course);

// POST /courses/register
router.post('/register', courseController.register_course);

// POST /courses/getRegistered
router.post('/getRegistered', courseController.getRegistered);

// DELETE /courses/deleteRegistered
router.delete('/deleteRegistered', courseController.deleteRegistered);

// POST /courses/capCheck
router.post('/capCheck', courseController.capCheck);



app.use(router)

module.exports = router;