const mongo = require("../const").mongo;


exports.create = (list, finalPrice, id, customer, dateTime, cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err, client) => {
    if (err) {
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse(false);
      client.close();

    } else {

      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("pedidos");

      const newPedido = {
        id,
        customer,
        list,
        finalPrice,
        dateTime,
        state: "pendiente",
        terminated:false
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

exports.getAll = (cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err, client) => {
    if (err) {
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    } else {

      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("pedidos");

      productsCollection.find({}).toArray((err, data) => {
        if (err) {
          console.log("ERROR - Trying to get all products");
          cbResponse([]);
        } else {
          cbResponse(data);
        }

        client.close();
      })
    }
  })
}

exports.getOne = (id, cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err, client) => {
    if (err) {
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse([]);
      client.close();
    } else {

      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("pedidos");

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

exports.updateOne = (id,newState,cbResponse) => {
  mongo.db.MongoClient.connect(mongo.dbURL, mongo.mongoConfig, (err, client) => {
    if (err) {
      console.log("ERROR - Trying to connect to Mongo");
      cbResponse(false);
      client.close();

    } else {

      const serverDB = client.db("adminProducts");
      const productsCollection = serverDB.collection("pedidos");

      let findQuery = { id };
      let updateQuery = { $set: { state: newState, terminated: true } }

      productsCollection.updateOne(findQuery, updateQuery, (err, data) => {
        if (err) {
          cbResponse(false);
        } else {
          cbResponse(true)
        }

        client.close();

      });
    }
  })
}
