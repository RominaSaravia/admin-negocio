const mongo = require("../const").mongo;

exports.getAll = (cbResponse) => {
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


exports.getOne = (id, cbResponse)=>{
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err, client) => {
    if (err) {
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    } else {

      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("products");

      productsCollection.findOne( { id: id }, (err, data) => {
        if (err) {
          console.log("ERROR - Trying to get one pedido");
          cbResponse(undefined);
        } else {
          cbResponse(data);
        }

        client.close();
      })
    }
  })


}


exports.createOne = (name,description,size,style,price, cbResponse) => {
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


exports.deleteOne = async(ids,cbResponse) =>{

  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err, client) => {

    if (err) {
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    } else {
      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("products");
      let foundProduct = {};


      //Find product
      productsCollection.findOne( { _id: new mongo.db.ObjectID(ids) }, (err, data) => {
        if (err) {
          console.log(err)
          cbResponse(undefined);
        } else {
          foundProduct = data;
        }

      })
      //If found
      if(foundProduct){
        try{
          productsCollection.deleteOne({ _id: new mongo.db.ObjectID(ids) }, ()=>{
            cbResponse(foundProduct);
            client.close();
  
          })


        }catch(e){
          cbResponse(e)
        }

      }else{
        client.close();

      }


    }
  })


}