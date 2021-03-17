const express = require("express")
const adminPedidos = require("../adminPedidos");
const adminProducts = require("../adminProducts");

const pedidosRouter = express.Router()

//Get show form to create a new pedido
pedidosRouter.get("/newForm", (req, res) => {

  //Send all products available
  adminProducts.getAllProducts(data => {
    res.render("newPedido", {
      product: data
    });
  })
})

//Get show list of pedidos
pedidosRouter.get("/list", (req, res) => {

  adminPedidos.getAllPedidos(data => {
    res.render("showPedidos", {
      pedidos: data,
    });

  })
})

//Get show pedidoDetails
pedidosRouter.get("/list/:id", (req, res) => {
  if(req.params.id){
    adminPedidos.getOnePedido(req.params.id, cbResponse => {
      if(cbResponse){
        res.render("pedidoDetails", {
          pedido: cbResponse
        })
        console.log(cbResponse);
      }else{
        res.render("pedidoDetails", {
          message:"Lo siento, no se encontró el pedido."
        })
      }
    })
  }
})

// POST create new pedido
pedidosRouter.post("/new", (req, res) => {
  adminPedidos.insertNewPedido(
    req.body.listProduct,
    req.body.finalPrice,
    req.body.newId,
    req.body.customer,
    req.body.dateTime,
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

pedidosRouter.post("/update", (req, res) => {
  if (req.body.newState && req.body.id) {
    adminPedidos.updateOne(req.body.id, req.body.newState, cbResponse => {
      if (cbResponse) {
        res.redirect("/pedidos/list");
      } else {
        res.render("/pedidos/list", {
          message: "Hubo un error, intente nuevamente"
        });
      }
    })
  }
})

module.exports = pedidosRouter;