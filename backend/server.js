require('dotenv').config();

const { MongoClient } = require("mongodb");
const bodyParser = require("body-parser");
const express = require("express");
const path = require('path');
const cors = require("cors");

const dbUser = process.env.MONGODB_USER;
const dbPassword = process.env.MONGODB_PW;

MongoClient.connect(
    `mongodb://${dbUser}:${dbPassword}@ds263460.mlab.com:63460/heroku_1fbr8gq4`,
    { useUnifiedTopology: true },
    (err, client) => {
        if (err) {
            throw err;
        }

        const collection = client.db("heroku_1fbr8gq4").collection("haushaltsplan");

        const getDocuments = () =>
            new Promise((resolve, reject) => {
                collection.find({}).toArray((err, result) => {
                    if (err) return reject(err);
                    return resolve(result)
                });
            });

        const addDoucment = (documentToInsert) =>
            new Promise((resolve, reject) => {
                collection.insertOne(documentToInsert, (err, result) => {
                    if (err) return reject(err);
                    return resolve(result);
                })
            });

        const app = express();
        app.use(bodyParser.json());
        app.use(cors());
        app.use(express.static(path.join(__dirname, "../frontend/build")));

        if (process.env.NODE_ENV === 'production') {
            app.use(express.static('../frontend/build'));
        }

        app.get("/getDocuments", async (req, res) => {
            const documents = await getDocuments();
            res.send(documents);
        });

        app.post("/addDocument", async (req, res) => {
            const response = await addDoucment(req.body)
                .then(_ => "Document successfully inserted")
                .catch(_ => "Error inserting document");
            res.send(response);
        });

        ≈

        app.get('*', function(req, res) {
            res.sendFile(path.join(__dirname + "../frontend/build", "index.html"));
        });

        const server = app.listen(process.env.PORT || 8080, () => {
            const port = server.address().port;
            console.log("App now running on port", port);
        });
    }
);
