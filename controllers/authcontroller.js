const usermodel = require("../models/user-model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const {gentoken} =  require("../utils/gentoken");

module.exports.registereduser = async function(req, res){
     try {
        let { email, fullname, password } = req.body;
        let found_user = await usermodel.findOne({email: email});
        if(found_user){
            return res.status(503).send("Account already exists")
        }else{
            bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(password, salt, async function (err, hash) {
                if (err) {
                    return err.message
                } else {
                    // res.send(hash)
                    let createduser = await usermodel.create({
                        email,
                        fullname,
                        password: hash,
                    });
                    let token = gentoken(createduser);
                    res.cookie("token", token);
                    res.send("user created.")
                }
            });
        });
        }
    }
    catch (error) {
        console.log(error.message);
        }   
    }

module.exports.loggedinuser = async function(req, res){
    let {email, password} = req.body;
    let user = await usermodel.findOne({email: email});
    if(!user){
        return res.status(503).send("Email or password is wrong!")
    }
    bcrypt.compare(password, user.password, function(err, result){
        if(result){
            let token = gentoken(user);
            res.cookie("token", token);
            res.send("user logged in")
        }else{
            return res.status(503).send("Email or password is wrong!")
        }
        
    })
}
module.exports.logout = function(req, res){
    res.cookie("token", "");
    res.redirect("/");
}