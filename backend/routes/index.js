const express = require("express");
const router = new express.Router();
const contactRouter = require("./contact");

router.use("/contact", contactRouter);

module.exports = router;
