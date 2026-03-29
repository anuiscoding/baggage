const jwt = require("jsonwebtoken");
const usermodel = require("../models/user-model")

module.exports = async function (req, res, next) {
    if(!req.cookies.token){
        req.flash("error", "you need to log in first");
        return res.redirect("/");
    }
    try{
        let decoded = jwt.verify(req.cookies.token, process.env.JWT_KEY);
        let user = await usermodel
        .findOne({email: decoded.email})
        .select("-password"); //does not get the password from the user data
        req.user = user //user data stored in a field name user in req
        next()
    }catch(err){
        req.flash("error", "something went wrong")
        return res.redirect("/");
    }
}