const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');
const { checkAuthenticated, isAdmin } = require("../middleware/middleware");

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post('/logout', userController.logout);
router.get('/all-users', userController.getAllUsers);

router.get("/user-auth",  checkAuthenticated, (req, res) => {
    res.status(200).send({ ok: true });
});

router.get("/admin-auth",  isAdmin, (req, res) => {
    res.status(200).send({ ok: true });
});

module.exports = router;                                                                                                                                        