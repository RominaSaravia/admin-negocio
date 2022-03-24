const express = require("express");
const productsRouter = express.Router();
const controller = require("../controller/productController");

//Get show form to create a new product
productsRouter.get("/newForm", controller.getForm);

//Get show form to create a new product
productsRouter.get("/", controller.getAll );

productsRouter.get("/:id", controller.getOne );

//Post a /newProduct, new product will be inserted into the DB
productsRouter.post("/", controller.create );

//Delete
productsRouter.delete("/:id", controller.delete );

module.exports = productsRouter;