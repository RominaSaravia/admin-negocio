const mongo = require("./const").mongo;

const getAllProducts = (cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err,client)=>{
    if(err){
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    }else{
      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("products");

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

const insertNewProduct = (name,description,size,style,price, cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err,client)=>{
    if(err){
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    }else{
      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("products");

      const newProduct = {
        name,
        description,
        size,
        style,
        price
      }



      productsCollection.insertOne(newProduct, (err,data)=>{
        if(err){
          console.log("ERROR - Trying to insert new product");
          cbResponse(false);
        }else{
          cbResponse(true);
        }

        client.close();
      })

    }
  })

}

module.exports = {
  getAllProducts,
  insertNewProduct
}