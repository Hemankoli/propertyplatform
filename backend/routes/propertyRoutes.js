const express = require("express");
const propertyController= require("../controllers/propertyController");
const router = express.Router();

router.get("/get-properties", propertyController.getAllProperties);
router.post("/create-property", propertyController.createProperty);
router.put("/edit-property/:propertyId", propertyController.editProperty);
router.delete("/delete-property/:propertyId", propertyController.deleteProperty);

module.exports = router;                                                                                                                                            