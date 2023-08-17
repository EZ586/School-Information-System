const express = require('express');
const app = express();

const router = express.Router();
const adminController = require('../controllers/adminController.js');

// GET /admin
router.get('/', adminController.getAdmin);

// POST /admin/create
router.post('/create', adminController.insert_admin);

// POST /admin/pass
router.post('/pass', adminController.admin_pass);

// POST /admin/info
router.post('/info', adminController.admin_info);


app.use(router)

module.exports = router;