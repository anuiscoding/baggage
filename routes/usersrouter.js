const express = require("express");
const router = express.Router();

router.get("/", (req, res)=>{
    res.send("hey, this is users and this is working")
})

module.exports = router;