const mongo = require("./const").mongo;

const getAllPedidos = (cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err,client)=>{
    if(err){
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    }else{
      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("pedidos");

      productsCollection.find({}).toArray( (err,data)=>{
        if(err){
          console.log("ERROR - Trying to get all products");
          cbResponse([]);
        }else{
          cbResponse(data);
        }

        client.close();
      })

    }
  })
}


const insertNewPedido = (list, finalPrice, cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err, client) => {
    if (err) {
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    } else {
      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("pedidos");

      const newPedido = {
        list,
        finalPrice,
        state:"pendiente"
      }

      productsCollection.insertOne(newPedido, (err, data) => {
        if (err) {
          console.log("ERROR - Trying to insert new product");
          cbResponse(false);
        } else {
          cbResponse(true);
        }

        client.close();
      })
    }
  })

}

module.exports = {
  insertNewPedido,
  getAllPedidos
}