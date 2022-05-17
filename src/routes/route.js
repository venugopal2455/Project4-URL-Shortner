const express = require('express');
const router = express.Router();

const urlController=require('../controller/urlController')

router.get("/:urlCode", urlController.getUrl);

module.exports = router