const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()
const port = process.env.PORT || 5000


const corsOptions = {
    origin: ["http://localhost:5173"],
    credentials: true 
}

// MiddleWares
app.use(express.json())
app.use(cors(corsOptions))


/* Database Starts Here */

const uri = `mongodb+srv://${process.env.VOLORA_USER}:${process.env.VOLORA_PASS}@cluster0.u5bo5wl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {

        const volunteerCollection = client.db('volora').collection('volunteers')

        app.get('/volunteers', async (req, res) => {
            const result = await volunteerCollection.find({}).toArray()
            res.send(result)
        })


        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {



    }
}
run().catch(console.dir);



/* Database Ends Here */










app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})