"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var app = (0, express_1.default)();
require('dotenv').config();
var port = process.env.PORT || 8080;
app.listen(port, function () {
    console.log("listening to the port " + port);
});
