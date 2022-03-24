const repository = require("../repositories/pedidos");
const repoProduct = require("../repositories/products");

exports.getFormProducts = async(req,res)=>{ 
  //Send all products available
  repoProduct.getAll(data => {
    res.render("newPedido", {
      product: data
    });
  })

}

exports.getAll = async(req,res)=>{
  repository.getAll(data => {
    res.render("showPedidos", {
      pedidos: data,
    });

  })
}

exports.getOne = async(req,res)=>{
  if(req.params.id){
    repository.getOne(req.params.id, cbResponse => {
      if(cbResponse){
        res.render("pedidoDetails", {
          pedido: cbResponse
        })

      }else{
        res.render("pedidoDetails", {
          message:"Lo siento, no se encontró el pedido."
        })
      }
    })
  }
}

exports.create = async(req,res)=>{
  repository.create(
    req.body.listProduct,
    req.body.finalPrice,
    req.body.newId,
    req.body.customer,
    req.body.dateTime,
    cbResponse => {
      if (cbResponse) {
        res.redirect("/")
      } else {
        res.redirect("/");
      }
    }
  )
}

exports.updateOne = async(req,res)=>{
  if (req.body.newState && req.body.id) {
    repository.updateOne(req.body.id, req.body.newState, cbResponse => {
      if (cbResponse) {
        res.redirect("/pedidos/list");
      } else {
        res.render("/pedidos/list", {
          message: "Hubo un error, intente nuevamente"
        });
      }
    })
  }
}