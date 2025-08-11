const express = require('express')
const cors = require('cors');
require('dotenv').config()
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
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

        // Get All Volunteers in collection..
        app.get('/volunteers', async (req, res) => {
            const result = await volunteerCollection.find({}).toArray()
            res.send(result)
        })

        // Post/Include a new volunteer post
        app.post('/add-volunteer', async (req, res) => {
            const volunteerData = req.body;
            console.log(volunteerData)
            try {
                const result = await volunteerCollection.insertOne(volunteerData);
                res.send(result);
            }
            catch (err) {
                res.status(500).send({ message: "Failed to add new User now!" })
            }
        })


        // Volunteer need post detail, get a specif volunteer data
        app.get('/volunteer/:id', async (req, res) => {
            const { id } = req.params;
            const result = await volunteerCollection.findOne({ _id: new ObjectId(id) });
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