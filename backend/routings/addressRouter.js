const express = require('express');
const app = express();

const router = express.Router();
const addressController = require('../controllers/addressController.js');

// GET /address
router.get('/', addressController.getAddress);

// POST /address/create
router.post('/create', addressController.insert_Address);

app.use(router)

module.exports = router;