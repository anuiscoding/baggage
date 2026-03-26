const express = require("express");
const router = express.Router();
const ownermodel = require("../models/owner-model")

// console.log("NODE_ENV:", process.env.NODE_ENV);

//owner creating process only valid in development phase
if(process.env.NODE_ENV === "development"){
    router.post("/create", async (req, res)=>{
        let owners = await ownermodel.find();
        //when owner already exists, more owners cant be created
        if(owners.length >0) return res.status(503).send("You don't have this persmission.");
        //when no owner exists
        let {fullname, email, password} = req.body;
        let createdowner = await ownermodel.create({
            fullname,
            email,
            password
        });
        res.status(203).send(createdowner);
    });
};

router.get("/", (req, res)=>{
    res.send("Hi this is owner page")
})


module.exports = router;