const express = require('express');
const app = express();

const router = express.Router();
const parentController = require('../controllers/parentController.js');

// GET /parents
router.get('/', parentController.getParent);

// POST /parents/create
router.post('/create', parentController.insert_parent);

// POST /parents/pass
router.post('/pass', parentController.parent_pass);

// POST /parents/info
router.post('/info', parentController.parent_info);

// POST /parents/insert_child
router.post('/insert_child', parentController.insert_child);

// GET /parents/get_Childs
router.get('/get_Childs', parentController.getChilds);

// POST /parents/get_ParChilds
router.post('/get_ParChilds', parentController.getParChilds);


app.use(router)

module.exports = router;