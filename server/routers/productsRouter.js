const express = require("express");
const productsRouter = express.Router();

const adminProducts = require("../adminProducts");
const controller = require("../controller/productController");

//Get show form to create a new product
productsRouter.get("/newForm", (req, res) => {
  res.render("newProduct");
})

//Get show form to create a new product
productsRouter.get("/list", controller.getAll );

productsRouter.get("/:id", controller.getOne );

//Post a /newProduct, new product will be inserted into the DB
productsRouter.post("/", controller.create );

//Delete
productsRouter.delete("/:id", controller.delete );

module.exports = productsRouter;