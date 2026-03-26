const express = require("express");
const app = express(); 

const db = require("./config/mongoose-connection");
const ownersrouter = require("./routes/ownersrouter");
const usersrouter = require("./routes/usersrouter");
const productsrouter = require("./routes/productsrouter");

const cookieparser = require("cookie-parser");
const path = require("path");

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cookieparser());
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

app.use("/owners", ownersrouter);
app.use("/users", usersrouter);
app.use("/products", productsrouter);

// console.log("APP NODE_ENV:", process.env.NODE_ENV);
// console.log(process.env);

app.listen(3000);

