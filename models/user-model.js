const mongoose = require("mongoose")
mongoose.connect("mongodb://127.0.0.1:27017/baggers")

const userschema = mongoose.Schema({
    fullname : {
        type: String,
        trim: true,
        minlength: 3
    },
    email : String,
    password : String,
    cart : {
        type: Array,
        default : []
    },

    orders : {
        type: Array,
        default: []
    },
    contact :  Number,
    picture : String

});

module.exports = mongoose.model("user", userschema);