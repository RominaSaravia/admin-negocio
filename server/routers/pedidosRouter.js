const express = require("express")
const controller = require("../controller/pedidosController")

const pedidosRouter = express.Router()

//Get show form to create a new pedido
pedidosRouter.get("/newForm", controller.getFormProducts);

//Get show list of pedidos
pedidosRouter.get("/", controller.getAll);

//Get show pedidoDetails
pedidosRouter.get("/:id", controller.getOne );

// POST create new pedido
pedidosRouter.post("/", controller.create);

//PUT
pedidosRouter.put("/", controller.updateOne);

module.exports = pedidosRouter;