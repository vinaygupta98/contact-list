const express = require("express");
const router = new express.Router();
const contactController = require("../controller/contact");

router.get("/", contactController.getContacts);
router.get("/:id", contactController.getContact);

router.post("/", contactController.newContact);

router.put("/:id", contactController.updateContact);

router.delete("/:id", contactController.deleteContact);

module.exports = router;
