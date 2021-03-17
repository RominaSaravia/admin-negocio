const express = require("express");
const adminProducts = require("../adminProducts");

const productsRouter = express.Router();

//Get show form to create a new product
productsRouter.get("/newForm", (req, res) => {
  res.render("newProduct");
})

//Get show form to create a new product
productsRouter.get("/list", (req, res) => {
  adminProducts.getAllProducts(data => {
    res.render("showProducts", {
      product: data
    });
  })
})

//Post a /newProduct, new product will be inserted into the DB
productsRouter.post("/new", (req, res) => {
  adminProducts.insertNewProduct(
    req.body.name,
    req.body.description,
    req.body.size,
    req.body.style,
    req.body.price,
    cbResponse => {
      if (cbResponse) {
        console.log("Se logró registrar el producto");
        res.redirect("/")
      } else {
        console.log("Hubo un error");
        res.redirect("/");
      }
    }
  )

})

module.exports = productsRouter;