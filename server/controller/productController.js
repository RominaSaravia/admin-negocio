const repository = require("../repositories/products.js");

exports.create = async (req,res) =>{

  repository.createOne(
    req.body.name,
    req.body.description,
    req.body.size,
    req.body.style,
    req.body.price,

    cbResponse => {
      if (cbResponse) {
        res.redirect("/");
      } else {
        res.redirect("/");
      }
    }
  )


}

exports.getForm = async (req,res)=>{
  res.render("newProduct");

}

exports.getAll = async (req,res) =>{
  repository.getAll(data => {
    res.render("showProducts", {
      product: data
    });
  })
  
}

exports.getOne = async (req,res) =>{
  repository.getOne(data => {
    res.json(data);
  })
  
}

exports.delete = async (req,res) =>{
  if(req.params.id){
    repository.deleteOne(req.params.id, cbResponse => {
      res.json(cbResponse);

    })
  }
  
}