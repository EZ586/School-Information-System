const express = require('express');
const app = express();
const cors = require('cors');
const port = 4000; // Set the desired port

const studentRoutes = require('./routings/studentRouter.js');
const addressRoutes = require('./routings/addressRouter.js');
const adminRoutes = require('./routings/adminRouter.js');
const parentRoutes = require('./routings/parentRouter.js');
const teacherRoutes = require('./routings/teacherRouter.js');
const coursesRoutes = require('./routings/courseRouter.js');
const gradeRoutes = require('./routings/gradeRouter.js');

app.use(cors());
app.use(express.json());

// Configure the routes
app.use('/students', studentRoutes);
app.use('/address', addressRoutes);
app.use('/admin', adminRoutes);
app.use('/parents', parentRoutes);
app.use('/teachers', teacherRoutes);
app.use('/courses', coursesRoutes);
app.use('/grades', gradeRoutes);

// Start the server
app.get("/test", (req, res) => {
  res.json("hello there");
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});