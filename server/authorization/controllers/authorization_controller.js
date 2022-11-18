const express = require("express");
const passwordModel = require("../models/password_model");
const router = express.Router();
const bcrypt = require("bcrypt");

