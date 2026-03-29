const express = require("express");
const app = express(); 

const db = require("./config/mongoose-connection");
const ownersrouter = require("./routes/ownersrouter");
const usersrouter = require("./routes/usersrouter");
const productsrouter = require("./routes/productsrouter");
const indexrouter = require("./routes/index");

const cookieparser = require("cookie-parser");
const ExpressSession = require("express-session");
const flash = require("connect-flash");
const path = require("path");

require("dotenv").config();

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(
    ExpressSession({
        resave: false,
        saveUninitialized: false,
        secret: process.env.EXPRESS_SESSION_SECRET
    })
);
app.use(flash());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/", indexrouter); 
app.use("/owners", ownersrouter);
app.use("/users", usersrouter);
app.use("/products", productsrouter);

app.listen(3000);

