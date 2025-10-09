const express = require("express");

const router = express.Router();



// Route publique pour login

const imagesRouter = require("./images/router");
const itemsRouter = require("./items/router");

router.use("/items", itemsRouter);
router.use("/images", imagesRouter);


module.exports = router;
