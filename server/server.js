const PORT = 5555;
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");

//Admin products, insertOne, getAllProducts
const adminProducts = require("./adminProducts");
const adminPedidos = require("./adminPedidos");

const app = express();

app.use(express.static(path.join(__dirname, "public")))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Handlebars
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "views"));

app.engine("handlebars", exphbs({
  defaultLayout: "public",
  layoutsDir: path.join(__dirname, "views/layout")
}))

//Landing
app.get("/", (req, res) => {
  res.render("landing");
})

//Get show form to create a new product
app.get("/newProductForm", (req, res) => {
  res.render("newProduct");
})

//Get show form to create a new product
app.get("/getListOfProducts", (req, res) => {
  adminProducts.getAllProducts(data => {
    res.render("showProducts", {
      product: data
    });
  })
})

//Get show form to create a new product
app.get("/presupuesto", (req, res) => {

  adminProducts.getAllProducts(data => {
    res.render("presupuesto", {
      product: data
    });
  })
})

//Post a /newProduct, new product will be inserted into the DB
app.post("/newProduct", (req, res) => {
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

//Get
app.get("/getListPresupuestos", (req, res) => {

  adminPedidos.getAllPedidos(data => {
    res.render("showPedidos", {
      pedidos: data,
    });

  })
})


app.post("/newPedido", (req, res) => {
  adminPedidos.insertNewPedido(
    req.body.listProduct,
    req.body.finalPrice,
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


app.listen(process.env.PORT || PORT, () => {
  console.log(`server iniciado en http://localhost:${PORT}`);
})