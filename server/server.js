const PORT = 5555;
const express = require("express");
const path = require("path");
const exphbs = require("express-handlebars");
const bodyParser = require("body-parser");
const app = express();

const productsRouter = require("./routers/productsRouter");
const pedidosRouter = require("./routers/pedidosRouter");

//Middleware
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

//Routers
app.use("/products", productsRouter);
app.use("/pedidos", pedidosRouter);


app.listen(process.env.PORT || PORT, () => {
  console.log(`server iniciado en http://localhost:${PORT}`);
})