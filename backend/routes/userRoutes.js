const express = require("express");
const router = express.Router();
const userController = require('../controllers/userController');

router.post("/register", userController.register);
router.post("/login", userController.login);
router.post('/logout', userController.logout);
router.get('/all-users', userController.getAllUsers);

router.get("/user-auth",  (req, res) => {
    res.status(200).send({ ok: true, user: req.user });
});

router.get("/admin-auth", (req, res) => {
    res.status(200).send({ ok: true, user: req.user });
});

module.exports = router;                                                                                                                                        