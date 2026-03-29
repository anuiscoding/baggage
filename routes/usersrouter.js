const express = require("express");
const router = express.Router();

const {registereduser, loggedinuser, logout} =require("../controllers/authcontroller")

router.get("/", (req, res) => {
    res.send("hey, this is users and this is working")
})

router.post("/register", registereduser);
router.post("/login", loggedinuser);
router.get("/logout", logout);
module.exports = router;